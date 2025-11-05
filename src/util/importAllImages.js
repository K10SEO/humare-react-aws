export function importAllImages(r) {
    return r.keys().map(r); // .map((key) = > r(key)) 이거와 동일하다고 함.
} // r.keys()는 일반적인 객체에는 사용불가 메서드 (일반적인 객체에는 Object.keys(객체)로 사용가능 또는 객체 안에 keys() 메서드가 내장 되어있는 경우는 가능하다고 함)