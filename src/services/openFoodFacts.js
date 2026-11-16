import { supabase } from '../lib/supabase.js'

const ENDPOINT = 'https://search.openfoodfacts.org/search'

export async function searchOpenFoodFacts(query, signal) {
  if (!supabase) {
    throw new Error('La búsqueda necesita configurar Supabase. Mientras tanto, podés cargar la bebida manualmente.')
  }
  const { data, error } = await supabase.functions.invoke('search-products', {
    body: { query: query.trim() },
    signal
  })
  if (error) throw new Error('No se pudo consultar Open Food Facts a través de Supabase.')
  return data?.products || []
}
