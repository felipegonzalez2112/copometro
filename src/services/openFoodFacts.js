const ENDPOINT = 'https://world.openfoodfacts.org/cgi/search.pl'

export async function searchOpenFoodFacts(query, signal) {
  const params = new URLSearchParams({ search_terms: query, search_simple: '1', action: 'process', json: '1', page_size: '8', fields: 'code,product_name,product_name_es,brands,categories,countries,alcohol_100g,image_front_url,image_url' })
  const response = await fetch(`${ENDPOINT}?${params}`, { signal })
  if (!response.ok) throw new Error('No se pudo consultar Open Food Facts')
  const data = await response.json()
  return (data.products || []).filter((product) => product.product_name || product.product_name_es).map((product) => ({
    name: product.product_name_es || product.product_name || '',
    brand: product.brands || '',
    category: inferCategory(product.categories || ''),
    country: product.countries || '',
    alcohol_percentage: product.alcohol_100g ? Number(product.alcohol_100g) : '',
    image_url: product.image_front_url || product.image_url || '',
    code: product.code
  }))
}

function inferCategory(source) {
  const text = source.toLowerCase()
  if (text.includes('wine') || text.includes('vino')) return 'Vinos'
  if (text.includes('gin') || text.includes('ginebra')) return 'Gin'
  if (text.includes('vodka')) return 'Vodka'
  if (text.includes('aperitif') || text.includes('aperitivo')) return 'Aperitivos'
  return ''
}
