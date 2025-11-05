import React, { useEffect, useRef } from 'react';
import useMapStore from '../../util/MapStore';
import AkLogo from '../../assets/img/logo/Logo1.webp'

function NaverMap() {
  const mapElement = useRef(null);
  const { center, zoom, markers } = useMapStore();

  useEffect(() => {
    const { naver } = window;
    if (!naver) return;

    // 지도 생성
    const map = new naver.maps.Map(mapElement.current, {
      center: new naver.maps.LatLng(center.lat, center.lng),
      zoom,
    });

    // 마커 및 인포윈도우 렌더링
    markers.forEach((marker) => {
      const naverMarker = new naver.maps.Marker({
        map,
        position: new naver.maps.LatLng(marker.lat, marker.lng),
      });

      // 인포윈도우 생성
      const infoWindow = new naver.maps.InfoWindow({
        content: `
          <div style="padding:50px 10px 40px; max-width:200px; font-size:14px;">
            <h1 style="font-size: 25px; font-weight: 700;">${marker.title}</h1>
            <p>
              <br/>
              ${marker.description || 'No description available.'}
              <br/>
              <br/>
              <img src="${AkLogo}" style="width: 100px; border: 1px solid #aca9a9; margin-left: 80px;"/>
            </p>
          </div>
        `,
      });

      // 인포윈도우를 항상 열어둠
      infoWindow.open(map, naverMarker);
    });
  }, [center, zoom, markers]);

  return <div ref={mapElement} id="map" style={{ width: '100%', height: '270px' }} />;
}

export default NaverMap;