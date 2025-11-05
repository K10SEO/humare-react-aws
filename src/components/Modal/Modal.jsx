import { useState, useEffect, useRef, useCallback } from 'react';
import styled from 'styled-components';
import modal1 from '../../assets/img/modal/modal1.webp'
import modal2 from '../../assets/img/modal/modal2.webp'
import modal3 from '../../assets/img/modal/modal3.webp'
import modal4 from '../../assets/img/modal/modal4.webp'

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 109;
`;

const ModalWrapper = styled.article`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 475px;
  height: 640px;
  background-color: #334536;
  overflow: hidden;
  z-index: 110;

  @media screen and (max-width: 1199px) {
    width: 400px;
    height: 550px;
  }

  @media screen and (max-width: 991px) {
    width: 350px;
    height: 490px;
  }

  @media screen and (max-width: 767px) {
    width: 300px;
    height: 445px;
  }

  @media screen and (max-width: 480px) {
    width: 200px;
    height: 310px;
  }
`;

const CloseIcon = styled.button`
  position: absolute;
  width: 32px;
  height: 32px;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background: transparent;
  border: none;
  padding: 0;
  z-index: 10;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ModalContainer = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 80px);
  transition: transform 0.5s ease-in-out;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  flex: none;
  display: block;
  object-fit: cover;
  vertical-align: top;
  user-select: none;
  -webkit-user-drag: none;
`;

const IndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 10px 0;
  background-color: #334536;
`;

const IndicatorDot = styled.span`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.3)'};
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.$active ? '#ffffff' : 'rgba(255, 255, 255, 0.6)'};
  }
`;

const ModalButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  background-color: #334536;
`;

const ModalButton = styled.button`
  width: ${props => props.$hideToday ? '140%' : '100%'};
  height: 2.5vw;
  font-size: 1vw;
  font-weight: 900;
  background-color: transparent;
  border: solid 0px;
  cursor: pointer;
  color: white;

  @media screen and (max-width: 767px) {
    height: 6vw;
    font-size: 2vw;
  }
`;

const PopupModal = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  
  const containerRef = useRef(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const autoPlayRef = useRef(null);
  const currentSlideRef = useRef(0);

  const images = [
    { src: modal1, alt: '모달 이미지 1' },
    { src: modal2, alt: '계약시 특별 혜택 제공' },
    { src: modal3, alt: '계약시 특별 혜택 제공' },
    { src: modal4, alt: '계약시 특별 혜택 제공' }
  ];

  const totalSlides = images.length;

  // currentSlide가 변경될 때마다 ref 업데이트
  useEffect(() => {
    currentSlideRef.current = currentSlide;
  }, [currentSlide]);

  // 쿠키 함수들 (세션 스토리지 사용)
  const setCookie = (name, value, days) => {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    sessionStorage.setItem(name, JSON.stringify({ value, expires: date.getTime() }));
  };

  const getCookie = (name) => {
    const item = sessionStorage.getItem(name);
    if (!item) return null;
    
    const { value, expires } = JSON.parse(item);
    if (new Date().getTime() > expires) {
      sessionStorage.removeItem(name);
      return null;
    }
    return value;
  };

  // 슬라이드 이동
  const moveToSlide = useCallback((slideIndex) => {
    setCurrentSlide(slideIndex);
    if (containerRef.current) {
      const offset = -slideIndex * 100;
      containerRef.current.style.transform = `translateX(${offset}%)`;
      containerRef.current.style.transition = 'transform 0.5s ease-in-out';
    }
  }, []);

  // 다음 슬라이드
  const nextSlide = useCallback(() => {
    const current = currentSlideRef.current;
    const nextIndex = current < totalSlides - 1 ? current + 1 : 0;
    moveToSlide(nextIndex);
  }, [totalSlides, moveToSlide]);

  // 이전 슬라이드
  const prevSlide = useCallback(() => {
    const current = currentSlideRef.current;
    const prevIndex = current > 0 ? current - 1 : totalSlides - 1;
    moveToSlide(prevIndex);
  }, [totalSlides, moveToSlide]);

  // 자동 재생
  const startAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  }, [nextSlide]);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  // 드래그 핸들러
  const handleDragStart = (e) => {
    setIsDragging(true);
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    startXRef.current = clientX;
    currentXRef.current = clientX;
    if (containerRef.current) {
      containerRef.current.style.transition = 'none';
    }
    stopAutoPlay();
  };

  const handleDragMove = (e) => {
    const clientX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    currentXRef.current = clientX;
    const diff = currentXRef.current - startXRef.current;
    const containerWidth = containerRef.current?.offsetWidth || 1;
    const movePercent = (diff / containerWidth) * 100;
    const currentOffset = -currentSlideRef.current * 100;

    if (containerRef.current) {
      containerRef.current.style.transform = `translateX(${currentOffset + movePercent}%)`;
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    const diff = currentXRef.current - startXRef.current;
    const threshold = 50;

    if (containerRef.current) {
      containerRef.current.style.transition = 'transform 0.5s ease-in-out';
    }

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        prevSlide();
      } else {
        nextSlide();
      }
    } else {
      moveToSlide(currentSlideRef.current);
    }

    startAutoPlay();
  };

  // 모달 닫기
  const closeModal = () => {
    setIsVisible(false);
    stopAutoPlay();
  };

  // 하루동안 보지않기
  const hideForToday = () => {
    setCookie('hideModalToday', 'true', 1);
    setIsVisible(false);
    stopAutoPlay();
  };

  // 초기화
  useEffect(() => {
    const hideToday = getCookie('hideModalToday');
    if (hideToday === 'true') {
      setIsVisible(false);
      return;
    }

    startAutoPlay();

    return () => {
      stopAutoPlay();
    };
  }, [startAutoPlay, stopAutoPlay]);

  // 드래그 이벤트 리스너
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX;
      currentXRef.current = clientX;
      const diff = currentXRef.current - startXRef.current;
      const containerWidth = containerRef.current?.offsetWidth || 1;
      const movePercent = (diff / containerWidth) * 100;
      const currentOffset = -currentSlideRef.current * 100;

      if (containerRef.current) {
        containerRef.current.style.transform = `translateX(${currentOffset + movePercent}%)`;
      }
    };
    
    const handleMouseUp = () => {
      if (!isDragging) return;
      handleDragEnd();
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  if (!isVisible) return null;

  return (
    <>
      <Backdrop onClick={closeModal} />
      <ModalWrapper
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <CloseIcon onClick={closeModal}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="white" 
            viewBox="0 0 24 24"
          >
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </CloseIcon>

        <ModalContainer
          ref={containerRef}
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {images.map((image, index) => (
            <ModalImage 
              key={index}
              src={image.src} 
              alt={image.alt}
              onDragStart={(e) => e.preventDefault()}
            />
          ))}
        </ModalContainer>

        <IndicatorContainer>
          {images.map((_, index) => (
            <IndicatorDot
              key={index}
              $active={index === currentSlide}
              onClick={() => {
                stopAutoPlay();
                moveToSlide(index);
                startAutoPlay();
              }}
            />
          ))}
        </IndicatorContainer>

        <ModalButtonWrapper>
          <ModalButton $hideToday onClick={hideForToday}>
            하루동안 보지않기
          </ModalButton>
          <ModalButton onClick={closeModal}>
            닫기
          </ModalButton>
        </ModalButtonWrapper>
      </ModalWrapper>
    </>
  );
};

export default function App() {
  return (
    <>
      <PopupModal />
    </>
  );
}