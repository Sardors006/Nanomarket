/** Toshkent shahri tumanlari — markaziy koordinatalar (taxminiy) */
export const TASHKENT_CENTER = { lat: 41.2995, lng: 69.2401, zoom: 11 }

export const TASHKENT_DISTRICTS = [
  { id: 'olmazor', name: 'Olmazor', lat: 41.355, lng: 69.205 },
  { id: 'bektemir', name: 'Bektemir', lat: 41.233, lng: 69.333 },
  { id: 'chilonzor', name: 'Chilonzor', lat: 41.286, lng: 69.203 },
  { id: 'mirobod', name: 'Mirobod', lat: 41.299, lng: 69.24 },
  { id: 'mirzo-ulugbek', name: "Mirzo Ulug'bek", lat: 41.342, lng: 69.334 },
  { id: 'sergeli', name: 'Sergeli', lat: 41.22, lng: 69.22 },
  { id: 'shayxontohur', name: 'Shayxontohur', lat: 41.326, lng: 69.244 },
  { id: 'uchtepa', name: 'Uchtepa', lat: 41.313, lng: 69.169 },
  { id: 'yakkasaroy', name: 'Yakkasaroy', lat: 41.289, lng: 69.269 },
  { id: 'yangihayot', name: 'Yangihayot', lat: 41.179, lng: 69.174 },
  { id: 'yashnobod', name: 'Yashnobod', lat: 41.317, lng: 69.293 },
  { id: 'yunusobod', name: 'Yunusobod', lat: 41.368, lng: 69.287 },
]

export function findDistrict(id) {
  return TASHKENT_DISTRICTS.find((d) => d.id === id) ?? null
}

export function formatDeliveryAddress({ districtId, streetDetail, lat, lng }) {
  const district = findDistrict(districtId)
  if (!district) return ''
  const parts = [`Toshkent, ${district.name} tumani`]
  const detail = streetDetail?.trim()
  if (detail) parts.push(detail)
  if (lat != null && lng != null) {
    parts.push(`(${lat.toFixed(5)}, ${lng.toFixed(5)})`)
  }
  return parts.join(' · ')
}
