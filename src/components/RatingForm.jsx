import { useState } from 'react'
import { Star } from 'lucide-react'

export default function RatingForm({ initial, onSave, onCancel }) {
  const [form, setForm] = useState({ score: initial?.score || 8, comments: initial?.comments || '', tasted_at: initial?.tasted_at || new Date().toISOString().slice(0, 10), would_drink_again: initial?.would_drink_again ?? true })
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }))
  return <form className="rating-form" onSubmit={(event) => { event.preventDefault(); onSave(form) }}>
    <div className="field"><label>Puntuación <b>{form.score}/10</b></label><input aria-label="Puntuación" type="range" min="1" max="10" value={form.score} onChange={(e) => set('score', e.target.value)} /></div>
    <div className="form-grid"><div className="field"><label htmlFor="tasted-at">Fecha</label><input id="tasted-at" type="date" value={form.tasted_at} onChange={(e) => set('tasted_at', e.target.value)} required /></div><div className="field"><label>¿La volverías a tomar?</label><button type="button" className={`toggle-choice ${form.would_drink_again ? 'is-yes' : ''}`} onClick={() => set('would_drink_again', !form.would_drink_again)}>{form.would_drink_again ? 'Sí, la elegiría otra vez' : 'No por ahora'}</button></div></div>
    <div className="field"><label htmlFor="rating-comments">Comentario personal</label><textarea id="rating-comments" rows="3" placeholder="Aroma, sabor, ocasión…" value={form.comments} onChange={(e) => set('comments', e.target.value)} /></div>
    <div className="form-actions"><button type="button" className="button quiet" onClick={onCancel}>Cancelar</button><button className="button primary"><Star size={16} /> Guardar calificación</button></div>
  </form>
}
