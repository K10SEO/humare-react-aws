import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MenuIcon } from '../Icon/Icon';
import logo from '../../assets/img/logo/Logo3.png';
import { Link } from 'react-router-dom'

function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);

  const menuItems = [
    { name: "입지환경", to: "/location_environment" },
    { name: "단지배치도", to: "/Location_plan" },
    { name: "사업개요", to: "/business_overview" },
    { name: "모델하우스", to: "/model_house" },
    { name: "타입안내", to: "/Type" },
  ]

  useEffect(() => {
    // 초기 렌더링 후 transition 활성화
    const timer = setTimeout(() => {
      setIsInitialRender(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  function handleMenuClose(e) {
    let count = e.target.innerText
    if(menuOpen === true || count === String){
      setMenuOpen(false)
      count = 1
    }
  }

  return (
      <HeaderContainer> 
        <NavContainer>
  
          <MenuLink to={"/"}><Logo src={logo}/></MenuLink>
  
          <MenuList menuOpen={menuOpen} className = {isInitialRender ? 'ir-hidden' : ""} >
           { menuItems.map((item, index) => (
              <MenuItem 
                  key={item.to}  
                  style={{transitionDelay: `${menuOpen ? (index + 1) * 0.085 :    ((menuItems.length -index) + 1) * 0.045}s`}} 
                  onClick={handleMenuClose} >
                  <MenuLink to={item.to}>{item.name}</MenuLink>
              </MenuItem>
            ))}
          </MenuList>
  
  
          <WrrapContainer>
            <PhoneText href='tell:1661-3822'>{'1661-3822'}</PhoneText>
            <Menu handleMenuOpen = {() => setMenuOpen((prev) => !prev)} />
          </WrrapContainer>

        </NavContainer>
  
      </HeaderContainer>
  )
}

export default Nav

const HeaderContainer = styled.header`
  width: 100%;
  background-color: var(--main-green);
  display: flex;
  align-items: center;
  padding: 0 2rem;
  position: relative;
  font-family: var(--main-font);
  font-weight: 900;
  z-index: 3;
`

// PC style 작업해야함
const NavContainer = styled.nav`
  width: 100%;
  display: flex;
  justify-content:space-between;
  /* gap: 30rem; */
  align-items: center;
`

const MenuList = styled.ul`
  display: flex;
  gap: 3rem;

  @media (max-width: 768px){
    padding: 3rem 3.5rem 7rem;
    top: 4rem;
    left: 0;
    width: 100%;
    gap: 4rem;
    margin-top:4rem;
    position: absolute;
    flex-direction: column;
    background-color: none;
    z-index: -1;

    &::after{
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--main-green);
      z-index: -1;
      transition: 0.8s;
      transform: ${({menuOpen}) => menuOpen ?  "translateY(0rem)" : "translateY(-45rem)"};
    }

    li{
      opacity: ${({menuOpen}) => menuOpen ? 1 : 0};
      transition: 0.05s;
    }
  }
`

const MenuItem = styled.li`
  width: fit-content;
  color: var(--font-white);
  font-size: 1.5vw;
  transition: color 0.4s ease-in-out 0s;
   &:hover {
    color: gold;
    cursor: pointer;
   }

   @media (max-width: 768px) {
    font-size: 2rem;
    display: flex;
    justify-content: left;
   }
`

const Logo = styled.img`
  width: 15rem;
  margin: 2rem;
  cursor: pointer;

  @media (max-width: 425px){
    width: 10rem;
  }
`
const WrrapContainer = styled.div`
  display: flex;
  align-items: center;
`
const PhoneText = styled.a`
  color: var(--font-white);
  font-size: var(--fontsize-xxl);
  font-weight: 600;
  float: left;
  line-height: 2.1;
  text-decoration: none;
  @media (max-width: 425px){
    font-size: 2rem;
  }
`
const Menu = styled(MenuIcon)`
  display: none;
  width: 5rem;
  float: left;
  margin-left: 2rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block
  }

  @media (max-width: 425px){
    width: 3rem;
  }
`

const MenuLink = styled(Link)`
  text-decoration: none;
  color: white;
`


