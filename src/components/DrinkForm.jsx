import { useEffect, useState } from 'react'
import { ImagePlus, Search, X, LoaderCircle } from 'lucide-react'
import { searchOpenFoodFacts } from '../services/openFoodFacts.js'
import DrinkImage from './DrinkImage.jsx'

const categories = ['Vinos', 'Gin', 'Vodka', 'Aperitivos']
const blank = { name: '', brand: '', category: 'Vinos', country: '', alcohol_percentage: '', image_url: '', image_file: null }

export default function DrinkForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState(initial ? { ...blank, ...initial, image_file: null } : blank)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [searching, setSearching] = useState(false)
  const [searchError, setSearchError] = useState('')
  const [preview, setPreview] = useState(initial?.image_url || '')
  useEffect(() => () => { if (preview.startsWith('blob:')) URL.revokeObjectURL(preview) }, [preview])
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))
  async function search(event) {
    event.preventDefault(); if (!query.trim()) return
    setSearching(true); setSearchError(''); setResults([])
    try { setResults(await searchOpenFoodFacts(query.trim())) } catch (error) { setSearchError(error.message || 'No se pudo conectar. Podés completar el formulario manualmente.') } finally { setSearching(false) }
  }
  function choose(item) { setForm((prev) => ({ ...prev, ...item, image_file: null })); setPreview(item.image_url || ''); setResults([]); setQuery('') }
  function selectFile(file) { if (!file) return; set('image_file', file); set('image_url', ''); setPreview(URL.createObjectURL(file)) }
  return <form className="drink-form" onSubmit={(event) => { event.preventDefault(); onSave(form) }}>
    <div className="off-search"><div className="off-title"><span className="eyebrow">Completar desde</span><strong>Open Food Facts</strong><span className="off-label">Opcional</span></div><div className="search-row"><Search size={18} /><input aria-label="Buscar en Open Food Facts" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Buscar por nombre o marca" /><button className="button secondary" onClick={search} disabled={searching}>{searching ? <LoaderCircle className="spin" size={16} /> : 'Buscar'}</button></div>
      {searchError && <p className="helper error-text">{searchError}</p>}{results.length > 0 && <div className="off-results">{results.map((item, i) => <button type="button" key={`${item.code}-${i}`} className="off-result" onClick={() => choose(item)}><DrinkImage src={item.image_url} name={item.name} /><span><strong>{item.name}</strong><small>{[item.brand, item.category, item.alcohol_percentage ? `${item.alcohol_percentage}%` : ''].filter(Boolean).join(' · ')}</small></span></button>)}</div>}</div>
    <div className="form-divider"><span>o cargá los datos manualmente</span></div>
    <div className="image-picker">{preview ? <><DrinkImage src={preview} name={form.name || 'Vista previa'} /><button type="button" className="remove-image" aria-label="Quitar imagen" onClick={() => { setPreview(''); set('image_url', ''); set('image_file', null) }}><X size={15} /></button></> : <div className="image-prompt"><ImagePlus size={23} /><span>Foto de la botella</span><small>Elegí una imagen de tu galería</small></div>}<label className="button secondary upload-button">Elegir foto<input type="file" accept="image/*" onChange={(e) => selectFile(e.target.files?.[0])} /></label></div>
    <div className="field"><label htmlFor="drink-name">Nombre *</label><input id="drink-name" autoFocus value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Ej. Malbec Reserva" required /></div>
    <div className="form-grid"><div className="field"><label htmlFor="drink-brand">Marca</label><input id="drink-brand" value={form.brand} onChange={(e) => set('brand', e.target.value)} placeholder="Bodega o destilería" /></div><div className="field"><label htmlFor="drink-category">Categoría *</label><select id="drink-category" value={form.category} onChange={(e) => set('category', e.target.value)} required>{!form.category && <option value="">Seleccionar categoría</option>}{categories.map((item) => <option key={item}>{item}</option>)}</select></div></div>
    <div className="form-grid"><div className="field"><label htmlFor="drink-country">País de origen</label><input id="drink-country" value={form.country} onChange={(e) => set('country', e.target.value)} placeholder="Argentina" /></div><div className="field"><label htmlFor="drink-alcohol">Graduación alcohólica</label><div className="input-suffix"><input id="drink-alcohol" type="number" min="0" max="100" step="0.1" value={form.alcohol_percentage} onChange={(e) => set('alcohol_percentage', e.target.value)} placeholder="13.5" /><span>%</span></div></div></div>
    <div className="form-actions"><button type="button" className="button quiet" onClick={onCancel}>Cancelar</button><button className="button primary">Guardar bebida</button></div>
  </form>
}
