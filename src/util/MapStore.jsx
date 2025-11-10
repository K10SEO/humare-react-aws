import { create } from 'zustand';

const useMapStore = create((set) => ({
  center: { lat: 37.494488, lng: 126.929635 },
  zoom: 15,
  markers: [
    { id: 1, lat: 37.494488, lng: 126.929635, title: '신길 AK 푸르지오', description: '서울특별시 영등포구 신길동 255-9' },
  ],
  setCenter: (lat, lng) => set({ center: { lat, lng } }),
  setZoom: (zoom) => set({ zoom }),
  addMarker: (marker) =>
    set((state) => ({ markers: [...state.markers, marker] })),
}));

export default useMapStore;