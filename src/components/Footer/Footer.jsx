import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <FooterContainer>
        <HeadText>보라매 휴마레</HeadText>
        <DetailList>
            <DetailItem>현장명: 보라매 휴마레</DetailItem>
            <DetailItem>현장주소: 서울특별시 동작구 신대방동 725</DetailItem>
            <DetailItemPhonNumber>담당자번호: 1661-3822</DetailItemPhonNumber>
        </DetailList>
        <SmallText>Copyright © 2024 보라매 휴마레. All Rights Reserved.</SmallText>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.div`
    width: 100%;
    height: 25%;
    /* position: absolute; */
    bottom: 0;
    padding: 3rem 0;
    background-color: var(--main-green);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    gap: 2rem;
`
const HeadText =styled.h1`
    font-size: 27px;
    font-weight: 900;
    color: #897e77;
    padding: 1rem 0;
`

const DetailList = styled.dl`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`

const DetailItem = styled.dt`
    font-size: var(--fontsize-m);
    font-weight: 300;
    color: ivory;
`

const DetailItemPhonNumber = styled(DetailItem)`
    color: yellow;
    font-weight: 900;
`

const SmallText = styled.small`
    color: white;
    font-size: var(--fontsize-xs);
    font-weight: 100;
`