import React, { useEffect, useState } from 'react'
import Dropzone from 'react-dropzone'
import {Radio} from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import {Modal, Select, Checkbox } from 'antd';
import Api from '../../utils/customAPI'
import {StarFilled} from '@ant-design/icons'
import { useSelector } from 'react-redux';

const { Option } = Select;

export default function BoardWrite(props) {
  const user = useSelector(state => state.user)
  const navigate = useNavigate()
  const [openSearchPrd,setOpenSearchPrd] = useState(false);
  const [product, setProduct] = useState({
    no: '',
    keyword: '',
    length: 0,
    list: {}
  });
  const [showPrivacy, setShowPrivacy] = useState(false)
  const [isPrivacy, setIsPrivacy] = useState(false)
  const [prd, selectPrd] = useState([])
  const [data, setData] = useState({})
  const dropHandler = (files) => {
    let formData = new FormData();
    let config = {header: {'content-type': 'multipart/form-data'}}
    formData.append('file', files[0])
    Api.post(`image`, formData, config)
      .then(res => {
        if(res.data.success) {
          setData({...data, images: [...data.images, res.data.filePath]})
        }else{
          alert('파일 업로드에 실패했습니다.')
        }
      })
  }
  const deleteImage = (file) => {
    const currentImage = data.file.indexOf(file)
    let newImages = [...data.file];
    newImages.splice(currentImage,1)
    setData({...data,file: newImages});
  }
  const searchProduct = async () => {
    const res = await Api.get('/productList.json')
    if(product.no === 'product_name') {
      setProduct({
        ...product,
        list: res.filter(product => product.product_name === product.value)
      })
    }
    if(product.no === 'product_code') {
      setProduct({
        ...product,
        list: res.filter(product => product.product_code === product.value)
      })
    }
    
  }
  const handleSubmit = (e) => {
    e.preventDefault();
  }
  const onChange = (e) => {
    const {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })

  }
  useEffect( () => {
  },[])
  return (
    <div className="boardForm">
    {props.coloumns && props.coloumns.indexOf('product')>-1 && 
      <div className="productPreview form">
        <img src={prd.image_medium ? prd.image_medium : '//img.echosting.cafe24.com/thumb/75x75.gif'} alt="" className="thumbnail" />
        <span className="information">
          {prd.length > 0 &&
            <>
              <b>[{prd.product_type}] {prd.product_name}</b>
              <span className="price">{prd.product_sale_price}원 </span>
            </>
          }
          <button className="btnNormal" onClick={() => setOpenSearchPrd(true)}>상품 상세보기</button>
        </span>
      </div>
    }
      <form onSubmit={handleSubmit}>
        {props.category &&
          <div className="form_rows">
            <label className="form_rows-label">카테고리</label>
            <Select defaultValue="1">
            {props.category.map(cate => <Option key={cate.value} value={cate.value}>{cate.name}</Option>)}
            </Select>
          </div>
        }
        <div className="form_rows">
          <label className="form_rows-label">제목</label>
          <input type="text" onChange={onChange} value={data.title} name="title" />
        </div>
        {props.coloumns && props.coloumns.indexOf('score')>-1 && 
          <div className="form_rows">
            <label className="form_rows-label">평점</label>
            <Radio.Group onChange={onChange} value={data.point} name="point">
              <Radio value={5}><StarFilled /><StarFilled /><StarFilled /><StarFilled /><StarFilled /></Radio>
              <Radio value={4}><StarFilled /><StarFilled /><StarFilled /><StarFilled /></Radio>
              <Radio value={3}><StarFilled /><StarFilled /><StarFilled /></Radio>
              <Radio value={2}><StarFilled /><StarFilled /></Radio>
              <Radio value={1}><StarFilled /></Radio>
            </Radio.Group>
          </div>
        }
        <div className="form_rows">
          <textarea name="content" value={data.content} onChange={onChange}></textarea>
        </div>
        {props.coloumns && props.coloumns.indexOf('file')>-1 && <>
          <div className="form_rows">
            <label className="form_rows-label">첨부파일</label>
            <Dropzone onDrop={dropHandler}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()} className="file">
                  <input {...getInputProps()} />
                  <p>파일을 드래그 하거나 [클릭] 해주세요.<br />jpg / png / gif 만 등록해주세요.<br />최대 5개까지 등록 가능합니다.</p>
                </div>
              )}
            </Dropzone>
          </div>
          {data.file && <div className="form_rows">
            <label className="form_rows-label"></label>
            {data.file.map((image) => <img src={`http://localhost:5000/${image}`} onClick={deleteImage} key={image} alt="" />)}
          </div>}
        </>}
        {props.coloumns && props.coloumns.indexOf('url')>-1 && <div className="form_rows">
          <label className="form_rows-label">UCC URL</label>
          <input type="text" onChange={onChange} value={data.url} name="url" />
        </div>}
        {!user.username && <div className="form_rows">
          <label className="form_rows-label">비밀번호</label>
          <input type="text" onChange={onChange} value={data.secure_password} name="secure_password" />
        </div>}
        {!user.username && <div className="privacy">
          <Checkbox onChange={e => setIsPrivacy(e.target.checked)}>개인정보 수집 및 활용 동의</Checkbox>
          <button onClick={() => setShowPrivacy(!showPrivacy)}>자세히 보기</button>
        </div>}
        <div className="btn-area">
          {!user.username ? <button type="submit" disabled={isPrivacy ? false : true} className="btnSubmit btn_save">등록</button>
          : <button type="submit" className="btnNormal btn_save">등록</button>}
          <button onClick={() => navigate(-1)} className="btnNormal btn_cancel">취소</button>
        </div>
      </form>
      {!user.username && 
        <Modal
          visible={showPrivacy}
          title="[ 개인정보 수집 및 활용 동의 안내 ]"
          onOk={() => setShowPrivacy(false)}
          onCancel={() => setShowPrivacy(false)}
          footer={[]}
          className="privacy_modal">
          <ol class="num_list">
            <li>개인정보 수집 이용 목적<br />예스어스 ESG / B2B 거래를 희망하는 자에게 연락을 취하기 위함.</li>
            <li>개인정보 수집 항목<br />기업/브랜드 명, 이름, 연락처</li>
            <li>개인정보 이용기간 및 보유기간<br />본 수집, 활용 목적 달성 후 즉시 파기</li>
            <li>개인정보 제공 동의 거부 권리 및 동의 거부에 따른 불이익<br />귀하는 개인 정보 제공 동의를 거부할 권리가 있으며 동의 거부에 따른불이익은 없으나, 거래 문의를 위한 연락이 불가능함을 알려드립니다</li></ol>
        </Modal>
      }
      {props.coloumns && props.coloumns.indexOf('product')>-1 && 
        <Modal
          visible={openSearchPrd}
          title="상품정보선택"
          onOk={() => setOpenSearchPrd(false)}
          onCancel={() => setOpenSearchPrd(false)}
          footer={[]}
          className="searchPrdModal">
          <form onSubmit={searchProduct} className="searchform">
            <input type="text" value={product.keyword} onChange={(e) => setProduct({...product,keyword: e.target.value})} placeholder="상품명을 입력해주세요" />
            <button type="submit" className="btnNormal">검색</button>
          </form>
          <div className="result">총 {product.length}개 의 상품이 검색되었습니다.</div>
          {product.list > 0 && product.list.map(item => 
            <div className="productPreview">
              <Link to={`/product/${item.product_no}`}>
                <img src={item.image_medium} alt="" className="thumbnail" />
                <span className="information">
                  <b>{item.product_name}</b>
                  <span className="price">{item.product_sale_price}원 </span>
                </span>
              </Link>
              <button className="button" onClick={()=>selectPrd(item.product_no)}>선택하기</button>
            </div>
          )}
        </Modal>
      }
    </div>
  )
}
