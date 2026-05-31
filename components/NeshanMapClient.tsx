"use client"
import NeshanMap from "@neshan-maps-platform/react-openlayers"

export default function NeshanMapClient() {
  return (
    <NeshanMap
      mapKey="web.ae5f9aa20aac4f64845ed2667787e1a9"
      center={{ latitude: 39.056370436767786, longitude: 48.04919842564095 }}
      zoom={17}
      className="w-full h-full"
    />
  )
}