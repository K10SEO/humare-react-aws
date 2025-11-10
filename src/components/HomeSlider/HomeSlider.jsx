import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components'

import slider1 from '../../assets/img/slider/slider1.webp';
import slider2 from '../../assets/img/slider/slider2.webp';
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
  
        handleResize(); // 1. 초기 실행 (컴포넌트 마운트 시 1회)
  
        window.addEventListener("resize", handleResize); // 2. 이벤트 리스너 등록
  
        return () => {
         window.removeEventListener("resize", handleResize); // 3. 클린업 (컴포넌트 언마운트 시에만!)
        };
    }, []);

    return (
        <SliderContainer reHeight={reHeight}>
            <Slider {...settings}>
              <SliderImgContainer src={slider1} alt={'아파트사진'}/>
              <SliderImgContainer src={slider2} alt={'아파트사진'}/>
              {/* <SliderImgContainer src={slider3} alt={'아파트사진'}/> */}
            </Slider>
        </SliderContainer>
    )
}

const SliderContainer = styled.div`
    width: 100%;
    /* height: ${({reHeight}) => reHeight ? `${reHeight}` : "900"}px; */
    overflow: hidden;
    
    .slick-slider,
    .slick-list,
    .slick-track,
    .slick-slide,
    .slick-slide > div {
        height: 100%;
    }
`