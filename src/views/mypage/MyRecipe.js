import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import RecipeItem from '../../components/recipe/RecipeItem';
import { useSelector } from 'react-redux';
import Api from '../../utils/customAPI';
import { Select } from 'antd';
const { Option } = Select;

const { TabPane } = Tabs;

export default function MyRecipe(props) {
  const user = useSelector((state) => state.user);
  const [userInfo, setUser] = useState({})
  const [recipes, setRecipes] = useState({})
  const [recommendList, setRecommendList] = useState([])
  const [tabKey, setTabKey] = useState(1)
  const [sort, setSort] = useState('lastst')
  const sortOpt = [{ name: '최신순', value: 'lastst' },{ name: '이름순', value: 'title' }]
  const setUserInfo = async () => {
    let body = {mallCd:'cafe24',mallCustomerId:user.username}
    const muckResult = await Api.get('/api/v1/customer/getCustomerEarthBoxPersonalCheckResult',{params:body}).then(res => res.data.result)
    const recipes = await Api.get('/api/v1/earth/recipe/getCustomerRecipeList',{params:body}).then(res => res.data.result)
    if(muckResult) setUser({
      cName:muckResult.customerName,
      mukType: muckResult.mukType,
      checkYn: muckResult.checkYn === 'Y' ? true: false
    })
    setRecommendList(recipes.list)
    setRecipes(recipes)
  }
  const onChangeSort = (sort, activeKey) => {
    setSort(sort)
    setTabKey(parseInt(activeKey))
    recipes.list.sort(function(a, b)  {
        const upperCaseA = sort === 'lastst' ? a.recipeId : a.recipeTitle.toUpperCase();
        const upperCaseB = sort === 'lastst' ? b.recipeId : b.recipeTitle.toUpperCase();
        if(upperCaseA > upperCaseB) return 1;
        if(upperCaseA < upperCaseB) return -1;
        if(upperCaseA === upperCaseB) return 0;
    })
    setRecommendList(recipes.list.filter(item => parseInt(activeKey) === 1 ? item.includeRecommendYn === 'Y' : item.includeBookmarkYn === 'Y'))
  }
  useEffect(() => {
    if(!userInfo.cName) setUserInfo()
  },[recommendList])
  return (<>
    {userInfo.cName && <div className="recipe_list ">
      <h2 className="titleArea">{userInfo.mukType && `#${userInfo.mukType}형`} {userInfo.cName ? userInfo.cName:'회원'}님을 위한<br />이번 주 이런 요리 어때요?</h2>
      {recipes.recentList && recipes.recentList.length > 0 && <>
        <ul className="recipe_grid thisweek">
          {recipes.recentList.map(item => <RecipeItem item={item} username={user.username} />)}
        </ul>
        <a href="/mukbti_v2/index.html" target="_blank" className="muck_vti">
          <b><span><strong className="fcy">먹비티아이 테스트</strong> {userInfo.checkYn ? '다시' : ''} 하고</span> 나한테 {userInfo.checkYn ? '더욱' :''} 딱 맞는 <strong className="fcy">레시피를 추천</strong> 받으세요!</b> 
          <span>테스트 하러가기<i></i></span>
        </a>
      </>}
      <div className="inner">
        <Tabs defaultActiveKey={tabKey} 
          onChange={(activeKey) => onChangeSort(sort, activeKey)}
        >
          <TabPane tab="이번주 추천 레시피" key="1">
            <div className="boardSort">
              <Select value={sort} defaultValue={'최신순'} name="search_date" onChange={(value) => onChangeSort(value, tabKey)}>
                {sortOpt.map(option => 
                  <Option key={option.value} value={option.value}>{option.name}</Option>
                )}
              </Select>
            </div>
            {recipes.list && recipes.list.length > 0 && recipes.list.filter(item => item.includeRecommendYn === 'Y').length > 0 ? <ul className="recipe_grid">
              {recommendList.map(item => <RecipeItem key={item.recipeId} item={item} username={user.username} />)}
            </ul>
            :<div className="empty"></div>}
          </TabPane>
          <TabPane tab="내가 저장한 레시피" key="2">
            <div className="boardSort">
              <Select value={sort} defaultValue={'최신순'} name="search_date" onChange={(value) => onChangeSort(value, tabKey)}>
                {sortOpt.map(option => 
                  <Option key={option.value} value={option.value}>{option.name}</Option>
                )}
              </Select>
            </div>
            {recipes.list && recipes.list.length > 0 && recipes.list.filter(item => item.includeBookmarkYn === 'Y').length > 0 ? <ul className="recipe_grid">
              {recommendList.map(item => <RecipeItem key={item.recipeId} item={item} username={user.username} />)}
            </ul>
            :<div className="empty"></div>}
          </TabPane>
        </Tabs>
      </div>
    </div>}
  </>
    
  );
}
