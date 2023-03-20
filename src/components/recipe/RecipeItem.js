import React from 'react'
import { IMG_SERVER } from '../../utils/customAPI'
import { Link } from 'react-router-dom';

export default function RecipeItem(props) {
  const item = props.item
  const checkBookmark = async (isBookmark, postId) => {
    let body = {
      mallCd: 'cafe24',
      username: props.username,
      recipeId: postId,
    };
    let url = '/api/v1/customer/removeBookmarkRecipe';
    if (isBookmark === 'N') url = '/api/v1/customer/addBookmarkRecipe';
    try {
      const request = await Api.post(url, body);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <li key={item.recipeId}>
      <Link to={`/recipe/${item.recipeId}`}>
        <img src={`${IMG_SERVER}${item.recipeRepImageUrl}`}/>
        <span className="info">
          <small><b>난이도</b> {item.recipeDifficult}</small>
          <small><b>소요시간</b> {item.recipeCookingTime}</small>
        </span>
        <strong className="title">{item.recipeTitle}</strong>
      </Link>
      {item.includeRecommendYn && <button className={`bookmark is${item.includeRecommendYn}`} onClick={()=>checkBookmark(item.includeRecommendYn,item.recipeId)}></button>}
    </li>
  )
}
