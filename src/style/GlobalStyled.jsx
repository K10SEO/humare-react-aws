import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyled = createGlobalStyle`
    ${reset}

    @font-face {
        font-family: 'TmonMonsori';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/TmonMonsori.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'TAEBAEKmilkyway';
        src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2302@1.0/TAEBAEKmilkyway.woff2') format('woff2');
        font-weight: normal;
        font-style: normal;
    }

    :root {
        --main-green: #1B5153;
        --font-white: #ffffff;
        --main-font: 'TAEBAEKmilkyway';
        --tmon-font: 'TmonMonsori';
        
        --fontsize-xxl: 2.2rem;
        --fontsize-xl: 2rem;
        --fontsize-l: 1.8rem;
        --fontsize-m: 1.6rem;
        --fontsize-s: 1.5rem;
        --fontsize-xs: 1.4rem;
        --fontsize-xxs:1.3rem; 
    }

    * {
        box-sizing: border-box;
    }

    html {
        // 기존 브라우저 폰트값인 16px의 62.5%를 적용하면 1rem당 10px로 바뀌어 반응형 사이트를 만들기 위해 주는 rem 속성값을을 계산하기기가 편해짐
        font-size: 62.5%;
    }

    body {
        font-family: --main-font, sans-serif;
        @media (min-width: 480px)and( max-width: 767px){
           
        };
        @media (min-width: 768px)and(max-width: 1023px){
            
        };
        @media (min-width: 1024px){

        };
    }

    html, body {
        /* min-width: 480px; */
        width: 100%;
        overflow-x: hidden;
    }

    button {
        margin: 0;
        padding: 0;
    }

    .ir-hidden {
        position: absolute;
        clip: rect(0 0 0 0);
        width: 1px;
        height: 1px;
        margin: -1px;
        overflow: hidden;
    }
`;

export default GlobalStyled;