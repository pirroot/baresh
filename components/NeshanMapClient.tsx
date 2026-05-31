"use client"
import { APIProvider, Map, AdvancedMarker } from "@vis.gl/react-google-maps"

export default function GoogleMapClient() {
  const position = { lat: 39.056428518547484, lng: 48.04917508594578 }
  return (
    <APIProvider apiKey={""}>
      <Map
        defaultCenter={position}
        defaultZoom={17}
        mapId="main-map"
        className="w-full h-full"
      >
        <AdvancedMarker position={position} />
      </Map>
    </APIProvider>
  )
}