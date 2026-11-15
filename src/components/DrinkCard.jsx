import { ArrowUpRight } from 'lucide-react'
import DrinkImage from './DrinkImage.jsx'

export default function DrinkCard({ drink, rating, onClick }) {
  return <button className="drink-card" onClick={onClick} aria-label={`Ver ${drink.name}`}>
    <DrinkImage src={drink.image_url} name={drink.name} />
    <div className="card-info"><div className="card-title-row"><div><span className="eyebrow">{drink.category}</span><h3>{drink.name}</h3><p>{drink.brand || 'Marca sin especificar'}</p></div><ArrowUpRight size={18} className="card-arrow" /></div>
      {rating ? <div className="card-score"><span className="score-mark">✳</span><strong>{Number(rating.score).toFixed(1)}</strong><span>/ 10</span></div> : <div className="card-score unrated">Sin calificar</div>}
    </div>
  </button>
}
