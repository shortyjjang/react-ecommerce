import React, { useEffect, useCallback, useState } from 'react';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

export default function Wesave(props) {
  const [epId, setEpId] = useState('ep03')
  const [ribonClass, setRibonClass] = useState('ribbon')
  const animation = useCallback( () => {
    if (epId === 'ep01' && !!document.getElementById('nong_03')) {
      if (window.pageYOffset + window.innerHeight > document.getElementById('nong_03').offsetTop + document.querySelector('#nong_03').clientHeight) {
        setRibonClass('ribbon action')
      } else {
        setRibonClass('ribbon')
      }
    }
  },[epId])
  useEffect(() => {
    window.addEventListener('scroll', animation);
  }, []);
  return (
    <div id="contents" className="wesave">
      <div className={`nong_intro ${epId}`}>
        <h3>WE SAVE #농가 <br />위기에 처한 밭을 구해요</h3>
        <h5>작황이 좋지 않아 갈아엎을 위기에 처한 밭을 구합니다 <br />농가와 소비자를 웃게 할 수 있다면 우리는 어디든 달려갑니다 <br /><br />주위에 위기의 밭이 있으신가요? <br />여러분의 제보를 기다립니다</h5>
        <Link to="/contact" className="nong_btn h_bgy">지금 바로 제보하기</Link>
      </div>
      <Tabs defaultActiveKey="3" onChange={(activeKey) => setEpId(`ep0${activeKey}`)}>
        <TabPane tab="Ep1. 혹부리당근(완판)" key="1" className="ep01">
          <div className="nong_01 center_box ta_c">
            <p>혹부리당근을 아시나요?</p>
            <h3>갈아 엎을 위기에 처한 당근 밭을 멋지게 살려낸 <br />예스어스와 여러분의 첫번째 이야기</h3>
            <div className="inline_box">
              <div className="item_inline">
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0101.png" alt="당근 일러스트" />
                &nbsp;<strong>판매된 혹부리당근 <br />4,076kg</strong>
              </div>
              <div className="item_inline bordered">
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0102.png" alt="농가 일러스트" />
                &nbsp;<strong>구제한 밭 면적 <br />16,500m2 이상</strong>
              </div>
              <div className="item_inline">
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0103.png" alt="저금통 일러스트" />
                &nbsp;<strong>추가 발생 농가 수익* <br />10,000,000원 이상
                  <span>* 혹부리당근 덕에 수확하여 <br />기존 판로에 판매한 일반 당근</span></strong>
              </div>
            </div>
          </div>
          <div className="line_div center_box">
            <div className="nong_02  flex_box">
              <div className="nong_title">
                <h3>혹부리 당근의 <br />탄생</h3>
                <a href="/article/%EC%98%88%EC%8A%A4%EC%96%B4%EC%8A%A4-%EB%B8%94%EB%A1%9C%EA%B7%B8/8/134/" className="nong_btn sml h_bgy">자세히 보기</a>
              </div>
              <div className="nong_cont">
                <p>
                  작황이 불안정해 10톤이 넘는 당근밭을 갈아 엎어야한다는 안타까운 소식에 <br />
                  현장을 찾아간 예스어스 <br />
                  직접 가 본 현장에는 모양을 이유로 판매할 수 없는 당근들로 밭이 가득했습니다 <br /></p>
                <p>
                  수 개월간 공들여 키운 밭을 수확도 못해보고 전량 폐기를 고민하는 농가를 위해 <br />
                  우리가 나섰습니다 <br /><span className="bgy">‘저희가 어떻게든 팔아볼테니 버리지 말아주세요’</span>
                </p>
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0201.png" alt="당근밭 사진" className="mgt40" />
                &nbsp;</div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_03 center_box flex_box" id="nong_03">
              <div className="nong_title">
                <h3>없어서 <br />못파는 지경까지</h3>
              </div>
              <div className="nong_cont">
                <p>안타까운 사연에 공감한 예스어스 고객님들의 주문이 폭주 실시간으로 수확하고 발송해도 판매 속도를 따라가지 못할 놀라운 상황이 벌어졌죠</p>
                <p>결국 혹부리당근 1차 판매분 완판! <br /><span className="bgy">남은 당근 수확까지 추가로 진행하기로 결정했습니다</span>
                </p>
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0301.png" alt="1차완판 표 이미지" className="mgt20" id="ribbon" />
                &nbsp;<img src="https://yes-us.co.kr/web/upload/yesus/nong_0302.png" alt="리본라벨" className={ribonClass} />
                &nbsp;<div id="carrot"></div>
              </div>
            </div>
          </div>
          <div className="bgy displaynone">
            <a href="/member/join.html" className="xans-element- xans-layout xans-layout-statelogoff "><strong>[2022 신규회원 한정] 지금 가입하고 혹부리당근을 100원에 받아가세요! &gt;</strong></a>
          </div>
          <div className="line_div displaynone">
            <div className="nong_04 center_box flex_box">
              <div className="nong_title">
                <h3>2차 앵콜판매 <br />진행중</h3>
                <a href="/surl/P/24" className="nong_btn sml h_bgy displaynone">신규회원 100원에 구매하기</a>
              </div>
              <div className="nong_cont">
                <p>
                  수확을 마친 당근들이 입고되어 현재 <span className="bgy">앵콜 판매를 진행 중입니다</span>
                </p>
                <p>
                  단지 못생겼다는 이유만으로 버려질 위험에 처한 혹부리 당근을 구해주세요
                  당신의 손길이 농가와 지구에게 큰 힘이 됩니다!
                </p>
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0401.png" alt="당근배너 사진" className="mgt20" />
                &nbsp;</div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_05 center_box flex_box">
              <div className="nong_title">
                <h3>우리가 <br />함께 구한 것</h3>
              </div>
              <div className="nong_cont">
                <p>
                  버려질 뻔한 당근밭도 구하고, 좌절했던 농민도 구했어요 <br />더불어 내일의 지구도 구했죠 <span className="bgy">당신과 우리가 함께</span>
                </p>
                <dl className="mgt40"><dt>
                  <img src="https://yes-us.co.kr/web/upload/yesus/nong_0501.png" alt="농장주 일러스트" />
                  <strong>농장주</strong>
                </dt>
                  <dd>
                    <strong>직원들도 죄다 갈아엎자고 하던걸 가져다 팔아주니 고맙지요</strong>
                    <p>당근 한번 심고 수확하려면 족히 3~4개월은 걸리는데 땅은 땅대로 버리고 <br />
                      인건비에 비료값에 이것저것 다하면 손해가 막심했죠 <br />
                      이걸 가져다 팔겠다고 했을 때 사실 믿지도 않았어요 그런데 막상 시작하니 <br />
                      주문이 계속 들어오는걸 보고 이게 꿈인가 싶었죠 막상 캐보니 팔 수 있게 <br />
                      생긴 것들도 생각보다 많아서 이거 그냥 다 엎었으면 어쩔 뻔했나 싶기도 하고요 <br /><br />
                      저희 뿐만 아니라 많은 농가들이 이런 도움을 받을 수 있으면 좋겠네요.</p>
                  </dd>
                  <dt>
                    <img src="https://yes-us.co.kr/web/upload/yesus/nong_0502.png" alt="이지혁 본부장 일러스트" />
                    <strong>예스어스<br />이지혁 본부장</strong>
                  </dt>
                  <dd>
                    <strong>팔릴수록 저희는 손핸데 웃음이 나오더라고요</strong>
                    <p>
                      당시 예스어스의 상품 정책부터 마이너스 수익성, 통념을 넘어서는 특이한 <br />
                      생김새의 당근들.. 너무나도 많은 제약이 있었지만 <br />
                      ‘이런 참상을 봐놓고도 못본 체한다면 우리는 이 사업을 할 자격이 없다.’는 <br />
                      생각에 뒤도 안보고 판매를 하게되었습니다. <br />
                      팔릴수록 적자가 늘어남에도 폭주하는 주문을 보고 미소지을 수 있었던건 <br />
                      일종의 소명의식 때문이었죠. <br /><br />
                      우리는 스스로를 장사꾼이 아닌 ‘건전한 소비 문화를 디자인하는 사람들’로 <br />
                      정의합니다. 그래서 앞으로도 더 많은 농가에 손길을 뻗을 생각입니다.
                    </p>
                  </dd>
                  <dt>
                    <img src="https://yes-us.co.kr/web/upload/yesus/nong_0503.png" alt="지구지킴이 일러스트" />
                    <strong>예스어스 고객<br />이**님</strong>
                    <span>지구지킴이 1개월차</span>
                  </dt>
                  <dd>
                    <strong>세상에 이렇게 귀여운 당근을 본 적이 없어요</strong>
                    <p>
                      늘 제가 봐왔던 당근은 길쭉하고 뾰족 하다고 생각했는데 인형인 줄 알았어요. <br />
                      못났다고 표현하기보다는 사랑스러운 자태를 드러내는 당근들을 보면서 <br />
                      먹기가 미안했어요. 이렇게 버려지는 당근이 많다는 생각에 마음이 아팠지만 <br />
                      앞으로 이런 사랑스러운 농작물 많이 애용하려고요.  <br />
                      참.. 저는 생 당근을 좋아하는데 생으로 먹어도 손색이 없었어요. <br /><br />
                      이런 좋은 취지의 농산물들이 더 늘어나서 농부님들에게 피해가는 일이 없고 <br />
                      그러면서 버려지는 농산물이 줄어들었으면 좋겠어요.
                    </p>
                  </dd>
                </dl></div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Ep2. 사춘기감자" key="2" className="ep02">
          <div className="nong_01 center_box ta_c">
            <p>WE SAVE #농가 두번째 이야기</p>
            <h3>매일 3톤이 넘는<br />감자가 버려집니다</h3>
            <p className="text_copy">겉 껍질에 딱지가 생겨서, 자라는 과정에 터진 상처가 남아서<br /> 버려질 위기에 처한 햇감자를 살려주세요</p>
            <a href="/surl/P/38" className="nong_btn h_bgy">사춘기감자 구출하기</a>
          </div>
          <div className="line_div center_box">
            <div className="nong_01  ta_c">
              <p>연중 가장 맛있는 감자가 나오는 지금,</p>
              <h3>버려질 위기에 처한<br /> 감자를 구해주세요!</h3>
              <div className="inline_box">
                <div className="item_inline">
                  <img src="https://yes-us.co.kr/web/upload/yesus/nong_0104.png" alt="감자밭" />
                  &nbsp;<strong>무농약 수막재배로 키워<br /> 단단하고 풍미 가득!</strong>
                </div>
                <div className="item_inline bordered">
                  <img src="https://yes-us.co.kr/web/upload/yesus/nong_0105.png" alt="감자" />
                  &nbsp;<strong>갓 수확해 신선한<br /> 밀양 햇 수미감자</strong>
                </div>
                <div className="item_inline">
                  <img src="https://yes-us.co.kr/web/upload/yesus/nong_0106.png" alt="감자칼" />
                  &nbsp;<strong>약간의 손질만 하면<br />맛있게 드실 수 있어요!</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_02 center_box flex_box">
              <div className="nong_title">
                <h3>첫 만남</h3>
              </div>
              <div className="nong_cont">
                <p>
                  3월의 어느 날, 밀양에 있는 감자밭에서 전화가 걸려왔습니다<br />
                  혹부리당근처럼 다 갈아엎는 수준은 아니지만 대량의 감자가 버려질 위기에 놓였다는 제보
                  지체할 시간이 없어 만사 제쳐두고 즉시 현장을 방문했습니다
                </p>
                <p>
                  수확이 끝난 밭 고랑에 쓸쓸히 나뒹구는 감자들이 보입니다<br />
                  “아, 저 친구들이구나!”
                </p>
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0202.png" alt="감자밭 사진" className="mgt40" />
                &nbsp;</div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_03 center_box flex_box">
              <div className="nong_title">
                <h3>사춘기감자?</h3>
              </div>
              <div className="nong_cont">
                <p>군데군데 피어오른 피부트러블, 깨지고 터진 성장통의 흔적들<br />
                  완전치는 않지만 그래서 더 아름다웠던<br />
                  우리네 사춘기를 닮아 ‘사춘기감자’라고 이름지었어요</p>
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0303.png" alt="감자" className="mgt20" />
                &nbsp;</div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_04 center_box flex_box">
              <div className="nong_title">
                <h3>여러분을<br /> 기다립니다</h3>
                <a href="/surl/P/38" className="nong_btn sml h_bgy">사춘기감자 구출하기</a>
              </div>
              <div className="nong_cont">
                <p>
                  손상이 심해 먹기 어려운 것들은 골라내고 먹기에 괜찮은 친구들은 주워 담습니다<br />
                  그렇게 하우스를 훑고 다녀보니 하루 만에 3톤이 넘는 감자가 쌓이네요<br />
                  창고에 안전하게 모셔두고 상품 오픈 완료!<br />
                  신선한 햇감자들이 출고될 날을 애타게 기다립니다
                </p>
                <img src="https://yes-us.co.kr/web/upload/yesus/nong_0402.png" alt="감자출고 사진" className="mgt20" />
                &nbsp;</div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="Ep3. 째깐이 무" key="3" className="ep03">
          <div className="nong_01 center_box ta_c">
            <p>WE SAVE #농가 세번째 이야기</p>
            <h3>그저 좀 작다는 이유로<br />버려집니다</h3>
            <p className="text_copy">작게 자라 한번에 요리해먹기 좋은 크기의 친환경 햇무가<br />대량으로 버려질 위기에 처했어요</p>
            <a href="/surl/P/42" className="nong_btn h_bgy">째깐이 무 구출하기</a>
          </div>
          <div className="line_div center_box">
            <div className="nong_01 ta_c">
              <p>수확의 기쁨 대신 한숨짓는 농가를 위해</p>
              <h3>버려질 위기에 처한 무를<br />구해주세요!</h3>
              <div className="inline_box">
                <div className="item_inline">
                  <img src="//yes-us.co.kr/web/upload/yesus/nong_0107.png" alt="무밭 일러스트" />
                  &nbsp;<strong>갓 수확해 신선한<br />친환경 햇무</strong>
                </div>
                <div className="item_inline bordered">
                  <img src="//yes-us.co.kr/web/upload/yesus/nong_0108.png" alt="무 일러스트" />
                  &nbsp;<strong>째깐해서 남지 않아<br />오히려 좋아!</strong>
                </div>
                <div className="item_inline">
                  <img src="//yes-us.co.kr/web/upload/yesus/nong_0109.png" alt="샘표 일러스트" />
                  &nbsp;<strong>풍성한 샘표식품<br />양념 선물까지</strong>
                </div>
              </div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_02 center_box flex_box">
              <div className="nong_title">
                <h3>대지의 축복</h3>
              </div>
              <div className="nong_cont">
                <p>
                  까다로운 친환경 학교 급식 기준을 통과하며 수년째 납품 중인 전북 군산의 무 농가 <br />
                  혹독한 추위를 견디며 잘 자라준 무들을 보고 있자니 친환경 무는 땅이 주는 자연의 선물이라는 생각이 듭니다
                </p>
                <p>
                  그런데,
                </p>
                <img src="//yes-us.co.kr/web/upload/yesus/nong_0203.png" alt="무밭 사진" className="mgt40" />
                &nbsp;</div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_02 center_box flex_box">
              <div className="nong_title">
                <h3>농가의 한숨</h3>
              </div>
              <div className="nong_cont">
                <p>
                  수확의 기쁨으로 환희에 차있어야 할 농부들의 얼굴에 근심이 가득합니다<br />
                  친환경 급식 납품 기준인 개당 1kg 중량에 미달하는 무들이 잔뜩 나와서인데요<br />
                  갑작스런 진딧물의 습격으로 잎이 손상되면서 충분히 크게 자라지 못했다고 해요<br />
                  예년만 같아도 농가에서 직접 드시고 주변에 나누면 소진이 되었는데 올해는 대부분 버리게 생겼다고 긴 한숨을 쉬셨습니다
                </p>
                <img src="//yes-us.co.kr/web/upload/yesus/nong_0304.png" alt="무 사진" className="mgt20" />
                &nbsp;</div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_04 center_box flex_box">
              <div className="nong_title">
                <h3>오히려 좋아, <br />째깐이 무</h3>
                <a href="/surl/P/42" className="nong_btn sml yellow">째깐이 무 구출하기</a>
              </div>
              <div className="nong_cont">
                <p>
                  밭에서 ‘째깐이, 째깐이’라고 부르시는게 어감이 귀여워서<br />
                  이름은 ‘째깐이 무＇라고 지어봤습니다<br />
                  친환경 학교 급식에 나가는 친구들과 똑같은 맛과 영양에<br />
                  300g ~ 800g 정도 크기로 요리해먹기에 오히려 적당한 크기!
                </p>
                <img src="//yes-us.co.kr/web/upload/yesus/nong_0403.png" alt="무 사진" className="mgt20" />
                &nbsp;</div>
            </div>
          </div>
          <div className="line_div">
            <div className="nong_04 center_box flex_box">
              <div className="nong_title">
                <h3>감사합니다</h3>
                <a href="/surl/P/42" className="nong_btn sml yellow">째깐이 무 구출하기</a>
              </div>
              <div className="nong_cont">
                <p>
                  2톤이 넘는 째깐이 무가 여러분의 손길을 기다립니다
                </p>
                <p>
                  ‘째깐해서 버려불란걸<br />
                  값도 더 쳐가꼬 팔아준당께 감사할 일이제~’<br />
                  - 생산자 안순자님 -
                </p>
                <img src="//yes-us.co.kr/web/upload/yesus/nong_0504.png" alt="안순자님 사진" className="mgt20" />
                &nbsp;</div>
            </div>
          </div>
        </TabPane>
      </Tabs>
      <div className="line_div">
        <div className="nong_06 center_box ta_c">
          <p>#예스어스 #WESAVE농가</p>
          <strong className="big_txt">판로가 없어 갈아엎는 밭이 <br />없어지는 그날까지!</strong>
          <img src="https://yes-us.co.kr/web/upload/yesus/nong_ani.gif" alt="선순환 애니메이션" />
          &nbsp;<strong className="sml_txt">
            ‘지구를 구하는 일’에 함께해주시는 모든 여러분 고맙습니다! <br /><br />
            버려질 위기에서 기적적으로 살아난 당근밭처럼 <br />
            또 다른 위험에 처한 농가의 이야기를 지금 바로 알려주세요! <br /><br />
            당신의 용기가 농가에 새로운 희망이 될 거예요!
          </strong>
          <a href="/shopinfo/contact.html" className="nong_btn h_bgy">지금 바로 제보하기</a>
        </div>
      </div>
    </div>
  );
}
