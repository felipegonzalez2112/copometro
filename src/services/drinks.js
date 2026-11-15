import { supabase, storageBucket } from '../lib/supabase'
import { cacheDrinks, cacheRatings, getLocalDrinks, getLocalRatings } from './offlineStore'

const localMode = () => !supabase || !navigator.onLine
const sortDrinks = (items) => [...items].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

export async function listDrinks() {
  if (localMode()) return sortDrinks(getLocalDrinks())
  const { data, error } = await supabase.from('drinks').select('*').order('created_at', { ascending: false })
  if (error) return sortDrinks(getLocalDrinks())
  cacheDrinks(data || [])
  return data || []
}

export async function listRatings() {
  if (localMode()) return getLocalRatings()
  const { data, error } = await supabase.from('ratings').select('*').order('tasted_at', { ascending: false })
  if (error) return getLocalRatings()
  cacheRatings(data || [])
  return data || []
}

async function uploadImage(file) {
  if (!file) return null
  if (!supabase || !navigator.onLine) return await new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const path = `${crypto.randomUUID()}.${extension}`
  const { error } = await supabase.storage.from(storageBucket).upload(path, file, { upsert: false, contentType: file.type })
  if (error) throw error
  return supabase.storage.from(storageBucket).getPublicUrl(path).data.publicUrl
}

export async function saveDrink(values, current = null) {
  const image_url = values.image_file ? await uploadImage(values.image_file) : values.image_url || current?.image_url || null
  const record = {
    name: values.name.trim(), brand: values.brand.trim(), category: values.category,
    country: values.country.trim(), alcohol_percentage: values.alcohol_percentage === '' ? null : Number(values.alcohol_percentage),
    image_url
  }
  if (localMode()) {
    const drinks = getLocalDrinks()
    const saved = { ...record, id: current?.id || crypto.randomUUID(), created_at: current?.created_at || new Date().toISOString() }
    cacheDrinks(current ? drinks.map((item) => item.id === current.id ? saved : item) : [saved, ...drinks])
    return saved
  }
  if (current) {
    const { data, error } = await supabase.from('drinks').update(record).eq('id', current.id).select().single()
    if (error) throw error
    cacheDrinks((await listDrinks()).map((item) => item.id === data.id ? data : item))
    return data
  }
  const { data, error } = await supabase.from('drinks').insert(record).select().single()
  if (error) throw error
  cacheDrinks([data, ...getLocalDrinks()])
  return data
}

export async function deleteDrink(id) {
  if (localMode()) {
    cacheDrinks(getLocalDrinks().filter((item) => item.id !== id))
    cacheRatings(getLocalRatings().filter((item) => item.drink_id !== id))
    return
  }
  const { error } = await supabase.from('drinks').delete().eq('id', id)
  if (error) throw error
  cacheDrinks(getLocalDrinks().filter((item) => item.id !== id))
  const ratings = getLocalRatings().filter((item) => item.drink_id !== id)
  cacheRatings(ratings)
}

export async function saveRating(values, current = null) {
  const record = { drink_id: values.drink_id, score: Number(values.score), comments: values.comments.trim(), tasted_at: values.tasted_at, would_drink_again: Boolean(values.would_drink_again) }
  if (localMode()) {
    const ratings = getLocalRatings()
    const saved = { ...record, id: current?.id || crypto.randomUUID(), created_at: current?.created_at || new Date().toISOString() }
    cacheRatings(current ? ratings.map((item) => item.id === current.id ? saved : item) : [saved, ...ratings])
    return saved
  }
  if (current) {
    const { data, error } = await supabase.from('ratings').update(record).eq('id', current.id).select().single()
    if (error) throw error
    const ratings = await listRatings()
    cacheRatings(ratings.map((item) => item.id === data.id ? data : item))
    return data
  }
  const { data, error } = await supabase.from('ratings').insert(record).select().single()
  if (error) throw error
  cacheRatings([data, ...getLocalRatings()])
  return data
}

export async function deleteRating(id) {
  if (localMode()) {
    cacheRatings(getLocalRatings().filter((item) => item.id !== id))
    return
  }
  const { error } = await supabase.from('ratings').delete().eq('id', id)
  if (error) throw error
  cacheRatings(getLocalRatings().filter((item) => item.id !== id))
}

export function updateDrinkCache(drinks) { cacheDrinks(drinks) }
export function updateRatingCache(ratings) { cacheRatings(ratings) }
