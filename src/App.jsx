import { useEffect, useMemo, useState } from 'react'
import { Plus, Search, GlassWater, WifiOff, X, ArrowLeft, Pencil, Trash2, Star, MapPin, Percent, CalendarDays, Heart, ChevronDown } from 'lucide-react'
import DrinkCard from './components/DrinkCard.jsx'
import DrinkForm from './components/DrinkForm.jsx'
import RatingForm from './components/RatingForm.jsx'
import DrinkImage from './components/DrinkImage.jsx'
import { supabase } from './lib/supabase.js'
import { deleteDrink, deleteRating, listDrinks, listRatings, saveDrink, saveRating, updateDrinkCache, updateRatingCache } from './services/drinks.js'

const categories = ['Todas', 'Vinos', 'Gin', 'Vodka', 'Aperitivos']

export default function App() {
  const [drinks, setDrinks] = useState([])
  const [ratings, setRatings] = useState([])
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [selected, setSelected] = useState(null)
  const [dialog, setDialog] = useState(null)
  const [editingRating, setEditingRating] = useState(null)
  const [ratingFormOpen, setRatingFormOpen] = useState(false)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [online, setOnline] = useState(navigator.onLine)

  async function refresh() {
    const [nextDrinks, nextRatings] = await Promise.all([listDrinks(), listRatings()])
    setDrinks(nextDrinks); setRatings(nextRatings)
    setSelected((current) => current ? nextDrinks.find((drink) => drink.id === current.id) || null : null)
  }
  useEffect(() => {
    refresh().catch(() => setNotice('No se pudo cargar la colección.'))
    const onlineHandler = () => { setOnline(true); refresh() }
    const offlineHandler = () => setOnline(false)
    window.addEventListener('online', onlineHandler); window.addEventListener('offline', offlineHandler)
    return () => { window.removeEventListener('online', onlineHandler); window.removeEventListener('offline', offlineHandler) }
  }, [])

  const latestRatings = useMemo(() => {
    const map = new Map()
    for (const rating of [...ratings].sort((a, b) => new Date(b.tasted_at) - new Date(a.tasted_at))) if (!map.has(rating.drink_id)) map.set(rating.drink_id, rating)
    return map
  }, [ratings])
  const visible = useMemo(() => drinks.filter((drink) => (category === 'Todas' || drink.category === category) && `${drink.name} ${drink.brand} ${drink.category}`.toLowerCase().includes(search.toLowerCase())), [drinks, category, search])
  const selectedRatings = selected ? ratings.filter((rating) => rating.drink_id === selected.id).sort((a, b) => new Date(b.tasted_at) - new Date(a.tasted_at)) : []

  async function run(action, success) {
    setBusy(true); setNotice('')
    try { await action(); await refresh(); setNotice(success) } catch (error) { setNotice(error.message || 'No se pudo completar la acción.') } finally { setBusy(false) }
  }
  async function submitDrink(values) {
    const current = dialog?.type === 'edit-drink' ? dialog.drink : null
    await run(async () => { const saved = await saveDrink(values, current); if (!current) setSelected(saved); setDialog(null) }, current ? 'Bebida actualizada' : 'Bebida agregada a tu colección')
  }
  async function submitRating(values) {
    await run(async () => { await saveRating({ ...values, drink_id: selected.id }, editingRating); setRatingFormOpen(false); setEditingRating(null) }, editingRating ? 'Calificación actualizada' : 'Calificación guardada')
  }
  async function removeDrink() {
    if (!selected || !window.confirm(`¿Eliminar “${selected.name}” y sus calificaciones?`)) return
    await run(async () => { await deleteDrink(selected.id); setSelected(null) }, 'Bebida eliminada')
  }
  async function removeRating(rating) {
    if (!window.confirm('¿Eliminar esta calificación?')) return
    await run(() => deleteRating(rating.id), 'Calificación eliminada')
  }

  return <div className="app-shell">
    <header className="topbar"><button className="brand" onClick={() => { setSelected(null); setDialog(null) }}><span className="brand-icon">C</span><span>ChinChin<span className="brand-period">.</span></span></button><div className="topbar-right">{(!online || !supabase) && <span className="connection-pill"><WifiOff size={14} />{online ? 'Modo local' : 'Sin conexión'}</span>}<button className="button primary add-button" onClick={() => setDialog({ type: 'new-drink' })}><Plus size={18} /><span>Agregar bebida</span></button></div></header>
    {notice && <div className="toast" role="status"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Cerrar aviso"><X size={16} /></button></div>}
    {selected ? <main className="detail-page">
      <button className="back-link" onClick={() => { setSelected(null); setRatingFormOpen(false); setEditingRating(null) }}><ArrowLeft size={17} /> Volver a mi colección</button>
      <section className="detail-hero"><DrinkImage src={selected.image_url} name={selected.name} className="detail-image"/><div className="detail-copy"><span className="eyebrow">{selected.category}</span><h1>{selected.name}</h1><p className="detail-brand">{selected.brand || 'Marca sin especificar'}</p><div className="detail-facts">{selected.country && <span><MapPin size={15}/>{selected.country}</span>}{selected.alcohol_percentage && <span><Percent size={15}/>{selected.alcohol_percentage}% alc.</span>}</div><div className="detail-actions"><button className="button secondary" onClick={() => setDialog({ type: 'edit-drink', drink: selected })}><Pencil size={15}/> Editar</button><button className="button danger" onClick={removeDrink}><Trash2 size={15}/> Eliminar</button></div></div></section>
      <section className="tasting-section"><div className="section-heading"><div><span className="eyebrow">Tu experiencia</span><h2>Calificaciones <span className="count">{selectedRatings.length}</span></h2></div>{!ratingFormOpen && <button className="button secondary" onClick={() => { setEditingRating(null); setRatingFormOpen(true) }}><Plus size={16}/> Agregar calificación</button>}</div>
        {ratingFormOpen && <div className="inline-form"><div className="inline-form-title"><h3>{editingRating ? 'Editar calificación' : '¿Qué te pareció?'}</h3><button onClick={() => { setRatingFormOpen(false); setEditingRating(null) }} aria-label="Cerrar"><X size={18}/></button></div><RatingForm initial={editingRating} onSave={submitRating} onCancel={() => { setRatingFormOpen(false); setEditingRating(null) }} /></div>}
        {selectedRatings.length === 0 && !ratingFormOpen ? <div className="empty-rating"><Star size={21}/><span>Tu primera cata todavía está por escribirse.</span><button className="text-link" onClick={() => setRatingFormOpen(true)}>Calificar esta bebida</button></div> : <div className="rating-list">{selectedRatings.map((rating) => <article className="rating-entry" key={rating.id}><div className="rating-entry-top"><div className="rating-big"><span>✳</span><strong>{Number(rating.score).toFixed(1)}</strong><small>/ 10</small></div><span className="tasted-date"><CalendarDays size={14}/>{new Date(`${rating.tasted_at}T12:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' })}</span><div className="entry-actions"><button aria-label="Editar calificación" onClick={() => { setEditingRating(rating); setRatingFormOpen(true) }}><Pencil size={15}/></button><button aria-label="Eliminar calificación" onClick={() => removeRating(rating)}><Trash2 size={15}/></button></div></div>{rating.comments && <p className="rating-comment">“{rating.comments}”</p>}<div className={`would-again ${rating.would_drink_again ? 'yes' : 'no'}`}><Heart size={14}/>{rating.would_drink_again ? 'La volvería a tomar' : 'No la volvería a tomar'}</div></article>)}</div>}
      </section>
    </main> : <main className="collection-page"><section className="hero"><div className="hero-copy"><span className="eyebrow">TU BITÁCORA PERSONAL</span><h1>El placer de<br/><em>descubrir.</em></h1><p>Una colección de sabores, recuerdos y buenos brindis.</p></div><div className="hero-count"><strong>{String(drinks.length).padStart(2, '0')}</strong><span>{drinks.length === 1 ? 'etiqueta' : 'etiquetas'}<br/>en tu colección</span><GlassWater size={23}/></div><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/></section>
      <section className="collection"><div className="collection-heading"><div><span className="eyebrow">TU COLECCIÓN</span><h2>Mis bebidas <span className="count">{drinks.length}</span></h2></div><div className="collection-search"><Search size={17}/><input aria-label="Buscar bebidas" placeholder="Buscar en mi colección" value={search} onChange={(e) => setSearch(e.target.value)}/>{search && <button aria-label="Limpiar búsqueda" onClick={() => setSearch('')}><X size={15}/></button>}</div></div><div className="filter-row" aria-label="Filtrar por categoría">{categories.map((item) => <button key={item} className={category === item ? 'filter-chip active' : 'filter-chip'} onClick={() => setCategory(item)}>{item}</button>)}</div>
        {visible.length ? <div className="drink-grid">{visible.map((drink) => <DrinkCard key={drink.id} drink={drink} rating={latestRatings.get(drink.id)} onClick={() => setSelected(drink)}/>)}</div> : <div className="empty-state"><div className="empty-glass"><GlassWater size={32}/></div><h3>{drinks.length ? 'No encontramos esa bebida' : 'Tu colección empieza acá'}</h3><p>{drinks.length ? 'Probá con otro nombre o categoría.' : 'Guardá esa botella que te sorprendió y empezá tu bitácora.'}</p>{!drinks.length && <button className="button primary" onClick={() => setDialog({ type: 'new-drink' })}><Plus size={17}/> Agregar mi primera bebida</button>}</div>}
      </section><footer className="footer-note"><span>HECHO PARA DISFRUTAR SIN PRISA</span><span>CHINCHIN <b>✳</b></span></footer>
    </main>}
    {dialog && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setDialog(null) }}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="form-title"><div className="modal-header"><div><span className="eyebrow">MI COLECCIÓN</span><h2 id="form-title">{dialog.type === 'edit-drink' ? 'Editar bebida' : 'Nueva bebida'}</h2></div><button className="icon-button" aria-label="Cerrar" onClick={() => setDialog(null)}><X size={19}/></button></div><DrinkForm initial={dialog.drink} onSave={submitDrink} onCancel={() => setDialog(null)}/></section></div>}
    {busy && <div className="busy-indicator"><span className="loader"/> Guardando</div>}
    <button className="mobile-add" aria-label="Agregar bebida" onClick={() => setDialog({ type: 'new-drink' })}><Plus size={22}/></button>
  </div>
}
