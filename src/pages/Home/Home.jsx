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
        <PageLayout flex={"flex"} name={"프리미엄"} imgs={images}/>
        <PageLayout name={"오시는길"} imgs={"none"}/>
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
  /* margin: 0 auto; */
  padding: 0 5rem;
  /* width: 80%; */
  font-size: 4rem;
`

const MapContainer = styled.div`
  margin-bottom: 5rem;
  width: 100%;
  display: inline-block;
  border-radius: 20px;
  overflow: hidden;
`

