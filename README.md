<<<<<<< HEAD
# humare-react-aws
=======
### 네이밍 컨벤션
## PascalCase: 모든 단어는 대문자로 시작


// img 파일 컴포넌트를 나누면 재사용성과 유지보수 측면에서 좋다
### 이미지 확장 컴포넌트

## wouldUmarket img 컴포넌트 예시
```jsx
 const Img = styled.img`
   width: 20px;
   height: 20px;
 `;
 /**
  *
  * @param {{toggle:boolean;onClick:function}} param0
  * @returns
  */
 function IconHeart({ className, toggle, onClick }) {
   return <Img className={className} src={toggle ? iconHeartFill : iconHeart} onClick={onClick} alt="하트 아이콘" />;
 }
 export default IconHeart;
 ```
 

// 우주마켓에선 스타일컴포넌트로 이미지태그를 선언 후 함수로 리턴 받는 이미지별 컴포넌트를 만들었다.


## 컴포넌트로 나눈 이미지 함수 사용 예시
```jsx
 import IconHeart from "./icon/IconHeart";

 const HeartIcon = styled(IconHeart)`
   width: 20px;
   margin-right: 10px;
   cursor: pointer;
 `;
```

// 컴포트화한 이미지 함수를 가져와 태그 선언 대신 함수명을 넣어주면 컴포넌트 나눈 함수의 className 프롭스로 전달 가능. 공유 컴포넌트로 만들었지만 프롭스로 내려 className을 설정하면 개별적인 css를 줄 수 있음

// 이미지를 함수화 하는 컴포넌트는 확장성 증가, 재사용성 증가, 유지보수성 증가 하지만 재사용이 적은 이미지 같은 경우 복잡도만 형성 할 수 있어 하지 않는게 낮다.

## 리액트 함수 단축키
rfc
# humare-react-aws
# humare-react-aws
>>>>>>> master
