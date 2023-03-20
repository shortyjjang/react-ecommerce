import React, { useEffect, useState } from 'react';
import FarmChart from '../../components/FarmChart';
import QuoteTable from '../../components/shopinfo/QuoteTable';
import Api from '../../utils/customAPI';
import { Link } from 'react-router-dom';

function Brand(props) {
  const [chartData, setChartData] = useState('');
  const [tableData, setTableData] = useState('');
  const getData = async () => {
    try {
      const request = await Api.get(
        '/api/v1/external/kamis/price/getItemPriceData',
        { params: { rowCount: 6 } },
      );
      setChartData(
        request.data.result.priceDiffData.filter((v) => v.showDataYn === 'Y'),
      );
      setTableData(request.data.result.randomProductPriceData);
    } catch (err) {
      console.log(err);
    }
  };
  const scrollToHashElement = () => {
    const elementToScroll = document.getElementById(
      window.location.hash?.replace('#', ''),
    );

    if (!elementToScroll) return;

    window.scrollTo(0, elementToScroll.offsetTop);
  };
  useEffect(() => {
    //시세차트 및 테이블 정보가져오기
    getData();

    //해시태그영역으로 이동
    if (window.location.hash) scrollToHashElement();

    window.addEventListener('hashchange', scrollToHashElement);
    return window.removeEventListener('hashchange', scrollToHashElement);
  }, []);
  return (
    <div id="content" className="brand">
      <div className="brand_intro">
        <h3>
          20% 비싸게 사서
          <br />
          20% 저렴하게 드립니다
        </h3>
        <p>
          상생으로 농가와 소비자를 잇는 <br />
          예스어스의 운영 원칙, 들어보실래요?
        </p>
      </div>
      <div className="yes20_box">
        <div className="flex_box">
          <div className="left flex_item">
            <h5 className="yes_title">Farmers said</h5>
            <h4 className="yes_mess">
              그거 주워다 팔아봐야
              <br />
              인건비도 안나와요!
            </h4>
            <div className="yes_ment">
              <p>
                못난이 농산물이 버려지는 근본적인 원인은
                <br />
                농가의 소득 문제입니다.
              </p>
              <p>
                가공공장으로 판로가 존재하지만 낮은 수매단가로 인해 <br />
                충분한 수익을 기대하기 어렵습니다.
                <br />
                <span className="bgy">
                  갈아 엎는게 속 편한 구조이니 자연히 폐기가 늘어나지요.
                </span>
              </p>
            </div>
          </div>
          <div className="right flex_item">
            <img
              src="https://yes-us.co.kr/web/upload/yesus/yes20_01.png"
              alt="당근 수확전 사진"
            />
          </div>
        </div>
      </div>
      <div className="yes20_box">
        <div className="flex_box">
          <div className="left flex_item">
            <h5 className="yes_title">Customers said</h5>
            <h4 className="yes_mess">
              친환경 농산물 <br />
              너무 비싸요!
            </h4>
            <div className="yes_ment">
              <p>
                꼼꼼한 관리가 필요한{' '}
                <span className="bgy">친환경 농산물은 가격이</span>
                <br />
                <span className="bgy">비쌀 수밖에 없습니다.</span>&nbsp;
              </p>
              <p>
                친환경 농산물 좋은건 알지만 높은 가격 탓에
                <br />
                선뜻 지갑을 열기 힘들죠.
              </p>
            </div>
          </div>
          <div className="right flex_item">
            {chartData && <FarmChart chartData={chartData} />}
          </div>
        </div>
      </div>
      <div className="yes20_box">
        <div className="flex_box">
          <div className="left flex_item">
            <h5 className="yes_title">We say</h5>
            <h4 className="yes_mess">
              20% 비싸게 사서
              <br />
              20%저렴하게 드립니다
            </h4>
            <div className="yes_ment">
              <p>
                이러한 문제는 직매입 못난이 농산물 유통으로
                <br />
                해결할 수 있습니다.
              </p>
              <p>
                예스어스는 농산물 매입 시 가공공장 등 기존 판로 대비
                <br />
                최소{' '}
                <span className="bgy">
                  20% 비싼 단가로 수매해 농가 수익을 보장
                </span>
                하구요.
              </p>
              <p>
                도매시장을 거치지 않는 산지 직송 못난이 농산물로
                <br />
                시세 대비{' '}
                <span className="bgy">20% 이상 저렴한 가격에 판매</span>합니다.
              </p>
            </div>
          </div>
          <div className="right flex_item">
            <img
              src="https://yes-us.co.kr/web/upload/yesus/yes20_03.png"
              alt="유통경로 이미지"
              className="no_border"
            />
          </div>
        </div>
      </div>
      <div className="yes20_box">
        <div className="flex_box">
          <div className="left flex_item">
            <h5 className="yes_title">How it works</h5>
            <h4 className="yes_mess">
              도매시장을 거치지 않는
              <br />
              직거래
            </h4>
            <div className="yes_ment">
              <p>
                <span className="bgy">직접수매 원칙</span>으로 유통 마진을 줄여
                농가 소득을
                <br />
                극대화합니다.
                <br />
                산지유통에 전문성을 지닌 파트너와 긴밀한 협력으로
                <br />
                <span className="bgy">다수의 거래 농가 확보가 가능</span>합니다.
              </p>
            </div>
          </div>
          <div className="right flex_item">
            <img
              src="https://yes-us.co.kr/web/upload/yesus/yes20_04.png"
              alt="그래프 사진"
              className="no_border"
            />
          </div>
        </div>
      </div>
      <div className="yes20_box">
        <div className="flex_box">
          <div className="left flex_item">
            <h4 className="yes_mess">
              농가와 소비자
              <br />
              모두가 이득
            </h4>
            <div className="yes_ment">
              <p>
                못난이 농산물은 농가의 가외 소득원으로
                <br />
                시세의 영향을 적게 받습니다.
                <br />
                따라서 저렴한 가격에 제공하여도{' '}
                <span className="bgy">농가와 소비자</span>
                <br />
                <span className="bgy">모두가 이득</span>입니다.
              </p>
            </div>
          </div>
          <div className="right flex_item">
            <table className="yes_table">
              <caption>소득원 비교표</caption>
              <colgroup>
                <col style={{ width: '33%' }} />
                <col style={{ width: '33%' }} />
                <col style={{ width: '33%' }} />
              </colgroup>
              <tbody>
                <tr>
                  <td></td>
                  <td className="bgg">일반농산물</td>
                  <td>못난이농산물</td>
                </tr>
                <tr>
                  <td className="left">소득원</td>
                  <td className="bgg">주소득원</td>
                  <td className="shd_box fw9">가외소득원</td>
                </tr>
                <tr>
                  <td className="left">판매가 결정 요인</td>
                  <td className="bgg">시세</td>
                  <td className="fw9">협의</td>
                </tr>
                <tr>
                  <td className="left">판매가 인하 시</td>
                  <td className="bgg">적자 위험</td>
                  <td className="fw9">흑자 감소</td>
                </tr>
                <tr>
                  <td className="left">가격 협상</td>
                  <td className="bgg">경직</td>
                  <td className="fw9">유연</td>
                </tr>
                <tr>
                  <td className="left">호혜적 가격형성</td>
                  <td className="bgg">어려움</td>
                  <td className="fw9">용이</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="yes20_box" id="week_save">
        <div className="center_box">
          <h5 className="yes_title">Check this out!</h5>
          <h4 className="yes_mess">
            얼만큼 절약되는지 직접 확인하세요 <br /> 시세는 매주 업데이트 됩니다
          </h4>
          {tableData && <QuoteTable data={tableData} />}
          <div className="ta_c">
            <Link to="/product/22" className="sqr_btn">
              지금 구매하기
            </Link>
          </div>
        </div>
      </div>
      <div className="yes20_box bb0">
        <div className="center_box">
          <h5 className="yes_title">Contact us</h5>
          <h4 className="cont_text">
            예스어스는 언제든 열려 있습니다.
            <br />
            못난이 농산물을 판매하고 싶은 농가, 업무 제휴를 원하는 기업 담당자분
            등 누구나 편하게 연락주세요!{' '}
          </h4>
          <Link to="/contact" className="sqr_btn">
            자세히 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Brand;
