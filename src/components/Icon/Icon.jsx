import styled from 'styled-components';

import arrowLeftSvg from '../../assets/iconImg/arrow_back_ios_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg';
import arrowRightSvg from '../../assets/iconImg/arrow_forward_ios_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg';
import closeSvg from '../../assets/iconImg/close_50dp_FFFFFF_FILL0_wght400_GRAD0_opsz48.svg';
import topSvg from '../../assets/iconImg/expand_less_FILL0_wght100_GRAD0_opsz48.svg';
import menuSvg from '../../assets/iconImg/menu_50dp_FFFFFF_FILL0_wght500_GRAD0_opsz48.svg';
const AsteriskSvg = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff0000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-asterisk-icon lucide-asterisk"><path d="M12 6v12"/><path d="M17.196 9 6.804 15"/><path d="m6.804 9 10.392 6"/></svg>

const Img = styled.img`
    width: 2rem;
`;

function ArrowLeftIcon({className}){
    return <Img 
                className={className} 
                src={arrowLeftSvg} 
                alt='왼쪽 화살표' 
            />;
};

function ArrowRightIcon({className}){
    return <Img 
                className={className} 
                src={arrowRightSvg} 
                alt='오른쪽 화살표' 
            />;
};

function CloseIcon({className}){

    return <Img 
                className={className} 
                src={closeSvg} 
                alt='닫기' 
            />;
};

function TopIcon({className}){
    return <Img 
                className={className} 
                src={topSvg} 
                alt='최상단 화살표' 
            />;
};

function MenuIcon({className, handleMenuOpen}){
    return <Img 
                className={className} 
                src={menuSvg}
                alt='메뉴'
                onClick = {handleMenuOpen}
            />;
};

function AsteriskIcon(className){
    return <Img
                className={className}
                src={AsteriskSvg}
            />
}
export {ArrowLeftIcon, ArrowRightIcon, CloseIcon, TopIcon, MenuIcon, AsteriskIcon}
