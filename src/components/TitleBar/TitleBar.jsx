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
  width: 60%;
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
    & > span {
      font-weight: 100;
    }

  @media (max-width: 768px) {
    padding: 2vw 2vw;
    gap: 1rem;
    font-size: 2rem;
    width: 65%;

  }
`

const TitleImg = styled.img`
  width: 50%;
`