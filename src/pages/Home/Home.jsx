import React from 'react';
import HomeSlider from '../../components/HomeSlider/HomeSlider';
import PageLayout from "../../components/PageLayout/PageLayout"
import NaverMap from '../../components/map/NaverMap';
import styled from 'styled-components';
import ConsultForm from '../../components/ContactForm/ContactFrom'
import { importAllImages } from "../../util/importAllImages"


function Home() {
  const images = importAllImages(require.context(
      "../../assets/img/imgPremium",
      false,
      /^\.\/premium_.*\.webp$/
    ))
  return (
    <main>
      <HomeSlider />
      <MainContainer>
        <PageLayout name={"프리미엄"} imgs={images} fullWidth={true}/>
        <PageLayout name={"오시는길"} imgs={"none"} naver={true}/>
        <MapContainer>
          <NaverMap/>
        </MapContainer>
        <ConsultForm/>
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

