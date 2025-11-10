import React from 'react'
import styled from 'styled-components'
import TitleBar from '../TitleBar/TitleBar.jsx';


export default function PageLayout({name, imgs, flex}) {

  return (
      <PageLayoutContainer flex={flex} imgs={imgs}>
        <TitleBar name={name} topmargin={0}/>
        <ImgArrayContainer flex={flex}>
          {imgs === "none" ? " " : imgs.map((src, index) => (
            <ImgContainer flex={flex} key={index} src={src}/>
          ))}
        </ImgArrayContainer>
      </PageLayoutContainer>
  )
}

const PageLayoutContainer = styled.div`
  width: 100%;
  margin:${({flex, imgs}) => flex ? "5rem 0rem 0rem" : imgs === "none"  ? "none" : "5rem auto" };
  padding: 3vw;
  border-radius: 30px;
  background-color: ${({imgs}) => imgs === "none" ? "none" : "#d2c8ac"};

  @media (max-width: 1024px) {
    margin:${({flex, imgs}) => flex ? "5rem 0rem 0rem" : imgs === "none"  ? "none" : "5rem auto" };
  }
`

const ImgArrayContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: ${({flex}) => flex ? "row" : "column"};
  gap: 2vw;
  padding: 2vw;
  overflow: hidden;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ImgContainer = styled.img`
  width:${({flex}) => flex ? "50%" : "100%"};
  margin: 2vw 0 0;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 100%;
  }
` 