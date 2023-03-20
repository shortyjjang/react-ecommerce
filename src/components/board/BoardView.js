import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { LikeOutlined } from '@ant-design/icons';
import BoardPreview from './BoardPreview';
import { Modal } from 'antd';
import { useSelector } from 'react-redux';

const { error } = Modal;

export default function BoardView(props) {
  const user = useSelector((state) => state.user);
  const [prd, setProduct] = useState([]);
  const [showPost, setShowPost] = useState(false);
  const navigate = useNavigate();
  const getProduct = useCallback(async () => {
    const res = await axios.get('/productList.json');
    setProduct(
      res.data.find(
        (product) => product.product_no === props.postData.product_no,
      ),
    );
  }, []);
  useEffect(() => {
    if (props.coloumns.hasOwnProperty('product')) getProduct();
    if (!props.postData.secret || props.postData.writer === user.username) {
      setShowPost(true);
    } else {
      navigate(-1);
    }
  }, []);
  return (
    <>
      {showPost && (
        <>
          {props.coloumns.hasOwnProperty('product') && prd && (
            <div className="productPreview">
              <Link to={`/product/${prd.product_no}`}>
                <img
                  src={
                    prd.image_medium
                      ? prd.image_medium
                      : '//img.echosting.cafe24.com/thumb/75x75.gif'
                  }
                  alt=""
                  className="thumbnail"
                />
                <span className="information">
                  <b>{prd.name}</b>
                  <span className="price">{prd.sales_price}원 </span>
                  <span className="button">상품 상세보기</span>
                </span>
              </Link>
            </div>
          )}
          <div className="boardView">
            {props.coloumns.hasOwnProperty('title') && (
              <div className="title">
                <strong className="label">제목</strong>
                <h3>
                  {props.coloumns.hasOwnProperty('category') && (
                    <span>[{props.postData.category}]</span>
                  )}{' '}
                  {props.postData.subject}
                </h3>
              </div>
            )}
            {props.coloumns.hasOwnProperty('hit') && (
              <span className="hit">조회</span>
            )}
            <div className="info">
              {props.coloumns.hasOwnProperty('writer') && (
                <p className="writer">
                  <strong className="label">작성자</strong>
                  {props.postData.writer}
                </p>
              )}
              {props.coloumns.hasOwnProperty('date') && (
                <p className="regdate ">
                  <strong className="label">작성일</strong>
                  {props.postData.createdAt}
                </p>
              )}
              {props.coloumns.hasOwnProperty('score') && (
                <p className="score">
                  <strong className="label">평점</strong>
                  <em className={`score${props.postData.score}`}></em>
                  <em className="displaynone">{props.postData.score}점</em>
                </p>
              )}
              {props.coloumns.hasOwnProperty('hit') && (
                <p className="hit ">
                  <strong className="label">조회수</strong>
                  {props.postData.hit}
                </p>
              )}
              {props.coloumns.hasOwnProperty('vote') && (
                <p className="vote ">
                  <strong className="label">추천</strong>
                  <button>
                    <LikeOutlined />
                    <b>{props.postData.vote}</b> <small>추천하기</small>
                  </button>
                </p>
              )}
            </div>
            <div className="content">
              <strong className="label">내용</strong>
              <div
                className="detail_div"
                dangerouslySetInnerHTML={{ __html: props.postData.content }}
              ></div>
              {props.postData.file &&
                props.postData.file.map((file, index) => (
                  <img src={file} alt="첨부파일" key={index} className="file" />
                ))}
            </div>
          </div>
          <BoardPreview prevLink={'/notice/2'} nextLink={'/notice/3'} />
          <div className="boardBtns">
            <Link to={`/${props.boardname}`} className="btnNormal">
              목록
            </Link>
          </div>
        </>
      )}
    </>
  );
}
