const ENDPOINT = 'https://search.openfoodfacts.org/search'

export async function searchOpenFoodFacts(query, signal) {
  const params = new URLSearchParams({
    q: query,
    langs: 'es,en',
    page_size: '8',
    fields: 'code,product_name,brands,categories,countries,alcohol_100g,image_url'
  })
  const response = await fetch(`${ENDPOINT}?${params}`, { signal })
  if (!response.ok) throw new Error('No se pudo consultar Open Food Facts')
  const data = await response.json()
  return (data.hits || []).filter((product) => product.product_name).map((product) => ({
    name: product.product_name || '',
    brand: asText(product.brands),
    category: inferCategory(asText(product.categories)),
    country: asText(product.countries),
    alcohol_percentage: product.alcohol_100g ? Number(product.alcohol_100g) : '',
    image_url: product.image_url || '',
    code: product.code || ''
  }))
}

function asText(value) {
  if (Array.isArray(value)) return value.filter(Boolean).join(', ')
  return value || ''
}

function inferCategory(source) {
  const text = source.toLowerCase()
  if (text.includes('wine') || text.includes('vino')) return 'Vinos'
  if (text.includes('gin') || text.includes('ginebra')) return 'Gin'
  if (text.includes('vodka')) return 'Vodka'
  if (text.includes('aperitif') || text.includes('aperitivo')) return 'Aperitivos'
  return ''
}
