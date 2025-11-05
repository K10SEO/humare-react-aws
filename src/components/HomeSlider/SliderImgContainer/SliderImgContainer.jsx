import styled from 'styled-components'

export default function SliderImgContainer({src, alt}){
    return <ImgContainer >
                <SlideImg src={src} alt={alt}/>
           </ImgContainer>
}

const ImgContainer = styled.div`
    width: 100%;
    height: 100%;
`

const SlideImg = styled.img`
    width: 100%;
    height: 100%;
    object-fit: fill; // 비율 무시하고 박스에 딱 맞춤
    display: block;
    position: relative;
`

// 오브젝트에 hidden 값을 주고 스크롤 특정 영역 도달시 hidden 값을 없애는 방식으로 접근해야 할듯 거기에 애니메이션 걸어서 나타나는 형식으로