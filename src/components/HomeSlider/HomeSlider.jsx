import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components'

// 데스크톱 이미지
import slider1 from '../../assets/img/slider/slider1.webp';
import slider2 from '../../assets/img/slider/slider2.webp';

// slider2의 모바일 이미지
import slider2Mobile from '../../assets/img/slider/slider_img_mobile.webp';
import SliderImgContainer from './SliderImgContainer/SliderImgContainer';


export default function HomeSlider(){
    const[reHeight, setreHeight] = useState(0)
    const settings = {
        dot: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrow: true,
        autoplay: true,
        autoplaySpeed: 2000,
    };

    useEffect(() => {
        const handleResize = () => {
            setreHeight(window.innerHeight - 93);
        };
  
        handleResize();
        window.addEventListener("resize", handleResize);
  
        return () => {
         window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <SliderContainer reHeight={reHeight}>
            <Slider {...settings}>
                {/* slider1: 데스크톱/모바일 동일 이미지 */}
                <SliderImgContainer 
                  src={slider1}
                  alt={'아파트사진'}
                  subtitle="PREMIUM"
                  title="• 푸르지오의 검증된 가치,<br/>• 주거의 특화된 단지와공간설계,<br/>• 도시를 대표하는 인프라"
                  showPhone={false}
                  isBuildingSlide={true}
                />
                
                {/* slider2: 모바일은 다른 이미지 */}
                <SliderImgContainer 
                  src={slider2}
                  srcMobile={slider2Mobile}  // ⭐ 모바일 전용 이미지
                  alt={'아파트사진'}
                  subtitle="신길 AK PRUGIO"
                  title="삶이 남다른 서울의 중심,<br/>푸르지오의 높은 자부심"
                  phoneLabel="분양문의 대표 상담번호"
                  phoneNumber="1661-3822"
                  showPhone={true}
                  isBuildingSlide={false}
                />
            </Slider>
        </SliderContainer>
    )
}

const SliderContainer = styled.div`
    width: 100%;
    overflow: hidden;
    
    .slick-slider,
    .slick-list,
    .slick-track,
    .slick-slide,
    .slick-slide > div {
        height: 100%;
    }
`