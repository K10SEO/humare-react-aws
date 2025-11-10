import { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'

export default function SliderImgContainer({
    src,
    srcMobile,  // ⭐ 모바일 이미지 추가
    alt, 
    subtitle, 
    title, 
    phoneLabel, 
    phoneNumber, 
    showPhone,
    isBuildingSlide = false
}){
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // ⭐ 모바일이고 srcMobile이 있으면 srcMobile 사용, 아니면 src 사용
    const imageSrc = isMobile && srcMobile ? srcMobile : src;

    return (
        <SlideContainer>
            <SliderBox>
                <SlideImg src={imageSrc} alt={alt} />
            </SliderBox>
            
            <TextWrap isBuildingSlide={isBuildingSlide}>
                <SubTitle>{subtitle}</SubTitle>
                <MainTitle dangerouslySetInnerHTML={{__html: title}} />
            </TextWrap>
            
            {showPhone && (
                <SlideTell>
                    {phoneLabel}<br/>
                    <TellNumber>{phoneNumber}</TellNumber>
                </SlideTell>
            )}
        </SlideContainer>
    )
}

// 전화번호 색상 애니메이션
const tellColor = keyframes`
    25% { color: yellow; }
    50% { color: orange; }
    75% { color: red; }
`

const SlideContainer = styled.div`
    position: relative;
    overflow: hidden;
    padding-top: 43%;
    max-width: 1920px;
    
    @media (max-width: 767px) {
        padding-top: 120%;
    }
`

const SliderBox = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
`

const SlideImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill;
`

const TextWrap = styled.div`
    display: block;
    width: 40%;
    color: #fff;
    position: absolute;
    left: 10%;
    top: ${props => props.isBuildingSlide ? '60%' : '30%'};
    z-index: 10;
    
    @media (max-width: 767px) {
        width: 100%;
        background-color: rgb(27, 81, 83);
        left: 0;
        top: ${props => props.isBuildingSlide ? '73%' : '0'};
        height: ${props => props.isBuildingSlide ? 'auto' : '27%'};
        padding: ${props => props.isBuildingSlide ? '2% 0 4% 12%' : '5% 16% 0'};
    }
`

const SubTitle = styled.h5`
    line-height: 140%;
    font-size: 1.4vw;
    letter-spacing: 1px;
    margin: 0 0 0.7vw 0;
    color: #fff;
    font-weight: 900;
    text-shadow: 3px 3px 4px black;
    
    @media (max-width: 767px) {
        font-size: 2.4vw;
        margin: 0 0 3vw 0;
    }
`

const MainTitle = styled.h1`
    font-size: 2.2vw;
    line-height: 140%;
    /* padding: 2rem; */
    @media (max-width: 767px) {
        font-size: 5.2vw;
    }
`

const SlideTell = styled.div`
    position: absolute;
    width: 47%;
    height: 20%;
    left: 0%;
    top: 80%;
    font-family: 'TmonMonsori';
    font-size: 2vw;
    color: var(--main-green);
    font-weight: 900;
    text-align: center;
    line-height: 1.2;
    z-index: 10;
    /* background-color: rgba(27, 81, 83, 0.8); */
    padding: 1rem;

    @media (max-width: 767px) {
        background-color: #1b5153;
        border-radius: 10% 10% 10% 10%;
        letter-spacing: 1px;
        padding: 2%;
        left: -2%;
        top: 90%;
        color: #fff;
        font-weight: 500;
    }
`

const TellNumber = styled.span`
    color: yellow;
    font-size: 5vw;
    animation: ${tellColor} 5s infinite;
    text-shadow: -1px 0px black, 0px 1px black, 1px 0px black, 0px -1px black;
    display: block;
`