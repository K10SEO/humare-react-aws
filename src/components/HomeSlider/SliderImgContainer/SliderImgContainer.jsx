import styled from 'styled-components'

export default function SliderImgContainer({
    src, 
    alt, 
    subtitle, 
    title, 
    phoneLabel, 
    phoneNumber, 
    showPhone,
    textAlign = 'left',  // ⭐ 텍스트 정렬 (left, center, right)
    topMargin = '0',     // ⭐ 상단 텍스트 위쪽 여백
    bottomMargin = '0',  // ⭐ 하단 텍스트 아래쪽 여백
    leftPadding = '15rem', // ⭐ 왼쪽 패딩
    rightPadding = '15rem' // ⭐ 오른쪽 패딩
}){
    return (
        <ImgContainer>
            <SlideImg src={src} alt={alt}/>
            <TextOverlay leftPadding={leftPadding} rightPadding={rightPadding}>
                <TopText textAlign={textAlign} topMargin={topMargin}>
                    <SubTitle>{subtitle}</SubTitle>
                    <MainTitle dangerouslySetInnerHTML={{__html: title}} />
                </TopText>
                {showPhone && (
                    <BottomText textAlign={textAlign} bottomMargin={bottomMargin}>
                        <PhoneLabel>{phoneLabel}</PhoneLabel>
                        <PhoneNumber>{phoneNumber}</PhoneNumber>
                    </BottomText>
                )}
            </TextOverlay>
        </ImgContainer>
    )
}

const ImgContainer = styled.div`
    width: 100%;
    position: relative;
`

const SlideImg = styled.img`
    width: 100%;
    height: 82rem;
    object-fit: fill;
    display: block;

    @media (max-width: 1024px) {
        height: 52rem;
    }

    @media (max-width: 768px) {
        height: 32rem;
    }

    @media (max-width: 480px) { 
        height: 22rem;
    }
`

const TextOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 8rem ${props => props.rightPadding} 8rem ${props => props.leftPadding};
    color: white;

    @media (max-width: 1024px) {
        padding: 5rem 10rem;
    }

    @media (max-width: 768px) {
        padding: 3rem 5rem;
    }

    @media (max-width: 480px) {
        padding: 2rem 3rem;
    }
`

const TopText = styled.div`
    text-align: ${props => props.textAlign};
    margin-top: ${props => props.topMargin};
`

const SubTitle = styled.h3`
    font-size: 2.5rem;
    font-weight: 400;
    margin-bottom: 2rem;
    
    @media (max-width: 1024px) {
        font-size: 2rem;
    }

    @media (max-width: 768px) {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1.2rem;
    }
`

const MainTitle = styled.h1`
    font-size: 5rem;
    font-weight: 700;
    line-height: 1.4;
    
    @media (max-width: 1024px) {
        font-size: 3.5rem;
    }

    @media (max-width: 768px) {
        font-size: 2.5rem;
    }

    @media (max-width: 480px) {
        font-size: 1.8rem;
    }
`

const BottomText = styled.div`
    text-align: ${props => props.textAlign};
    margin-bottom: ${props => props.bottomMargin};
`

const PhoneLabel = styled.p`
    font-size: 4rem;
    font-weight: 900;
    margin-bottom: 1.5rem;
    margin-left: 1.5rem;
    color: var(--main-green);
    
    @media (max-width: 1024px) {
        font-size: 1.6rem;
    }

    @media (max-width: 768px) {
        font-size: 1.3rem;
        margin-bottom: 1rem;
    }

    @media (max-width: 480px) {
        font-size: 1rem;
    }
`

const PhoneNumber = styled.h2`
    font-size: 7rem;
    font-weight: 900;
    color: #ffeb3b;
    text-shadow: 4px 4px 8px rgba(0,0,0,0.6);
    letter-spacing: 0.5rem;
    
    @media (max-width: 1024px) {
        font-size: 5rem;
    }

    @media (max-width: 768px) {
        font-size: 3.5rem;
        letter-spacing: 0.3rem;
    }

    @media (max-width: 480px) {
        font-size: 2.5rem;
        letter-spacing: 0.2rem;
    }
`