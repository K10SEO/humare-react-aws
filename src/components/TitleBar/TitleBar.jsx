import React from 'react'
import styled from 'styled-components'
import Logo from '../../assets/img/logo/Logo1.webp'

function TitleBar({name, topmargin}) {
  return (
    <TitleContainer topmargin={topmargin}>
          <TitleImg src={Logo}/>
          <span>&#73;</span>
          <h1> {name}</h1>
    </TitleContainer>
  )
}

export default TitleBar

const TitleContainer = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-top: ${({topmargin}) => typeof topmargin === 'number' ? topmargin : 5}rem;
  background-color:  #334536;
  border-radius: 50px;
  box-shadow: 3px 3px 6px 2px #8a8c91;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1vw 2vw;
  font-size: 3.5rem;
  gap: 2rem;
  white-space: nowrap;  // ⭐ 이 줄 추가! (줄바꿈 방지

    & > span {
      font-weight: 100;
    }

  @media (max-width: 1024px) {  // ⭐ 새로 추가! (태블릿/중간 크기)
    font-size: 2.5rem;
    width: 55%;
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 2vw 2vw;
    gap: 1rem;
    font-size: 2rem;
    width: 70%;
  }

  @media (max-width: 480px) {  // ⭐ 이 전체 블록 추가!
    font-size: 2rem;
    gap: 0.5rem;
    width: 80%;
    padding: 1.5vw 2vw;
  }
`

const TitleImg = styled.img`
  width: 40%;
`