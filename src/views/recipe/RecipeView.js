import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  HeartOutlined,
  HeartFilled,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';
import Api, { IMG_SERVER } from '../../utils/customAPI';
import moment from 'moment';

const { confirm } = Modal;


export default function RecipeView(props) {
  // const user = useSelector((state) => state.user);
  const user = {
    username: '2526371910@a'
  }
  const params = useParams();
  const [postData, setData] = useState([]);
  const [showCommentFrm, setShowCommentFrm] = useState(true)
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(5);
  const [scroreMsg, setScroreMsg] = useState('');
  const navigate = useNavigate();
  const getData = async () => {
    let body = {
      mallCd: 'cafe24',
      recipeId: params.id,
      username: user.username,
    };
    try {
      const request = await Api.get('/api/v1/earth/recipe/detail', { params: body });
      setData(request.data.result);
      reSortComment()
    } catch (err) {
      console.log(err);
    }
  };
  const reSortComment = () => {
    if(postData.scoreList && postData.scoreList.length > 0 && postData.scoreList.filter(comment => comment.customerMallId === user.username && comment.isDeleteYn === 'N').length > 0) {
      let newSortList = [
        ...postData.scoreList.filter(comment => comment.customerMallId === user.username && comment.isDeleteYn === 'N'),
        ...postData.scoreList.filter(comment => comment.customerMallId !== user.username && comment.isDeleteYn === 'N')
      ]
      setData({
        ...postData,
        scoreList: newSortList
      })
      setScroreMsg(postData.scoreList.filter(comment => comment.customerMallId === user.username && comment.isDeleteYn === 'N')[0].description)
      setScore(postData.scoreList.filter(comment => comment.customerMallId === user.username && comment.isDeleteYn === 'N')[0].rcsScore)
      setShowCommentFrm(false)
    }else{
      setScroreMsg('')
      setScore(5)
    }
    setShowModal(false)
  }
  const likeComment = async (cid) => {
    if(!user.username) {
      confirm({
        title: '로그인 후 좋아요를 누르실 수 있습니다',
        icon: <ExclamationCircleOutlined />,
        okText: '로그인 하기',
        cancelText: '취소',
        onOk() { navigate('/login') },
      });
      return;
    }
    let body = {
      customerId: cid,
      mallCd: "CAFE24",
      mallCustomerId: user.username,
      preferType: "GOOD",
      recipeId: params.id
    }
    try {
      await Api.post('/api/v1/customer/upsertRecipeScorePrefer', body);
      getData();
    } catch (err) {
      console.log(err);
    }
  }
  const submitScore = async () => {
    if(!user.username) {
      confirm({
        title: '로그인 후 작성하실 수 있습니다',
        icon: <ExclamationCircleOutlined />,
        okText: '로그인 하기',
        cancelText: '취소',
        onOk() { navigate('/login') },
      });
      return;
    }
    let body = {
      mallCd: 'cafe24',
      mallCustomerId: user.username,
      recipeId: params.id,
      recipeRatingComment: scroreMsg,
      recipeRatingScore: score,
    }
    try {
      await Api.post('/api/v1/customer/updateCustomerRecipeRating', body);
      getData();
    } catch (err) {
      console.log(err);
    }
  };
  const checkBookmark = async (isBookmark) => {
    let body = {
      mallCd: 'cafe24',
      username: user.username,
      recipeId: params.id,
    };
    try {
      await Api.post(isBookmark === 'N'?'/api/v1/customer/addBookmarkRecipe':'/api/v1/customer/removeBookmarkRecipe', body);
      getData();
    } catch (err) {
      console.log(err);
    }
  };
  const setIngredients = (count) => {
    let newIngredients = []
    postData.ingredients.map(ing => {
      let newItem = []
      ing.items.map(it => newItem.push({
        count: it.count / postData.recipeUnitCount * count,
        name: it.name,
        unit: it.unit
      }))
      newIngredients.push({
        ingreType: ing.ingreType,
        items: newItem
      })
    })
    setData({
      ...postData,
      recipeUnitCount: count,
      ingredients: newIngredients
    })
  }
  const returnScore = (score) => {
    let scoreHtml = ''
    for(let i=0;i<score;i++){
      scoreHtml +='★'
    }
    return scoreHtml
  }
  const returnTime = (time) => {
    const now = moment()
    const updated = moment(time)
    if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 3650000) return updated.format('YYYY-MM-DD')
    else if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 300000) return `${now.format('YYYYMM') - updated.format('YYYYMM')}달전`
    else if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 10000) return `${now.format('DD') - updated.format('DD')}일전`
    else if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 60) return `${now.format('HH') - updated.format('HH')}시간전`
    else if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 50) return `50분전`
    else if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 40) return `40분전`
    else if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 30) return `30분전`
    else if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 20) return `20분전`
    else if(now.format('YYYYMMDDHHmm') - updated.format('YYYYMMDDHHmm') > 10) return `10분전`
    else {return `방금전`}
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
    {postData && <>
      <div className="recipe_detail">
        <div className="recipe_img">
          <img  alt={postData.recipeTitle} src={
            postData.recipeRepImageUrl
              ? `${IMG_SERVER}${postData.recipeRepImageUrl}`
              : '//img.echosting.cafe24.com/thumb/198x198.gif'
          } />
          {postData.includeBookmarkYn && <button className={`bookmark is${postData.includeBookmarkY}`} onClick={() => checkBookmark(postData.includeBookmarkYn)}></button>}
        </div>
      
        <div className="recipe_info">
          <div className="recipe_status">
            {postData.recipeKind && postData.recipeKind.split(',').map((tag,index) => <Link key={index} to={`/recipe/all?kindCodeList=${postData.recipeKindCd.split(',')[index]}`}>#{tag}</Link>)}
            {postData.recipeSituation && postData.recipeSituation.split(',').map((tag,index) => <Link key={index} to={`/recipe/all?situationCodeList=${postData.recipeSituationCd.split(',')[index]}`}>#{tag}</Link>)}
          </div>
          <h2 className="recipe_title" dangerouslySetInnerHTML={{ __html: postData.recipeTitle }}></h2>
          <p className="recipe_summary">{postData.recipeSummary}</p>
          <ul>
            <li className="level"><span>난이도</span> <b>{postData.recipeDifficult}</b></li>
            <li className="time"><span>조리시간</span> <b>{postData.recipeCookingTime}</b></li>
          </ul>
          <div className="recipe_customize">
              <button className="minus" disabled={postData.recipeUnitCount>1 ? false:true} onClick={() => setIngredients(postData.recipeUnitCount - 1)}></button>
              <b>{postData.recipeUnitCount}</b><span className="unit">{postData.recipeUnit}</span>
              <button className="plus" onClick={() => setIngredients(postData.recipeUnitCount + 1)}></button>
          </div>
          {postData.ingredients && postData.ingredients.map(ig => <dl  key={ig.ingreType} className="recipe_ingredients">
            <dt>{ig.ingreType}</dt>
            {ig.items && ig.items.map(it => <dd key={it.name}>
              <label>{it.name}</label>
              <span>{it.count.toFixed(1)}{it.unit}</span>
            </dd>)}
          </dl>)}
          <dl className="recipe_description">
            <dt>레시피</dt>
            <dd dangerouslySetInnerHTML={{ __html: postData.recipeDescHtml }}></dd>
          </dl>
        </div>
      </div>
      <div className="recipe_comment">

        <h3>이번 <b className="fcg">레시피</b>는 어떠셨나요?</h3>
        {showCommentFrm && <div className="comment_frm">
            <span className="mucvti"></span>
            <textarea value={scroreMsg} onChange={(e) => setScroreMsg(e.target.value)} placeholder="여러분만의 레시피 팁이나 다양한 정보를 공유해주세요!"></textarea>
            <ScoreFrm score={score} setScore={setScore} />
            <div className="comment_btn">
                <button className="btnNormal">취소</button>
                <button className="btnSubmit" disabled={!scroreMsg ? true : false} onClick={submitScore}>등록</button>
            </div>
        </div>}
        {postData.scoreList && postData.scoreList.length > 0 && <ul className="comment_list">
          {postData.scoreList.map(comment => <li key={comment.customerMallId}>
            <span className="mucvti" style={comment.mukTypeMobileThumbnailImagePath ? {backgroundImage:`url('${comment.mukTypeMobileThumbnailImagePath}')`}:{}}></span>
            <span className="score">{returnScore(comment.rcsScore)}</span>
            <b>{comment.customerMallId}</b> <span className="date">{returnTime(comment.registerTime)}</span>
            <div className="dialog">{comment.description}</div>
            <button className={`like ${comment.isSetGoodYn === 'Y'? 'on':''}`} onClick={() => likeComment(comment.customerId)}>{comment.goodCount}</button>
            {comment.customerMallId === user.username && <button className="edit" onClick={() => setShowModal(!showModal)}>{comment.goodCount}</button>}
          </li>)}
        </ul>}
      </div>
    </>}
    <Modal title="댓글 수정하기" visible={showModal} onCancel={reSortComment} className="recipe_popup comment_frm"
        footer={[
          <button className="btnNormal" key="back" onClick={reSortComment}>취소</button>,
          <button className="btnSubmit" key="submit" disabled={!scroreMsg ? true : false} onClick={submitScore}>등록</button>
        ]}
      >
      <div className="comment_div">
        <p>입력내용</p>
        <textarea value={scroreMsg} onChange={(e) => setScroreMsg(e.target.value)} placeholder="여러분만의 레시피 팁이나 다양한 정보를 공유해주세요!"></textarea>
      </div>
      <ScoreFrm score={score} setScore={setScore} />
    </Modal>
    </>
  );
}
const ScoreFrm = (props) => {
  return (
    <span className="recipe_score">
      <input type="radio" value={1} checked={props.score === 1 ? true:false} onChange={(e) => {if(e.target.checked) props.setScore(parseInt(e.target.value))}} name="recipe_score" />
      <input type="radio" value={2} checked={props.score === 2 ? true:false} onChange={(e) => {if(e.target.checked) props.setScore(parseInt(e.target.value))}} name="recipe_score" />
      <input type="radio" value={3} checked={props.score === 3 ? true:false} onChange={(e) => {if(e.target.checked) props.setScore(parseInt(e.target.value))}} name="recipe_score" />
      <input type="radio" value={4} checked={props.score === 4 ? true:false} onChange={(e) => {if(e.target.checked) props.setScore(parseInt(e.target.value))}} name="recipe_score" />
      <input type="radio" value={5} checked={props.score === 5 ? true:false} onChange={(e) => {if(e.target.checked) props.setScore(parseInt(e.target.value))}} name="recipe_score" />
      <span></span>
    </span>
  )
}
