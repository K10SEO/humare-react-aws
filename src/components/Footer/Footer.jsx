import React from 'react'
import styled from 'styled-components'

function Footer() {
  return (
    <FooterContainer>
        <HeadText>신길 AK 푸르지오</HeadText>
        <DetailList>
            <DetailItem>현장명: 신길 AK 푸르지오</DetailItem>
            <DetailItem>현장주소: 서울특별시 영등포구 신길동 255-9</DetailItem>
            <DetailItemPhonNumber>담당자번호: 1661-3822</DetailItemPhonNumber>
        </DetailList>
        <SmallText>Copyright © 2025 신길 AK 푸르지오. All Rights Reserved.</SmallText>
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