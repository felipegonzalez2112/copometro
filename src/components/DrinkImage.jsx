import { Wine } from 'lucide-react'

export default function DrinkImage({ src, name, className = '' }) {
  return <div className={`drink-image ${className}`}>{src ? <img src={src} alt={name} loading="lazy" /> : <div className="image-placeholder"><Wine size={34} strokeWidth={1.2} /><span>Sin imagen</span></div>}</div>
}
