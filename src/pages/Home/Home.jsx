import React from 'react';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import PageLayout from "../../components/PageLayout/PageLayout"
import NaverMap from '../../components/map/NaverMap';
import styled from 'styled-components';
import ContactFrom from '../../components/ContactForm/ContactForm'
import { importAllImages } from "../../util/importAllImages"


function Home() {
  const images = importAllImages(
    require.context(
      "../../assets/img/imgPremium",
      false,
      /^\.\/premium_.*\.webp$/
    ))
  const images1 = importAllImages(require.context(
    "../../assets/img/imgBO",
    false,
    /^\.\/BOimage_.*\.webp$/
  ))
  const images2 = importAllImages(require.context(
    "../../assets/img/imgLE",
    false,
    /^\.\/LEimage_.*\.webp$/
  ))
  const images3 = importAllImages(require.context(
    "../../assets/img/imgLP",
    false,
    /^\.\/LPimage_.*\.webp$/
  ))
  const images4 = importAllImages(require.context(
    '../../assets/img/imgType',
    false,
    /^\.\/Typeimage_.*\.webp$/
  ))
  const images5 = importAllImages(require.context(
    "../../assets/img/imgMH",
    false,
    /^\.\/MDhouse_.*\.webp$/
  ))
  
  return (
    <main>
      <HomeSlider />
      <MainContainer>
        <PageLayout name={"프리미엄"} imgs={images} fullWidth={true}/>
        <PageLayout name={"사업개요"} imgs={images1} fullWidth={true}/>

        <PageLayout name={"입지환경"} imgs={images2} fullWidth={true}/>

        <PageLayout name={"단지배치도"} imgs={images3} fullWidth={true}/>

        <PageLayout name={"타입안내"} imgs={images4} fullWidth={true}/>

        <PageLayout name={"모델하우스"} imgs={images5} fullWidth={true}/>

        <PageLayout name={"오시는길"} imgs={"none"} naver={true}/>
        <MapContainer>
          <NaverMap/>
        </MapContainer>
        <ContactFrom/>
      </MainContainer>
    </main>
  )
}

export default Home

const MainContainer = styled.div`
  padding: 0 30rem;

  @media (max-width: 1024px) {  // ⭐ 새로 추가! (태블릿/중간 크기)
    padding: 0 15rem;
    
  }

  @media (max-width: 768px) {
    padding: 2vw 2vw;
  }

  @media (max-width: 480px) {  // ⭐ 이 전체 블록 추가!
    padding: 1.5vw 2vw;
  }
`

const MapContainer = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  display: inline-block;
  border-radius: 20px;
  overflow: hidden;
`

