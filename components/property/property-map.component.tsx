'use client'

import { useEffect, useState } from 'react'
import { icon } from 'leaflet'
import { MapContainer, Marker, TileLayer } from 'react-leaflet'

import type { IProperty } from '@/types'

import 'leaflet/dist/leaflet.css'

type LocationInfo = {
  lat: string
  lon: string
}

type ViewPort = {
  latitude: number
  longitude: number
  zoom: number
  width: string
  height: string
}

const iconUrl = 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png'
const markerIcon = icon({
  iconUrl,
  iconSize: [20, 30],
})

const PropertyMap = (location: IProperty['location']) => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo[]>([])

  const [viewPort, setViewPort] = useState<ViewPort>({
    latitude: 0,
    longitude: 0,
    zoom: 12,
    width: '100%',
    height: '500px',
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function getCoords() {
      const spaceRemover = (str: string) => str.replaceAll(' ', '+').trim()

      const street = spaceRemover(location.street)
      const city = spaceRemover(location.city)
      const state = spaceRemover(location.state)
      const postalcode = spaceRemover(location.zipcode)

      const query = `http://nominatim.openstreetmap.org/search?street=${street}&city=${city}&state=${state}&postalcode=${postalcode}&format=json`

      const response = await fetch(query)
      const json: any[] = await response.json()

      if (!json.length) setLocationInfo([])
      else
        setLocationInfo([
          {
            lat: json[0]?.lat,
            lon: json[0]?.lon,
          },
        ])

      setViewPort({
        ...viewPort,
        latitude: json[0]?.lat || 0,
        longitude: json[0]?.lon || 0,
      })

      setLoading(false)
    }

    getCoords()
  }, [])

  if (loading) return <h3>Loading map...</h3>

  if (!locationInfo.length || !locationInfo)
    return <div className='text-xl'>No location data </div>

  return (
    <MapContainer
      center={[+locationInfo[0].lat, +locationInfo[0].lon]}
      zoom={13}
      scrollWheelZoom={false}
      zoomControl={false}
      className='h-[300px] rounded-lg relative z-0'
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />

      <Marker
        position={[+locationInfo[0].lat, +locationInfo[0].lon]}
        icon={markerIcon}
      ></Marker>
    </MapContainer>
  )
}
export default PropertyMap
