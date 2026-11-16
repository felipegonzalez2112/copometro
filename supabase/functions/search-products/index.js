const allowedOrigins = new Set([
  'https://felipegonzalez2112.github.io',
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173'
])

Deno.serve(async (request) => {
  const origin = request.headers.get('origin')
  if (origin && !allowedOrigins.has(origin)) return new Response('Origin not allowed', { status: 403 })
  const corsHeaders = {
    ...(origin ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-api-version',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Vary': 'Origin'
  }

  if (request.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (request.method !== 'POST') return json({ error: 'Method not allowed' }, 405, corsHeaders)

  try {
    const { query = '' } = await request.json()
    const search = String(query).trim().slice(0, 100)
    if (search.length < 2) return json({ products: [] }, 200, corsHeaders)

    const params = new URLSearchParams({
      q: search,
      langs: 'es,en',
      page_size: '8',
      fields: 'code,product_name,brands,categories,countries,alcohol_100g,image_url'
    })
    const response = await fetch(`https://search.openfoodfacts.org/search?${params}`)
    if (!response.ok) return json({ error: 'Open Food Facts no está disponible ahora.' }, 502, corsHeaders)

    const result = await response.json()
    const products = (result.hits || []).filter((item) => item.product_name).map((item) => ({
      name: item.product_name || '',
      brand: asText(item.brands),
      category: inferCategory(asText(item.categories)),
      country: asText(item.countries),
      alcohol_percentage: item.alcohol_100g ? Number(item.alcohol_100g) : '',
      image_url: item.image_url || '',
      code: item.code || ''
    }))

    return json({ products }, 200, corsHeaders)
  } catch {
    return json({ error: 'No se pudo completar la búsqueda.' }, 500, corsHeaders)
  }
})

function json(body, status = 200, corsHeaders = {}) {
  return Response.json(body, {
    status,
    headers: { ...corsHeaders, 'Cache-Control': 'no-store' }
  })
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
