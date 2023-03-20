import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Modal } from 'antd';
import {
  EnterOutlined,
  PushpinFilled,
  LinkOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../_actions/shop_actions';

const { error } = Modal;

function BoardRow(props) {
  const user = useSelector((state) => state.user);
  const item = props.item;
  const prd = props.prd;
  const fixed = item.fixed ? 'fixed' : '';
  const changeDate = (date) => {
    const value = date.substring(0, 11);
    return moment(value).format('YYYY-MM-DD');
  };
  return (
    <li className={fixed}>
      <Link
        to={
          !item.secret
            ? `/${props.boardname}/${item[props.coloumns.no]}`
            : item.writer === user.username
            ? `/${props.boardname}/${item[props.coloumns.no]}`
            : ''
        }
        onClick={() => {
          item.secret &&
            item.writer !== user.username &&
            error({
              title: '비밀글입니다',
              content: '글쓴이만 보실 수 있습니다.',
              okText: '확인',
            });
        }}
      >
        {props.coloumns.hasOwnProperty('no') && (
          <span className="no">
            {item.fixed === '공지' ? (
              <>공지</>
            ) : item.fixed ? (
              <PushpinFilled />
            ) : (
              <>{item[props.coloumns.no]}</>
            )}
          </span>
        )}
        {props.coloumns.hasOwnProperty('product') && (
          <span className="thumbnail">
            {prd &&
              prd.find(
                (prdItem) =>
                  prdItem.product_no === item[props.coloumns.product],
              ) && (
                <img
                  src={
                    prd.find(
                      (product) =>
                        product.product_no === item[props.coloumns.product],
                    ).image_medium
                  }
                  alt=""
                />
              )}
          </span>
        )}
        {props.coloumns.hasOwnProperty('category') && (
          <span className="category">{item[props.coloumns.category]}</span>
        )}
        {props.coloumns.hasOwnProperty('title') && (
          <span className="subject">
            {props.coloumns.hasOwnProperty('no') && item.fixed === '공지' && (
              <em>공지</em>
            )}
            {props.coloumns.hasOwnProperty('no') &&
              item.fixed &&
              item.fixed !== '공지' && (
                <em>
                  <PushpinFilled />
                </em>
              )}
            {props.coloumns.hasOwnProperty('product') &&
              prd &&
              prd.find(
                (prdItem) =>
                  prdItem.product_no === item[props.coloumns.product],
              ) && (
                <small>
                  {
                    prd.find(
                      (product) =>
                        product.product_no === item[props.coloumns.product],
                    ).name
                  }
                </small>
              )}
            {item[props.coloumns.title]} {item.secret && <LockOutlined />}
            {item.best && <em className="itemLabel bkfy">BEST</em>}
            {item.new && <em className="itemLabel byfk">NEW</em>}
            {item.file && <LinkOutlined />}
          </span>
        )}
        {props.coloumns.hasOwnProperty('writer') && (
          <span className="writer">{item[props.coloumns.writer]}</span>
        )}
        {props.coloumns.hasOwnProperty('date') && (
          <span className="date">{changeDate(item[props.coloumns.date])}</span>
        )}
        {props.coloumns.hasOwnProperty('hit') && (
          <span className="hit">{item[props.coloumns.hit]}</span>
        )}
        {props.coloumns.hasOwnProperty('vote') && (
          <span className="vote">{item[props.coloumns.vote]}</span>
        )}
        {props.coloumns.hasOwnProperty('score') && (
          <span className="score">
            <em className="displaynone">{item[props.coloumns.score]}</em>
          </span>
        )}
      </Link>
      {props.reply && item.reply && (
        <ShowReply
          item={item['reply']}
          boardname={props.boardname}
          coloumns={props.coloumns}
        />
      )}
    </li>
  );
}

export default function BoardItem(props) {
  const prd = useSelector((state) => state.shop.product);
  const dispatch = useDispatch();
  useEffect(() => {
    if (props.coloumns.hasOwnProperty('product')) dispatch(getProduct());
  }, [props.boardname]);
  return (
    <>
      {props.fixed &&
        props.list
          .filter((item) => item.fixed === '공지')
          .map((item, index) => (
            <BoardRow
              coloumns={props.coloumns}
              boardname={props.boardname}
              prd={prd}
              item={item}
              key={index}
            />
          ))}
      {props.fixed &&
        props.list
          .filter((item) => item.fixed && item.fixed !== '공지')
          .map((item, index) => (
            <BoardRow
              coloumns={props.coloumns}
              boardname={props.boardname}
              prd={prd}
              item={item}
              key={index}
            />
          ))}
      {props.list
        .filter((item) => !item.fixed)
        .map((item, index) => (
          <BoardRow
            coloumns={props.coloumns}
            boardname={props.boardname}
            prd={prd}
            item={item}
            key={index}
          />
        ))}
    </>
  );
}
function ShowReply(props) {
  return (
    <Link
      to={`/${props.boardname}/${props.item[`${props.coloumns.no}`]}`}
      className="reply"
    >
      {props.coloumns.hasOwnProperty('no') && (
        <span className="no">{props.item[props.coloumns.no]}</span>
      )}
      {props.coloumns.hasOwnProperty('product') && (
        <span className="thumbnail">
          {prd &&
            prd.find(
              (prdItem) =>
                prdItem.product_no === props.item[props.coloumns.product],
            ) && (
              <img
                src={
                  prd.find(
                    (product) =>
                      product.product_no === props.item[props.coloumns.product],
                  ).image_medium
                }
                alt=""
              />
            )}
        </span>
      )}
      {props.coloumns.hasOwnProperty('category') && (
        <span className="category">{props.item[props.coloumns.category]}</span>
      )}
      {props.coloumns.hasOwnProperty('title') && (
        <span className="subject">
          <EnterOutlined />
          {props.item[props.coloumns.title]}{' '}
          {props.item.secret && <LockOutlined />}
          <em className="itemLabel byfk">NEW</em>
        </span>
      )}
      {props.coloumns.hasOwnProperty('writer') && (
        <span className="writer">{props.item[props.coloumns.writer]}</span>
      )}
      {props.coloumns.hasOwnProperty('date') && (
        <span className="date">{changeDate(item[props.coloumns.date])}</span>
      )}
    </Link>
  );
}
