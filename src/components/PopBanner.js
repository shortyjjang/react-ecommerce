import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons'
import { IMG_SERVER } from '../utils/customAPI';
import { useSelector } from 'react-redux';

function PopupSlide(props) {
  const banner = props.banner
  return(
    <div className="popBanner-content">
      {banner.pbpsNewTabUsedYn === 'Y' ?
      <a href={banner.pbpsLinkUrl} target="_blank" rel="noreferrer"><img src={`${IMG_SERVER}${banner.pbpsImagePath}`} alt="" /></a>
      : <Link to={banner.pbpsLinkUrl}><img src={`${IMG_SERVER}${banner.pbpsImagePath}`} alt="" /></Link>}
      <div className="popBanner-text" dangerouslySetInnerHTML={{ __html: banner.pbpsContents }} ></div>
    </div>
  )
}

export default function popBanner(props) {
  const banner = useSelector(state => state.shop.banner)
  const [popupBanner, setPopupBanner] = useState()
  const [popupList, setPopupList] = useState()
  const [showBanner, setShowBanner] = useState(true);
  const [blockDay, setBlockDay] = useState(1);
  const [cookies, setCookie, removeCookie] = useCookies(['rememberText']);
  const openBanner = () => {
    window.open('/banner','PopYesUs','top=0,left=0,width=362,height=393,status=no,menubar=no,toolbar=no,resize=no,resize=no,scrollbar=no')
  }
  const closeOneDay = () => {
    let now = new Date();
    let periodDate = new Date();
    periodDate.setDate(now.getDate() + parseInt(blockDay));
    setCookie('rememberText', periodDate, { path: '/', expires: periodDate });
    if(popBanner.pbpType === 'PT02') {
      window.close()
    }else{
      setShowBanner(false);
    }
  }
  
  useEffect(() => {
    if(banner.find(banner => banner.pbType === 'POPUP')) {
      setPopupBanner(banner.find(banner => banner.pbType === 'POPUP'))
    }else{setPopupBanner(null)}
    if(popupBanner && !popupList && !cookies.rememberText) {
      if(popupBanner.pbBlockUsedYn === 'Y') setBlockDay(popupBanner.pbBlockPeriod)
      if(popupBanner.pbpType === 'PT02') {
        document.querySelector('body').style.overflow = 'hidden';
        document.getElementById('header').style.display = 'none';
        document.getElementById('footer').style.display = 'none'
      }else{
        document.querySelector('body').style.overflow = '';
        document.getElementById('header').style.display = '';
        document.getElementById('footer').style.display = ''
        if(popupBanner.pbpType === 'PT02') openBanner()
      }
      setPopupList(popupBanner.popBannerPopupSlideList)
    } 
    if(cookies.rememberText) setShowBanner(false);
    /*
    pbpType === 'PT01' //레이어
    pbpType === 'PT02' //새창
    pbpType === 'PT03' //풀팝업 
    */
  }, [banner, popupBanner])
  return (
    <>
    {popupBanner && showBanner && <div className={`popBanner ${popupBanner.pbpType} pbpFix${popupBanner.pbpFixUsedYn}`}>
      {popupBanner.pbSlideUsedYn === 'Y' ?
        <Swiper
          centeredSlides={true}
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loopFillGroupWithBlank={true}
          modules={[Autoplay]}
        >
        {popupList && popupList.map((banner, index) =><SwiperSlide key={index}><PopupSlide banner={banner} /></SwiperSlide>)}
        </Swiper>
      :
      <>
        {popupList && popupList.map((banner, index) =><PopupSlide key={index} banner={banner} />)}
      </>}
      {popupBanner.pbCloseBtnUsedYn === 'N' && popupBanner.pbBlockUsedYn === 'N' ? <></> : <div className="popBanner-footer">
        {popupBanner.pbBlockUsedYn === 'Y' && <button onClick={closeOneDay}>{blockDay > 1 ? <>{blockDay}일간</>:<>오늘 하루</>} 열지 않음<CloseOutlined /></button>}
        {popupBanner.pbCloseBtnUsedYn === 'Y' && 
        popupBanner.pbpType === 'PT02'
        ?<button onClick={() => window.close()}>닫기<CloseOutlined /></button>
        :<button onClick={() => setShowBanner(false)}>닫기<CloseOutlined /></button>}
      </div>}
    </div>}
    </>
  );
}
