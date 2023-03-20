import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Api, { IMG_SERVER } from '../../utils/customAPI';
import { Link } from 'react-router-dom';
import { Dropdown } from 'antd';
import RecipeItem from '../../components/recipe/RecipeItem';

export default function RecipeList() {
  const user = useSelector((state) => state.user);
  const [showBtn, showMoreBtn] = useState(true);
  const [selectedFilter, setSelectFilter] = useState([])
  const [searchOpt, setSearchOpt] = useState({
    itemTagId: "",
    mallCd: "CAFE24",
    mallCustomerId: user.username,
    pageIndex: 1,
    pageSize: 16,
    param: {
      difficultyCodeList: [],
      kindCodeList: [],
      searchVal: "",
      situationCodeList: [],
      timeCodeList: []
    },
    sort: "lastst"
  })
  const [isMobile, setIsMobile] = useState(document.body.clientWidth < 720 )
  const filterJson = [
    {
      name : 'kindCodeList', 
      title : '종류', 
      option:[{code :2301,caption :"반찬",ord :1},{code :2302,caption :"메인",ord :2},{code :2303,caption :"밥/죽/떡",ord :3},{code :2304,caption :"디저트",ord :4},{code :2305,caption :"한식",ord :5},{code :2306,caption :"일식",ord :6},{code :2307,caption :"중식",ord :7},{code :2308,caption :"양식",ord :8},{code :2309,caption :"빵",ord :9},{code :2310,caption :"과자",ord :10},{code :2311,caption :"음료",ord :11},{code :2399,caption :"기타",ord :99}]
    }, 
    {
      name : 'situationCodeList', 
      title : '상황', 
      option: [{code :2401,caption :"일상",ord :1},{code :2402,caption :"홈파티",ord :2},{code :2403,caption :"술안주",ord :3},{code :2404,caption :"야식",ord :4},{code :2405,caption :"다이어트",ord :5},{code :2406,caption :"채식",ord :6},{code :2407,caption :"이유식",ord :7},{code :2408,caption :"혼밥",ord :8},{code :2409,caption :"도시락",ord :9},{code :2410,caption :"아침",ord :10},{code :2499,caption :"기타",ord :99}]
    }, //상황
    {
      name : 'difficultyCodeList', 
      title : '난이도', 
      option:[{code :2201,caption :"누구나",ord :1},{code :2202,caption :"초급",ord :2},{code :2203,caption :"중급",ord :3},{code :2204,caption :"고급",ord :4},{code :2205,caption :"셰프",ord :5}]
    }, //난이도
    {
      name : 'timeCodeList', 
      title : '조리시간', 
      show: false,
      option:[{code :2101,caption :"5분이내",ord :1},{code :2102,caption :"10분이내",ord :2},{code :2103,caption :"15분이내",ord :3},{code :2104,caption :"20분이내",ord :4},{code :2105,caption :"30분이내",ord :5},{code :2106,caption :"60분이내",ord :6},{code :2107,caption :"90분이내",ord :7},{code :2108,caption :"100분이상",ord :7}]
    } //조리시간
  ]
  const [showSelectedFilter, setShowSelectedFilter] = useState(false)
  const [list, setList] = useState({});
  const setLocation = (value, next = true) => {
    document.body.removeAttribute('class')
    setSearchOpt(value)
    setSelectFilter(value.param)
    let locationSearch = `${location.pathname}?`, pathname = locationSearch
    if(value.param.difficultyCodeList.length > 0) locationSearch += `difficultyCodeList=${value.param.difficultyCodeList.join(',')}`
    if(value.param.kindCodeList.length > 0) locationSearch += `&kindCodeList=${value.param.kindCodeList.join(',')}`
    if(value.param.situationCodeList.length > 0) locationSearch += `&situationCodeList=${value.param.situationCodeList.join(',')}`
    if(value.param.timeCodeList.length > 0) locationSearch += `&timeCodeList=${value.param.timeCodeList.join(',')}`
    if(value.param.searchVal) locationSearch += `&key=${ value.param.searchVal}`
    if(value.pageIndex > 1) locationSearch += `&paging=${value.pageIndex}`
    if(value.itemTagId) locationSearch += `&itemTagId=${value.itemTagId}`
    if(value.sort !== "lastst") locationSearch += `&sort=${value.sort}`
    if(locationSearch !== pathname) window.history.pushState('', '레시피리스트', locationSearch.replace('?&','?'));
    else window.history.pushState('', '레시피리스트', locationSearch.replace('?',''));
    if(next) getList(value)
  }
  const getList = async (value = searchOpt) => {
    let totalFilter = 0
    filterJson.map(f => totalFilter += value.param[f.name].length)
    if(totalFilter > 0) setShowSelectedFilter(true)
    else setShowSelectedFilter(false)
    try {
      const request = await Api.post('/api/v1/earth/recipe/listV2', { params: value }).then(res => res.data.result);
      let recipes = request.recipeList;
      if (list.recipeList && list.recipeList.length + request.recipeList.length < request.totalCount) showMoreBtn(true);
      else showMoreBtn(false)
      if (value.pageIndex > 1 && list.recipeList.length > 0) recipes = [...list.recipeList, ...recipes];
      setList({
        totalCount: request.totalCount,
        recipeList: recipes,
      });
    } catch (err) {
      console.log(err);
      showMoreBtn(false)
      setList({});
    }
  };
  const onChangeSort = (value) => {
    let body = {
      ...searchOpt,
      sort : value,
      pageIndex:1
    }
    setLocation(body)
  };
  const changeFilter = (type, value, remove = false) => {
    let body = searchOpt
    if(searchOpt.param[type].length > 0 && searchOpt.param[type].find(op => parseInt(op) === parseInt(value))) {
      body = {
        ...searchOpt,
        param : {
          ...searchOpt.param,
          [type]: searchOpt.param[type].filter(op => parseInt(op) !== parseInt(value))
        },
      } 
    }else{
      body = {
        ...searchOpt,
        param : {
          ...searchOpt.param,
          [type]: [
            ...searchOpt.param[type],
            value
          ]
        },
      }
    }
    if(remove) setLocation(body, remove)
    else setSearchOpt(body)
  }
  const moreList = () => {
    let body = {
      ...searchOpt,
      pageIndex:searchOpt.pageIndex+1
    }
    setLocation(body)
  };
  const resetSearch = () => {
    let body = {
      itemTagId: "",
      mallCd: "CAFE24",
      mallCustomerId: user.username,
      pageIndex: 1,
      pageSize: 16,
      param: {
        difficultyCodeList: [],
        kindCodeList: [],
        searchVal: "",
        situationCodeList: [],
        timeCodeList: []
      },
      sort : "lastst"
    }
    setLocation(body)
  }
  window.addEventListener('resize',() =>{
    setIsMobile(document.body.clientWidth < 720) 
  })
  useEffect(() => {
    let isMounted = true
    if(isMounted){
      let newOption = searchOpt
      const prm = new URLSearchParams(location.search);
      if(prm.get('key')) newOption.param['searchVal'] = prm.get('key')
      if(prm.get('paging')) newOption['pageIndex'] = prm.get('paging')
      if(prm.get('itemTagId')) newOption['itemTagId'] = prm.get('itemTagId')
      if(prm.get('difficultyCodeList')) {
        newOption.param['difficultyCodeList'] = prm.get('difficultyCodeList').split(',')
      }
      if(prm.get('kindCodeList')) {
        newOption.param['kindCodeList'] = prm.get('kindCodeList').split(',')
      }
      if(prm.get('situationCodeList')) {
        newOption.param['situationCodeList'] = prm.get('situationCodeList').split(',')
      }
      if(prm.get('timeCodeList')) {
        newOption.param['timeCodeList'] = prm.get('timeCodeList').split(',')
      }
      if(prm.get('sort')) newOption['sort'] = prm.get('sort')
      setLocation(newOption, false)
      getList(newOption);
      isMounted = false;
    }
  }, []);
  const toggleFilter = () => {
    if(document.body.getAttribute('class') && document.body.getAttribute('class') === 'show_filter') {
      document.body.removeAttribute('class')
    }
    else{ 
      document.body.setAttribute('class','show_filter')
    }
  }
  return (
    <section className="recipe_list">
      <h2 className="titleArea">예스어스 레시피</h2>
      <div className="recipe_wrap">
        <div className="search_top">
          <div className="search_bar">
              <input type="text" className="recipe_keyword" value={searchOpt.param.searchVal} onChange={e => setSearchOpt({...searchOpt,param:{...searchOpt.param,searchVal: e.target.value}})} placeholder="검색어를 입력하세요" />
              <button className="btnSubmit btn_search" onClick={() => setLocation(searchOpt)}>검색</button>
              <button className="btn_reset" onClick={resetSearch}>재설정</button>
          </div>
          <button className="open_filter" onClick={toggleFilter}>검색 필터를 이용해보세요!</button>
          <h3 className="close_filter">
              필터로 검색
              <button onClick={toggleFilter}></button>
          </h3>
          <div className="filter_type">
              {filterJson.map(ft => <>
                {isMobile ?
                  <dl key={ft.name}><dt>{ft.title}</dt><dd>{ft.option.map(op => 
                    <label key={op.code}><input type="checkbox" name="recipe_type" value={op.code} checked={searchOpt.param[ft.name].length > 0 && searchOpt.param[ft.name].find(option => parseInt(op.code) === parseInt(option)) ? true:false} onChange={() => changeFilter(ft.name,op.code)} /><span>{op.caption}</span></label>
                  )}</dd></dl>
                : <Dropdown key={ft.name} overlay={<dd className="filter_type_dropdown">{ft.option.map(op => 
                  <label key={op.code}>
                    <input type="checkbox" name="recipe_type" value={op.code} 
                    checked={searchOpt.param[ft.name].length > 0 && searchOpt.param[ft.name].find(option => parseInt(op.code) === parseInt(option)) ? true:false} 
                    onChange={() => changeFilter(ft.name,op.code)} /><span>{op.caption}</span></label>
                )}</dd>} trigger={['click']}><dl><dt onClick={e => e.preventDefault()}>{ft.title}</dt></dl></Dropdown>}
              </> 
              )}
              {isMobile ?
              <dl><dt>{searchOpt.sort === 'lastst' ? '최신순':'이름순'}</dt><dd>
                <label><input type="radio" name="recipe_sort" value="lastst" checked={searchOpt.sort === 'lastst' ? true : false} onChange={(e) => onChangeSort(e.target.value)} /><span>최신순</span></label>
                <label><input type="radio" name="recipe_sort" value="title" checked={searchOpt.sort === 'title' ? true : false} onChange={(e) => onChangeSort(e.target.value)} /><span>이름순</span></label>
              </dd></dl>
              : 
              <Dropdown overlay={<dd className="filter_type_dropdown">
                  <label><input type="radio" name="recipe_sort" value="lastst" checked={searchOpt.sort === 'lastst' ? true : false} onChange={(e) => onChangeSort(e.target.value)} /><span>최신순</span></label>
                  <label><input type="radio" name="recipe_sort" value="title" checked={searchOpt.sort === 'title' ? true : false} onChange={(e) => onChangeSort(e.target.value)} /><span>이름순</span></label>
                </dd>} trigger={['click']}>
                <dl><dt>{searchOpt.sort === 'lastst' ? '최신순':'이름순'}</dt></dl>
              </Dropdown>}
            </div>
             {showSelectedFilter && <div className="filter_selected">
                {filterJson.map(f => selectedFilter[f.name].map(filter => {
                  const selected = f.option.find(o => parseInt(o.code) === parseInt(filter))
                  return (<a href="#" key={selected.code} onClick={(e) => {e.preventDefault();changeFilter(f.name,selected.code, true)}}>{selected.caption}</a>)
                }))}
            </div>}
        </div>
        {list.totalCount > 0 && <div className="result_status">
            총 <strong className="fcg">{list.totalCount}</strong>개의 레시피
        </div>}
          <ul className="recipe_grid _all">
            {list.recipeList && list.recipeList.length > 0 && list.recipeList.map(item => 
              <RecipeItem key={item.recipeId} item={item} username={user.username} />
            )}
          </ul>
          {showBtn && <div className="recipe_page"><button className="btnNormal" onClick={moreList}>더보기</button></div>}
    </div>
</section>
  );
}