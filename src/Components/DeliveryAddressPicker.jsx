import { useMemo, useState } from 'react'
import {
  TASHKENT_CENTER,
  TASHKENT_DISTRICTS,
  formatDeliveryAddress,
} from '../data/tashkentDistricts'

function osmEmbedUrl(lat, lng, delta = 0.045) {
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`
  return `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat}%2C${lng}`
}

function osmExternalUrl(lat, lng) {
  return `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=15/${lat}/${lng}`
}

export default function DeliveryAddressPicker({ value, onChange }) {
  const [query, setQuery] = useState('')
  const districtId = value?.districtId ?? ''
  const streetDetail = value?.streetDetail ?? ''
  const lat = value?.lat ?? TASHKENT_CENTER.lat
  const lng = value?.lng ?? TASHKENT_CENTER.lng

  const selected = TASHKENT_DISTRICTS.find((d) => d.id === districtId)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return TASHKENT_DISTRICTS
    return TASHKENT_DISTRICTS.filter((d) => d.name.toLowerCase().includes(q))
  }, [query])

  const patch = (next) => {
    const merged = { districtId, streetDetail, lat, lng, ...value, ...next }
    onChange({
      ...merged,
      formatted: formatDeliveryAddress(merged),
    })
  }

  const selectDistrict = (d) => {
    patch({ districtId: d.id, lat: d.lat, lng: d.lng })
    setQuery('')
  }

  const mapSrc = osmEmbedUrl(lat, lng)

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-zinc-700">Toshkent tumani</p>
          <p className="mt-0.5 text-xs text-zinc-500">
            Tumanni tanlang — xaritada belgilanadi
          </p>
        </div>
        <div className="relative w-full sm:max-w-xs">
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            ⌕
          </span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Qidirish: Sergeli, Chilonzor…"
            className="w-full rounded-xl border border-zinc-200 py-2.5 pl-9 pr-3 text-sm outline-none ring-amber-500/30 focus:ring-4"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {filtered.map((d) => {
          const active = d.id === districtId
          return (
            <button
              key={d.id}
              type="button"
              onClick={() => selectDistrict(d)}
              className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                active
                  ? 'border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-500/25'
                  : 'border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-amber-300 hover:bg-amber-50'
              }`}
            >
              {d.name}
            </button>
          )
        })}
        {filtered.length === 0 && (
          <p className="text-sm text-zinc-500">Tuman topilmadi</p>
        )}
      </div>

      <div
        className={`overflow-hidden rounded-2xl border-2 transition ${
          selected ? 'border-amber-400 shadow-lg shadow-amber-500/10' : 'border-zinc-200'
        }`}
      >
        <div className="flex items-center justify-between gap-2 border-b border-zinc-100 bg-gradient-to-r from-zinc-50 to-amber-50/80 px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
              Yetkazib berish nuqtasi
            </p>
            <p className="truncate text-sm font-semibold text-zinc-900">
              {selected ? `${selected.name} tumani` : 'Tumanni tanlang'}
            </p>
          </div>
          {selected && (
            <a
              href={osmExternalUrl(lat, lng)}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-amber-700 shadow-sm ring-1 ring-zinc-200 hover:bg-amber-50"
            >
              Kattaroq xarita
            </a>
          )}
        </div>
        <div className="relative aspect-[16/10] w-full bg-zinc-100 sm:aspect-[2/1]">
          {selected ? (
            <iframe
              title="Toshkent xaritasi"
              src={mapSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center gap-2 px-4 text-center text-zinc-500">
              <span className="text-3xl">📍</span>
              <p className="text-sm">Xarita uchun yuqoridan tuman tanlang</p>
            </div>
          )}
          {selected && (
            <div className="pointer-events-none absolute bottom-3 left-3 right-3 rounded-xl bg-white/95 px-3 py-2 text-xs text-zinc-600 shadow-md backdrop-blur-sm">
              <span className="font-medium text-zinc-900">Koordinata:</span>{' '}
              {lat.toFixed(4)}, {lng.toFixed(4)}
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-zinc-700" htmlFor="co-street">
          Ko‘cha, uy, kvartira
        </label>
        <input
          id="co-street"
          value={streetDetail}
          onChange={(e) => patch({ streetDetail: e.target.value })}
          disabled={!selected}
          className="mt-2 w-full rounded-xl border border-zinc-200 px-4 py-3 outline-none ring-amber-500/30 focus:ring-4 disabled:bg-zinc-50 disabled:text-zinc-400"
          placeholder={selected ? "Masalan: Amir Temur ko'chasi, 12-uy" : 'Avval tumanni tanlang'}
        />
      </div>

      {value?.formatted && (
        <p className="rounded-xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 text-sm text-emerald-900">
          <span className="font-medium">Tanlangan manzil:</span> {value.formatted}
        </p>
      )}
    </div>
  )
}

export function isDeliveryAddressValid(value) {
  return Boolean(value?.districtId && value?.formatted?.trim())
}
