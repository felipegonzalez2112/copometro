const DRINKS_KEY = 'chinchin.drinks.v1'
const RATINGS_KEY = 'chinchin.ratings.v1'

export function readLocal(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] }
}

export function writeLocal(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch (error) { console.warn('No se pudo actualizar la copia local', error) }
}

export const getLocalDrinks = () => readLocal(DRINKS_KEY)
export const getLocalRatings = () => readLocal(RATINGS_KEY)
export const cacheDrinks = (items) => writeLocal(DRINKS_KEY, items)
export const cacheRatings = (items) => writeLocal(RATINGS_KEY, items)
export const DRINKS_CACHE_KEY = DRINKS_KEY
export const RATINGS_CACHE_KEY = RATINGS_KEY
