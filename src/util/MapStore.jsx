import { create } from 'zustand';

const useMapStore = create((set) => ({
  center: { lat: 37.494488, lng: 126.929635 },
  zoom: 15,
  markers: [
    { id: 1, lat: 37.494488, lng: 126.929635, title: '보라매 휴마레', description: '서울특별시 동작구 신대방동 725' },
  ],
  setCenter: (lat, lng) => set({ center: { lat, lng } }),
  setZoom: (zoom) => set({ zoom }),
  addMarker: (marker) =>
    set((state) => ({ markers: [...state.markers, marker] })),
}));

export default useMapStore;