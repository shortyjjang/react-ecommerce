import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

export default function Address(props) {
  return (
    <>
      <div className="frm_row username">
        <label className="frm_row-label require">받는사람</label>
        <input
          value={props.values.rname}
          onChange={props.onChange}
          name="rname"
          size="15"
          type="text"
        />
      </div>
      <div className="frm_row addr">
        <label className="frm_row-label require">주소</label>
        <span>
          <input
            type="text"
            name="postcode1"
            className="postcode"
            onChange={props.onChange}
            value={props.values.postcode1}
            maxLength="14"
            size="6"
            placeholder="우편번호"
          />
          <button
            type="button"
            className="btnNormal mini"
            onClick={() => props.setShowPostal(true)}
          >
            주소검색
          </button>
          <br />
          <input
            type="text"
            name="addr1"
            value={props.values.addr1}
            className="full"
            placeholder="기본주소"
            size="60"
            maxLength="100"
            readOnly
          />
          <input
            type="text"
            name="addr2"
            value={props.values.addr2}
            className="full"
            placeholder="나머지 주소(선택 입력 가능)"
            size="60"
            maxLength="255"
            onChange={props.onChange}
          />
        </span>
      </div>
      <div className="frm_row ">
        <label className="frm_row-label require">휴대전화</label>
        <Select
          defaultValue="010"
          name="rphone2_1"
          value={props.values.rphone2_1}
          onChange={props.onChange}
        >
          <Option value="010">010</Option>
          <Option value="011">011</Option>
          <Option value="016">016</Option>
          <Option value="017">017</Option>
          <Option value="018">018</Option>
          <Option value="019">019</Option>
        </Select>{' '}
        -{' '}
        <input
          value={props.values.rphone2_2}
          onChange={props.onChange}
          name="rphone2_2"
          maxLength="4"
          size="4"
          type="text"
        />
        -{' '}
        <input
          value={props.values.rphone2_3}
          onChange={props.onChange}
          name="rphone2_3"
          maxLength="4"
          size="4"
          type="text"
        />
      </div>
      <div className="frm_row email">
        <label className="frm_row-label require">이메일</label>
        <input
          value={props.values.oemail1}
          onChange={props.onChange}
          name="oemail1"
          type="text"
        />{' '}
        @&nbsp;
        <Select
          defaultValue="0"
          name="oemail3"
          value={props.values.oemail3}
          onChange={(value) =>
            props.setValue({ ...props.values, oemail3: value })
          }
        >
          <Option value="0">-이메일 선택-</Option>
          <Option value="naver.com">naver.com</Option>
          <Option value="daum.net">daum.net</Option>
          <Option value="nate.com">nate.com</Option>
          <Option value="hotmail.com">hotmail.com</Option>
          <Option value="empas.com">empas.com</Option>
          <Option value="dreamwiz.com">dreamwiz.com</Option>
          <Option value="gmail.com">gmail.com</Option>
          <Option value="etc">직접입력</Option>
        </Select>
        {props.values.oemail3 === 'etc' && (
          <input
            value={props.values.oemail2}
            onChange={props.onChange}
            name="oemail2"
            placeholder="직접입력"
            type="text"
          />
        )}
        <small>
          이메일로 주문 처리 과정을 보내드립니다.
          <br />
          수신 가능한 이메일 주소를 입력해 주세요.
        </small>
      </div>
      <div className="delivery_msg">
        <Select
          defaultValue="0"
          name="omessage_select"
          value={props.values.omessage_select}
          onChange={(value) =>
            props.setValue({ ...props.values, omessage_select: value })
          }
          className="full"
        >
          <Option value="0">-- 메시지 선택 (선택사항) --</Option>
          <Option value="oMessage-1">배송 전에 미리 연락바랍니다.</Option>
          <Option value="oMessage-2">부재 시 경비실에 맡겨주세요.</Option>
          <Option value="oMessage-3">부재 시 문 앞에 놓아주세요.</Option>
          <Option value="oMessage-4">빠른 배송 부탁드립니다.</Option>
          <Option value="oMessage-5">택배함에 보관해 주세요.</Option>
          <Option value="oMessage-input">직접 입력</Option>
        </Select>
        {props.values.omessage_select === 'oMessage-input' && (
          <textarea
            value={props.values.omessage}
            name="omessage"
            onChange={props.onChange}
            maxLength="255"
            cols="70"
          ></textarea>
        )}
      </div>
    </>
  );
}
