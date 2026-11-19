const THEME_KEY = 'chinchin.theme.v1';
const INGREDIENTS_KEY = 'chinchin.ingredients.v1';
const FAVORITES_KEY = 'chinchin.favorites.v1';
const API_BASE = 'https://24cocktails.com/api/v1';

// Separar visualmente las bebidas de los ingredientes que las acompañan.
const INGREDIENT_CATEGORIES = [
  { id: 'espirituosas', group: 'bebidas', label: '🥃 Destilados' },
  { id: 'licores', group: 'bebidas', label: '🍷 Licores & aperitivos' },
  { id: 'mezcladores', group: 'ingredientes', label: '🥤 Mezcladores' },
  { id: 'frutas', group: 'ingredientes', label: '🍋 Frutas & cítricos' },
  { id: 'basicos', group: 'ingredientes', label: '🌿 Básicos & especias' }
];

const INGREDIENT_CATALOG = {
  espirituosas: [
    'Gin', 'Vodka', 'Ron', 'Whisky', 'Tequila', 'Fernet',
    'Bourbon', 'Scotch', 'Mezcal', 'Brandy', 'Cognac', 'Pisco'
  ],
  licores: [
    'Campari', 'Vermut dulce', 'Vermut seco', 'Aperol',
    'Triple Sec', 'Cointreau', 'Licor de café', 'Kahlúa',
    'Baileys', 'Amaretto', 'Blue Curaçao', 'Cynar',
    'Jägermeister', 'Limoncello', 'Chartreuse'
  ],
  mezcladores: [
    'Tónica', 'Coca-Cola', 'Soda', 'Ginger Beer', 'Ginger Ale',
    'Sprite / Lima-Limón', 'Jugo de arándano', 'Jugo de tomate',
    'Agua con gas', 'Red Bull'
  ],
  frutas: [
    'Lima', 'Limón', 'Naranja', 'Pomelo', 'Menta',
    'Ananá', 'Frutilla', 'Manzana', 'Pepino', 'Maracuyá'
  ],
  basicos: [
    'Almíbar / Azúcar', 'Miel', 'Angostura Bitters', 'Clara de huevo',
    'Granadina', 'Sal', 'Café', 'Canela', 'Jengibre', 'Tabasco'
  ]
};

const COMMON_DRINKS = ['Gin', 'Vodka', 'Ron', 'Whisky', 'Fernet', 'Tequila'];
const COMMON_INGREDIENTS = ['Tónica', 'Soda', 'Coca-Cola', 'Lima', 'Limón', 'Naranja', 'Menta', 'Almíbar / Azúcar'];

// Aliases para la taxonomía de la API de 24cocktails
const INGREDIENT_ALIASES = {
  'ron': 'rum,white_rum',
  'rum': 'rum,white_rum',
  'lima': 'lime,lime_juice',
  'lime': 'lime,lime_juice',
  'limon': 'lemon,lemon_juice',
  'limón': 'lemon,lemon_juice',
  'lemon': 'lemon,lemon_juice',
  'naranja': 'orange,orange_juice',
  'orange': 'orange,orange_juice',
  'menta': 'mint',
  'hierbabuena': 'mint',
  'azucar': 'sugar,sugar_syrup',
  'azúcar': 'sugar,sugar_syrup',
  'almibar': 'sugar_syrup',
  'almíbar': 'sugar_syrup',
  'almíbar / azúcar': 'sugar_syrup,sugar',
  'almibar / azucar': 'sugar_syrup,sugar',
  'jarabe': 'sugar_syrup',
  'miel': 'honey',
  'cafe': 'coffee',
  'café': 'coffee',
  'leche': 'milk',
  'crema': 'cream',
  'vino': 'wine',
  'cerveza': 'beer',
  'frutilla': 'strawberry',
  'fresa': 'strawberry',
  'arandano': 'cranberry,cranberry_juice',
  'arándano': 'cranberry,cranberry_juice',
  'durazno': 'peach',
  'melocoton': 'peach',
  'melocotón': 'peach',
  'pomelo': 'grapefruit,grapefruit_juice',
  'anana': 'pineapple,pineapple_juice',
  'ananá': 'pineapple,pineapple_juice',
  'piña': 'pineapple,pineapple_juice',
  'manzana': 'apple',
  'pepino': 'cucumber',
  'maracuya': 'passion_fruit',
  'maracuyá': 'passion_fruit',
  'huevo': 'egg',
  'clara de huevo': 'egg_white',
  'canela': 'cinnamon',
  'jengibre': 'ginger',
  'ginger beer': 'ginger_beer',
  'ginger ale': 'ginger_ale',
  'sal': 'salt',
  'soda': 'soda,soda_water',
  'agua con gas': 'soda,soda_water',
  'agua tonica': 'tonic',
  'agua tónica': 'tonic',
  'tonica': 'tonic',
  'tónica': 'tonic',
  'coca cola': 'cola',
  'coca-cola': 'cola',
  'coca': 'cola',
  'sprite / lima-limón': 'lemonade',
  'jugo de arándano': 'cranberry_juice',
  'jugo de arandano': 'cranberry_juice',
  'jugo de tomate': 'tomato_juice',
  'jugo de lima': 'lime_juice',
  'jugo de limon': 'lemon_juice',
  'jugo de limón': 'lemon_juice',
  'jugo de naranja': 'orange_juice',
  'jugo de pomelo': 'grapefruit_juice',
  'angostura bitters': 'angostura,bitters',
  'angostura': 'angostura,bitters',
  'bitters': 'angostura,bitters',
  'triple sec': 'triple_sec',
  'cointreau': 'cointreau,triple_sec',
  'aperol': 'aperol,campari',
  'campari': 'campari',
  'vermut dulce': 'sweet_vermouth',
  'vermut seco': 'dry_vermouth',
  'vermut': 'sweet_vermouth,dry_vermouth',
  'vermouth': 'sweet_vermouth,dry_vermouth',
  'granadina': 'grenadine',
  'champan': 'sparkling_wine',
  'champán': 'sparkling_wine',
  'espumante': 'sparkling_wine',
  'prosecco': 'prosecco,sparkling_wine',
  'licor de cafe': 'coffee_liqueur',
  'licor de café': 'coffee_liqueur',
  'kahlua': 'coffee_liqueur',
  'kahlúa': 'coffee_liqueur',
  'baileys': 'irish_cream',
  'amaretto': 'amaretto',
  'blue curacao': 'blue_curacao,triple_sec',
  'blue curaçao': 'blue_curacao,triple_sec',
  'cynar': 'cynar,amaro',
  'jagermeister': 'herbal_liqueur',
  'jägermeister': 'herbal_liqueur',
  'limoncello': 'limoncello',
  'chartreuse': 'herbal_liqueur',
  'whisky': 'whiskey',
  'whiskey': 'whiskey',
  'bourbon': 'bourbon,whiskey',
  'scotch': 'scotch,whiskey',
  'gin': 'gin',
  'ginebra': 'gin',
  'vodka': 'vodka',
  'tequila': 'tequila',
  'fernet': 'fernet,amaro',
  'cognac': 'cognac,brandy',
  'coñac': 'cognac,brandy',
  'brandy': 'brandy',
  'mezcal': 'mezcal',
  'pisco': 'pisco'
};

// Autocomplete index
const AUTOCOMPLETE_INDEX = [];
(function buildAutocompleteIndex() {
  const seen = new Set();
  for (const [catId, items] of Object.entries(INGREDIENT_CATALOG)) {
    const catObj = INGREDIENT_CATEGORIES.find((c) => c.id === catId);
    const catLabel = catObj ? catObj.label.replace(/^[^\s]+\s*/, '') : '';
    for (const name of items) {
      const lower = name.toLowerCase();
      if (!seen.has(lower)) {
        seen.add(lower);
        AUTOCOMPLETE_INDEX.push({ name, category: catLabel });
      }
    }
  }
})();

const icons = {
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  bottle: '<svg viewBox="0 0 24 24"><path d="M9 3h6v3l2 2v12H7V8l2-2zM9 6h6M7 11h10"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6M9 12h12"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',
  external: '<svg viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>',
  alert: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="M20 6 9 17l-5-5"/></svg>',
  sparkles: '<svg viewBox="0 0 24 24"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3z"/></svg>',
  heart: '<svg viewBox="0 0 24 24"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  heartFilled: '<svg viewBox="0 0 24 24" style="fill:currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>',
  thumbUp: '<svg viewBox="0 0 24 24"><path d="M7 10v12M15 10h5.5a2.5 2.5 0 0 1 2.5 2.5c0 .35-.07.69-.2 1l-2.4 6c-.36.9-1.23 1.5-2.2 1.5H7m0-11H3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h4M7 10l5-8a2 2 0 0 1 2 2v6"/></svg>',
  thumbDown: '<svg viewBox="0 0 24 24"><path d="M17 14V2M9 14H3.5A2.5 2.5 0 0 1 1 11.5c0-.35.07-.69.2-1l2.4-6C3.96 3.6 4.83 3 5.8 3H17m0 11h4a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4m0 11-5 8a2 2 0 0 1-2-2v-6"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  starFilled: '<svg viewBox="0 0 24 24" style="fill:currentColor"><path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>'
};

const app = document.querySelector('#app');

// Caches en memoria para evitar peticiones duplicadas
const searchCache = new Map();
const recipeCache = new Map();
let currentDrinksMap = new Map();

// Control de peticiones concurrentes
let activeSearchAbort = null;

// Estado principal
let themePreference = readThemePreference();
let selectedIngredients = loadSavedIngredients();
let favorites = loadFavorites();

// Navegación principal
let activeMainView = 'search'; // 'search' | 'favorites'

let searchState = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  error: null,
  data: null,
  searchedKey: ''
};

// Filtros y pestañas en resultados
let resultsActiveTab = 'can_make'; // 'can_make' | 'one_away'
let filterBase = 'all';
let filterMissing = 'all';
let filterQuery = '';

// Filtro en vista de favoritos
let favFilter = 'all'; // 'all' | 'liked' | 'disliked' | 'ready'

// Autocomplete state
let autocompleteSuggestions = [];
let autocompleteHighlightIndex = -1;

// Detalle
let screen = {
  page: 'home', // 'home' | 'detail'
  selectedSlug: null,
  selectedBasic: null,
  fullRecipe: null,
  recipeLoading: false,
  recipeError: null
};
let notice = '';

function readThemePreference() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return ['system', 'light', 'dark'].includes(saved) ? saved : 'light';
  } catch {
    return 'system';
  }
}

function applyTheme() {
  const theme = themePreference === 'system'
    ? (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
    : themePreference;
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('#theme-color')?.setAttribute('content', theme === 'light' ? '#f8f5f0' : '#171412');
}
applyTheme();

function loadSavedIngredients() {
  try {
    const saved = localStorage.getItem(INGREDIENTS_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistIngredients() {
  try {
    localStorage.setItem(INGREDIENTS_KEY, JSON.stringify(selectedIngredients));
  } catch {}
}

function loadFavorites() {
  try {
    const saved = localStorage.getItem(FAVORITES_KEY);
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function persistFavorites() {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch {}
}

function notify(message) {
  notice = message;
  render();
  setTimeout(() => {
    if (notice === message) {
      notice = '';
      render();
    }
  }, 2600);
}

function esc(value = '') {
  return String(value).replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[char]));
}

function icon(name) {
  return icons[name] || '';
}

function formatIngredientName(raw) {
  const clean = raw.trim();
  if (!clean) return '';
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

function buildHaveQuery(ingredients) {
  const tokens = new Set();
  for (const item of ingredients) {
    const lower = item.toLowerCase().trim();
    if (INGREDIENT_ALIASES[lower]) {
      INGREDIENT_ALIASES[lower].split(',').forEach((t) => tokens.add(t.trim()));
    }
    tokens.add(lower);
  }
  return Array.from(tokens).join(',');
}

function normalizeIngredientText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function ingredientAliasesFor(value) {
  const normalized = normalizeIngredientText(value);
  const aliasEntry = Object.entries(INGREDIENT_ALIASES).find(([name]) => normalizeIngredientText(name) === normalized);
  return aliasEntry ? aliasEntry[1].split(',').map(normalizeIngredientText) : [];
}

function ingredientIsAvailable(ingredient) {
  const name = typeof ingredient === 'string' ? ingredient : (ingredient?.name || ingredient?.key || '');
  const recipeName = normalizeIngredientText(name);
  if (!recipeName) return true;

  // "Vermouth" genérico en la API puede corresponder a seco o dulce en la barra.
  if (recipeName === 'vermouth' || recipeName === 'vermut') {
    return selectedIngredients.some((item) => /\b(vermouth|vermut)\b/.test(normalizeIngredientText(item)));
  }

  return selectedIngredients.some((selected) => {
    const selectedName = normalizeIngredientText(selected);
    const candidates = [selectedName, ...ingredientAliasesFor(selected)];
    return candidates.some((candidate) => candidate && (` ${recipeName} `).includes(` ${candidate.replace(/_/g, ' ')} `));
  });
}

function ingredientIsExplicitlyMissing(ingredient, drink) {
  if (!drink?.missing) return false;
  const ingredientName = normalizeIngredientText(typeof ingredient === 'string' ? ingredient : ingredient?.name);
  const ingredientKey = normalizeIngredientText(typeof ingredient === 'object' ? ingredient?.key : '');
  const missingName = normalizeIngredientText(drink.missing.name);
  const missingKey = normalizeIngredientText(drink.missing.key);
  return Boolean(
    (missingKey && (ingredientKey === missingKey || ingredientName === missingKey)) ||
    (missingName && (` ${ingredientName} `).includes(` ${missingName} `))
  );
}

function getRecipeMissingIngredients(recipe) {
  const ingredients = Array.isArray(recipe?.ingredients) ? recipe.ingredients : [];
  return ingredients.filter((ingredient) => {
    if (ingredient && typeof ingredient === 'object' && ingredient.optional) return false;
    return !ingredientIsAvailable(ingredient);
  });
}

async function verifySearchResults(data, signal) {
  // Solo pedimos fichas completas para los "listos": el resumen de la API puede omitir ingredientes obligatorios.
  const unique = Array.from(new Map((data.can_make?.results || []).map((drink) => [drink.slug, drink])).values());
  const results = await Promise.all(unique.map(async (summary) => {
    try {
      let recipe = recipeCache.get(summary.slug);
      if (!recipe) {
        const response = await fetch(`${API_BASE}/recipe/${encodeURIComponent(summary.slug)}?lang=es`, { signal });
        if (!response.ok) throw new Error(`Respuesta del servidor: ${response.status}`);
        recipe = await response.json();
        recipeCache.set(summary.slug, recipe);
      }
      const ingredients = Array.isArray(recipe.ingredients) ? recipe.ingredients : [];
      if (!ingredients.length) throw new Error('La receta no trae ingredientes completos');
      const missingIngredients = getRecipeMissingIngredients(recipe);
      return {
        ...summary,
        ingredients,
        verified: true,
        missingIngredients,
        missing: missingIngredients.length ? { name: missingIngredients[0].name || missingIngredients[0] } : null
      };
    } catch (error) {
      if (error.name === 'AbortError') throw error;
      return { ...summary, verified: false, verificationError: true, missingIngredients: [] };
    }
  }));

  const verifiedCanMake = [];
  const needsIngredients = [];
  const unverified = [];
  for (const drink of results) {
    if (!drink.verified) {
      unverified.push(drink);
    } else if (drink.missingIngredients.length) {
      needsIngredients.push(drink);
    } else {
      verifiedCanMake.push(drink);
    }
  }

  const apiOneAway = (data.one_away?.results || []).map((summary) => {
    const missingName = summary.missing?.name || '';
    const ingredients = [...(summary.ingredients || [])];
    if (missingName && !ingredients.some((ingredient) => (` ${normalizeIngredientText(ingredient)} `).includes(` ${normalizeIngredientText(missingName)} `))) {
      ingredients.push(missingName);
    }
    const detectedMissing = getRecipeMissingIngredients({ ingredients });
    const missingIngredients = missingName
      ? [missingName]
      : detectedMissing.map((ingredient) => typeof ingredient === 'string' ? ingredient : ingredient.name).filter(Boolean);
    return {
      ...summary,
      ingredients,
      verified: true,
      missingIngredients,
      missing: summary.missing || (missingIngredients.length ? { name: missingIngredients[0] } : null)
    };
  });

  return {
    ...data,
    can_make: { ...data.can_make, results: verifiedCanMake, total: verifiedCanMake.length },
    one_away: { ...data.one_away, results: [...needsIngredients, ...apiOneAway, ...unverified], total: needsIngredients.length + apiOneAway.length + unverified.length }
  };
}

// ----------------------------------------------------
// ANÁLISIS DE INGREDIENTES (Tengo vs Me falta, priorizando los que tengo)
// ----------------------------------------------------

function analyzeDrinkIngredients(drink) {
  const ingredients = Array.isArray(drink.ingredients) ? drink.ingredients : [];
  if (!ingredients.length) return [];
  const analyzed = ingredients
    .filter((ingredient) => !(ingredient && typeof ingredient === 'object' && ingredient.optional))
    .map((ingredient) => {
    const name = typeof ingredient === 'string' ? ingredient : (ingredient?.name || ingredient?.key || '');
    return {
      name,
      owned: !ingredientIsExplicitlyMissing(ingredient, drink) && ingredientIsAvailable(ingredient)
    };
  });

  // Priorizar los que tengo primero
  analyzed.sort((a, b) => (b.owned ? 1 : 0) - (a.owned ? 1 : 0));
  return analyzed;
}

// ----------------------------------------------------
// FAVORITOS Y CALIFICACIONES
// ----------------------------------------------------

function isFavorite(slug) {
  return favorites.some((f) => f.slug === slug);
}

function getFavorite(slug) {
  return favorites.find((f) => f.slug === slug) || null;
}

function toggleFavorite(drink) {
  if (!drink) return;
  const existingIdx = favorites.findIndex((f) => f.slug === drink.slug);
  if (existingIdx >= 0) {
    favorites.splice(existingIdx, 1);
    persistFavorites();
    notify(`"${drink.name}" eliminado de favoritos`);
  } else {
    favorites.unshift({
      slug: drink.slug,
      name: drink.name,
      photo: drink.photo || '',
      base: drink.base || '',
      abv: drink.abv,
      prep_minutes: drink.prep_minutes,
      glass: drink.glass,
      ingredients: drink.ingredients || [],
      liked: null,
      score: 0,
      notes: '',
      savedAt: new Date().toISOString()
    });
    persistFavorites();
    notify(`¡"${drink.name}" guardado en Favoritos! ❤️`);
  }
  render();
}

function saveDrinkRating(slug, { liked, score, notes }) {
  let fav = favorites.find((f) => f.slug === slug);
  if (!fav) {
    // Si no estaba en favoritos, lo agregamos con la data actual
    const drink = currentDrinksMap.get(slug) || screen.fullRecipe || screen.selectedBasic || {};
    fav = {
      slug,
      name: drink.name || 'Cóctel',
      photo: drink.photo || '',
      base: drink.base || '',
      abv: drink.abv,
      prep_minutes: drink.prep_minutes,
      glass: drink.glass,
      ingredients: drink.ingredients || [],
      liked,
      score,
      notes,
      savedAt: new Date().toISOString()
    };
    favorites.unshift(fav);
  } else {
    fav.liked = liked;
    fav.score = score;
    fav.notes = notes;
    fav.savedAt = new Date().toISOString();
  }
  persistFavorites();
  notify('¡Calificación y nota guardadas! ⭐');
  render();
}

// ----------------------------------------------------
// CONSULTA A LA API DE 24COCKTAILS
// ----------------------------------------------------

async function searchCocktails(keepTab = false) {
  if (!selectedIngredients.length) {
    notify('Seleccioná al menos un ingrediente para buscar');
    return;
  }

  const haveParam = buildHaveQuery(selectedIngredients);
  const cacheKey = selectedIngredients.slice().sort().join(',').toLowerCase();

  // Si ya tenemos en caché
  if (searchCache.has(cacheKey)) {
    const cachedData = searchCache.get(cacheKey);
    searchState.status = 'success';
    searchState.error = null;
    searchState.data = cachedData;
    searchState.searchedKey = cacheKey;
    updateDrinksMap(cachedData);
    if (!keepTab) {
      resultsActiveTab = cachedData.can_make?.results?.length ? 'can_make' : 'one_away';
    }
    render();
    return;
  }

  // Cancelar petición previa si estuviera en curso
  if (activeSearchAbort) {
    activeSearchAbort.abort();
  }
  activeSearchAbort = new AbortController();

  searchState.status = 'loading';
  searchState.error = null;
  render();

  try {
    const url = `${API_BASE}/by-ingredients?have=${encodeURIComponent(haveParam)}&lang=es`;
    const res = await fetch(url, { signal: activeSearchAbort.signal });
    if (!res.ok) {
      throw new Error(`Respuesta del servidor: ${res.status}`);
    }
    let data = await res.json();
    if (!data || !data.can_make || !data.one_away) {
      throw new Error('Estructura de respuesta inesperada');
    }

    data = await verifySearchResults(data, activeSearchAbort.signal);

    searchCache.set(cacheKey, data);
    updateDrinksMap(data);
    searchState.status = 'success';
    searchState.data = data;
    searchState.searchedKey = cacheKey;
    if (!keepTab) {
      resultsActiveTab = data.can_make?.results?.length ? 'can_make' : 'one_away';
    }
  } catch (err) {
    if (err.name === 'AbortError') return;
    searchState.status = 'error';
    searchState.error = 'No se pudo conectar con la API de 24cocktails. Revisá tu conexión e intentá de nuevo.';
  } finally {
    activeSearchAbort = null;
    render();
  }
}

function updateDrinksMap(data) {
  currentDrinksMap.clear();
  if (data?.can_make?.results) {
    data.can_make.results.forEach((d) => currentDrinksMap.set(d.slug, d));
  }
  if (data?.one_away?.results) {
    data.one_away.results.forEach((d) => currentDrinksMap.set(d.slug, d));
  }
  // También indexar favoritos
  favorites.forEach((f) => {
    if (!currentDrinksMap.has(f.slug)) {
      currentDrinksMap.set(f.slug, f);
    }
  });
}

async function openRecipeDetail(slug) {
  const basic = currentDrinksMap.get(slug) || null;
  screen.page = 'detail';
  screen.selectedSlug = slug;
  screen.selectedBasic = basic;
  screen.fullRecipe = null;
  screen.recipeLoading = false;
  screen.recipeError = null;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  if (recipeCache.has(slug)) {
    screen.fullRecipe = recipeCache.get(slug);
    render();
    return;
  }

  screen.recipeLoading = true;
  render();

  try {
    const res = await fetch(`${API_BASE}/recipe/${encodeURIComponent(slug)}?lang=es`);
    if (!res.ok) throw new Error(`Error ${res.status}`);
    const recipe = await res.json();
    recipeCache.set(slug, recipe);
    if (screen.page === 'detail' && screen.selectedSlug === slug) {
      screen.fullRecipe = recipe;
      screen.recipeLoading = false;
      render();
    }
  } catch {
    if (screen.page === 'detail' && screen.selectedSlug === slug) {
      screen.recipeLoading = false;
      screen.recipeError = 'No se pudieron descargar las cantidades exactas o instrucciones en este momento.';
      render();
    }
  }
}

function addIngredient(name, autoSearch = false) {
  const formatted = formatIngredientName(name);
  if (!formatted) return;
  const exists = selectedIngredients.some((item) => item.toLowerCase() === formatted.toLowerCase());
  if (exists) {
    notify(`"${formatted}" ya está en tu lista`);
    return;
  }
  selectedIngredients.push(formatted);
  persistIngredients();
  autocompleteSuggestions = [];
  autocompleteHighlightIndex = -1;

  if (autoSearch) {
    searchCocktails(true);
  } else {
    render();
  }
}

function removeIngredient(name) {
  selectedIngredients = selectedIngredients.filter(
    (item) => item.toLowerCase() !== name.toLowerCase()
  );
  persistIngredients();
  render();
}

function toggleFrequent(name) {
  const exists = selectedIngredients.some((item) => item.toLowerCase() === name.toLowerCase());
  if (exists) {
    removeIngredient(name);
  } else {
    addIngredient(name);
  }
}

function clearAllIngredients() {
  selectedIngredients = [];
  persistIngredients();
  searchState.status = 'idle';
  searchState.data = null;
  filterMissing = 'all';
  filterBase = 'all';
  filterQuery = '';
  render();
}

// ----------------------------------------------------
// FILTRADO DE RESULTADOS
// ----------------------------------------------------

function filterDrinksList(drinks) {
  if (!drinks) return [];
  return drinks.filter((drink) => {
    if (filterBase !== 'all') {
      const drinkBase = (drink.base || '').toLowerCase();
      if (filterBase === 'other') {
        if (['gin', 'vodka', 'rum', 'whiskey', 'tequila'].includes(drinkBase)) {
          return false;
        }
      } else if (drinkBase !== filterBase) {
        return false;
      }
    }

    if (filterMissing !== 'all') {
      const missingNames = (drink.missingIngredients || []).map((item) => typeof item === 'string' ? item : item.name);
      if (!missingNames.includes(filterMissing) && drink.missing?.name !== filterMissing) {
        return false;
      }
    }

    if (filterQuery.trim()) {
      const q = filterQuery.toLowerCase();
      const matchName = (drink.name || '').toLowerCase().includes(q);
      const matchIngredients = Array.isArray(drink.ingredients) && drink.ingredients.some((ing) => ing.toLowerCase().includes(q));
      if (!matchName && !matchIngredients) return false;
    }

    return true;
  });
}

// ----------------------------------------------------
// RENDER VIEWS
// ----------------------------------------------------

function render() {
  app.innerHTML = `
    <header class="topbar">
      <button class="brand" data-action="home" aria-label="Ir al inicio de ChinChin">
        <span class="brand-mark">C</span>
        <span>ChinChin<span class="gold">.</span></span>
      </button>

      <!-- Navegación Mi Barra vs Favoritos -->
      <nav class="main-nav" aria-label="Vistas principales">
        <button
          type="button"
          class="nav-tab ${activeMainView === 'search' && screen.page !== 'detail' ? 'active' : ''}"
          data-nav="search"
        >
          ${icon('bottle')}
          <span>Mi Barra</span>
        </button>
        <button
          type="button"
          class="nav-tab ${activeMainView === 'favorites' && screen.page !== 'detail' ? 'active' : ''}"
          data-nav="favorites"
        >
          ${icon('heartFilled')}
          <span>Favoritos</span>
          ${favorites.length ? `<span class="nav-badge">${favorites.length}</span>` : ''}
        </button>
      </nav>

      <div class="topbar-right">
        <label class="theme-picker">
          <select id="theme-select" aria-label="Apariencia de ChinChin">
            <option value="system" ${themePreference === 'system' ? 'selected' : ''}>Sistema</option>
            <option value="light" ${themePreference === 'light' ? 'selected' : ''}>Claro</option>
            <option value="dark" ${themePreference === 'dark' ? 'selected' : ''}>Oscuro</option>
          </select>
        </label>
      </div>
    </header>

    ${notice ? `<div class="toast" role="status">${esc(notice)}</div>` : ''}

    ${screen.page === 'detail' ? renderDetail() : activeMainView === 'favorites' ? renderFavoritesView() : renderHome()}

    <footer class="footer">
      ChinChin · Recomendador de tragos & bitácora · Datos por 24cocktails.com
    </footer>
  `;
}

function renderHome() {
  const isChangedSinceSearch = searchState.status === 'success' && searchState.searchedKey !== selectedIngredients.slice().sort().join(',').toLowerCase();
  const renderPickerChip = (item) => {
    const isSelected = selectedIngredients.some((selected) => selected.toLowerCase() === item.toLowerCase());
    return `
      <button type="button" class="frequent-chip ${isSelected ? 'selected' : ''}"
        data-toggle-frequent="${esc(item)}" aria-pressed="${isSelected}">
        <span class="chip-icon">${isSelected ? '✓' : '+'}</span><span>${esc(item)}</span>
      </button>
    `;
  };
  const renderMoreCatalog = (group, commonItems) => {
    const common = new Set(commonItems.map((item) => item.toLowerCase()));
    return INGREDIENT_CATEGORIES.filter((cat) => cat.group === group).map((cat) => {
      const remainingItems = (INGREDIENT_CATALOG[cat.id] || []).filter((item) => !common.has(item.toLowerCase()));
      return remainingItems.length ? `
        <section class="catalog-subgroup">
          <h4>${esc(cat.label.replace(/^[^ ]+ /, ''))}</h4>
          <div class="frequent-wrap">${remainingItems.map(renderPickerChip).join('')}</div>
        </section>
      ` : '';
    }).join('');
  };

  return `
    <main class="home">
      <section class="catalog-heading">
        <span class="overline">¿QUÉ HAY EN TU BARRA?</span>
        <h1>Mis ingredientes</h1>
        <p class="catalog-lead">
          Elegí o buscá las bebidas e ingredientes que tenés disponibles. Te recomendaremos qué cócteles podés armar y qué te falta para otros.
        </p>
      </section>

      <section class="ingredients-card" aria-label="Selector de ingredientes">
        <!-- Buscador con autocompletado en vivo -->
        <form id="add-ingredient-form" class="ingredient-form" autocomplete="off">
          <div class="ingredient-input-wrap">
            ${icon('search')}
            <input
              id="ingredient-input"
              class="ingredient-input"
              type="text"
              placeholder="Buscar o agregar ingrediente (ej. Campari, Menta, Miel, Bourbon...)"
              maxlength="50"
              autocomplete="off"
            />
            ${autocompleteSuggestions.length ? `
              <ul class="autocomplete-dropdown" id="autocomplete-list" role="listbox">
                ${autocompleteSuggestions.map((item, idx) => `
                  <li
                    class="autocomplete-item ${idx === autocompleteHighlightIndex ? 'highlighted' : ''}"
                    role="option"
                    data-autocomplete-add="${esc(item.name)}"
                  >
                    <span>${esc(item.name)}</span>
                    <span class="autocomplete-category">${esc(item.category)}</span>
                  </li>
                `).join('')}
              </ul>
            ` : ''}
          </div>
          <button type="submit" class="button secondary add-btn">
            ${icon('plus')} Agregar
          </button>
        </form>

        <!-- Selección rápida, con los productos más usados a la vista -->
        <div class="quick-picks">
          <section class="quick-pick-section" aria-labelledby="common-drinks-title">
            <div class="quick-pick-heading">
              <span class="quick-pick-icon">${icon('bottle')}</span>
              <div><h2 id="common-drinks-title">Bebidas</h2><p>Los clásicos de la barra</p></div>
            </div>
            <div class="frequent-wrap">${COMMON_DRINKS.map(renderPickerChip).join('')}</div>
            <details class="more-catalog">
              <summary>Ver todas las bebidas</summary>
              <div class="more-catalog-content">${renderMoreCatalog('bebidas', COMMON_DRINKS)}</div>
            </details>
          </section>

          <section class="quick-pick-section" aria-labelledby="common-ingredients-title">
            <div class="quick-pick-heading">
              <span class="quick-pick-icon">${icon('sparkles')}</span>
              <div><h2 id="common-ingredients-title">Ingredientes</h2><p>Mezcladores, frutas y básicos</p></div>
            </div>
            <div class="frequent-wrap">${COMMON_INGREDIENTS.map(renderPickerChip).join('')}</div>
            <details class="more-catalog">
              <summary>Ver todos los ingredientes</summary>
              <div class="more-catalog-content">${renderMoreCatalog('ingredientes', COMMON_INGREDIENTS)}</div>
            </details>
          </section>
        </div>

        <!-- Ingredientes Seleccionados (Etiquetas) -->
        <div class="selected-tags-box">
          <div class="selected-tags-head">
            <span class="section-subtitle">
              Seleccionados (${selectedIngredients.length})
            </span>
            ${selectedIngredients.length ? `
              <button type="button" class="text-button" data-action="clear-all">
                Limpiar todos
              </button>
            ` : ''}
          </div>
          <div class="tags-list">
            ${selectedIngredients.length ? selectedIngredients.map((ing) => `
              <span class="ingredient-tag">
                <span>${esc(ing)}</span>
                <button
                  type="button"
                  class="tag-remove"
                  data-remove-ingredient="${esc(ing)}"
                  aria-label="Eliminar ${esc(ing)}"
                >×</button>
              </span>
            `).join('') : `
              <p class="empty-tags-hint">
                Todavía no agregaste ingredientes. Tocá las opciones de arriba o escribí en el buscador.
              </p>
            `}
          </div>
        </div>

        <!-- Botón Buscar tragos -->
        <div class="search-actions">
          <button
            type="button"
            class="button primary main-search-btn"
            data-action="search"
            ${!selectedIngredients.length ? 'disabled' : ''}
          >
            ${icon('sparkles')}
            ${selectedIngredients.length ? `Buscar tragos (${selectedIngredients.length} ingredientes)` : 'Buscar tragos'}
          </button>
          ${isChangedSinceSearch ? `
            <small style="color:var(--gold); text-align:center; font-size:12px;">
              Modificaste tus ingredientes. Tocá "Buscar tragos" para actualizar los resultados.
            </small>
          ` : ''}
        </div>
      </section>

      <!-- Resultados / Estados -->
      <section class="results-area" aria-live="polite">
        ${renderResultsState()}
      </section>
    </main>
  `;
}

function renderResultsState() {
  if (searchState.status === 'loading') {
    return `
      <div class="loading-box">
        <div class="spinner"></div>
        <p>Buscando cócteles con tus ingredientes en 24cocktails...</p>
      </div>
    `;
  }

  if (searchState.status === 'error') {
    return `
      <div class="empty">
        <div class="empty-icon">${icon('alert')}</div>
        <h3>No se pudo cargar la información</h3>
        <p>${esc(searchState.error || 'Ocurrió un error al consultar las recetas.')}</p>
        <button type="button" class="button secondary" data-action="search">
          Reintentar búsqueda
        </button>
      </div>
    `;
  }

  if (searchState.status === 'idle') {
    return '';
  }

  if (searchState.status === 'success' && searchState.data) {
    const rawCanMake = searchState.data.can_make?.results || [];
    const rawOneAway = searchState.data.one_away?.results || [];

    if (!rawCanMake.length && !rawOneAway.length) {
      return `
        <div class="empty">
          <div class="empty-icon">${icon('bottle')}</div>
          <h3>No encontramos tragos con esta combinación</h3>
          <p>Probá sumando otros licores, jugos o mezcladores a tu selección de barra.</p>
        </div>
      `;
    }

    const missingCounts = {};
    for (const d of rawOneAway) {
      const names = d.missingIngredients?.map((item) => typeof item === 'string' ? item : item.name).filter(Boolean)
        || (d.missing?.name ? [d.missing.name] : []);
      names.forEach((name) => { missingCounts[name] = (missingCounts[name] || 0) + 1; });
    }
    const sortedMissing = Object.entries(missingCounts).sort((a, b) => b[1] - a[1]);

    const filteredCanMake = filterDrinksList(rawCanMake);
    const filteredOneAway = filterDrinksList(rawOneAway);

    return `
      <!-- Pestañas de Resultados -->
      <nav class="results-tabs" role="tablist" aria-label="Tipos de resultados">
        <button
          type="button"
          class="results-tab ready-tab ${resultsActiveTab === 'can_make' ? 'active' : ''}"
          role="tab"
          aria-selected="${resultsActiveTab === 'can_make'}"
          data-results-tab="can_make"
        >
          <span>✓ Podés preparar</span>
          <small>${rawCanMake.length}</small>
        </button>
        <button
          type="button"
          class="results-tab missing-tab ${resultsActiveTab === 'one_away' ? 'active' : ''}"
          role="tab"
          aria-selected="${resultsActiveTab === 'one_away'}"
          data-results-tab="one_away"
        >
          <span>✕ Aún no podés preparar</span>
          <small>${rawOneAway.length}</small>
        </button>
      </nav>

      <!-- Barra de Filtros secundarios -->
      <div class="results-filter-bar">
        <div class="filter-group">
          <div class="drink-search-wrap">
            ${icon('search')}
            <input
              type="text"
              class="drink-search-input"
              id="drink-search-input"
              placeholder="Filtrar por nombre o ingrediente..."
              value="${esc(filterQuery)}"
            />
          </div>

          <select class="filter-select" id="base-filter-select" aria-label="Filtrar por bebida base">
            <option value="all" ${filterBase === 'all' ? 'selected' : ''}>Todas las bases</option>
            <option value="gin" ${filterBase === 'gin' ? 'selected' : ''}>Gin</option>
            <option value="vodka" ${filterBase === 'vodka' ? 'selected' : ''}>Vodka</option>
            <option value="rum" ${filterBase === 'rum' ? 'selected' : ''}>Ron</option>
            <option value="whiskey" ${filterBase === 'whiskey' ? 'selected' : ''}>Whisky</option>
            <option value="tequila" ${filterBase === 'tequila' ? 'selected' : ''}>Tequila</option>
            <option value="brandy" ${filterBase === 'brandy' ? 'selected' : ''}>Brandy / Coñac</option>
            <option value="other" ${filterBase === 'other' ? 'selected' : ''}>Otras / Aperitivos</option>
          </select>
        </div>

        ${resultsActiveTab === 'one_away' && sortedMissing.length ? `
          <select class="filter-select" id="missing-filter-select" aria-label="Filtrar por lo que te falta">
            <option value="all" ${filterMissing === 'all' ? 'selected' : ''}>Cualquier faltante</option>
            ${sortedMissing.slice(0, 15).map(([name, count]) => `
              <option value="${esc(name)}" ${filterMissing === name ? 'selected' : ''}>
                Falta: ${esc(name)} (${count})
              </option>
            `).join('')}
          </select>
        ` : ''}
      </div>

      <!-- Contenido de la pestaña activa -->
      ${resultsActiveTab === 'can_make' ? `
        ${filteredCanMake.length ? `
          <div class="drink-grid">
            ${filteredCanMake.map(renderCanMakeCard).join('')}
          </div>
        ` : `
          <div class="empty">
            <p style="margin:0; color:var(--muted);">
              ${rawCanMake.length ? 'Ningún trago coincide con los filtros aplicados.' : 'No encontramos cócteles que puedas preparar con estos ingredientes. Revisá “Aún no podés preparar” para ver qué te falta.'}
            </p>
          </div>
        `}
      ` : `
        ${sortedMissing.length > 1 ? `
          <div class="missing-filter-scroll" role="group" aria-label="Filtro rápido de faltantes">
            <button
              type="button"
              class="missing-filter-chip ${filterMissing === 'all' ? 'active' : ''}"
              data-set-missing-filter="all"
            >
              Todos los faltantes
            </button>
            ${sortedMissing.slice(0, 8).map(([name, count]) => `
              <button
                type="button"
                class="missing-filter-chip ${filterMissing === name ? 'active' : ''}"
                data-set-missing-filter="${esc(name)}"
              >
                ${esc(name)} (${count})
              </button>
            `).join('')}
          </div>
        ` : ''}

        ${filteredOneAway.length ? `
          <div class="drink-grid">
            ${filteredOneAway.map(renderOneAwayCard).join('')}
          </div>
        ` : `
          <div class="empty">
            <p style="margin:0; color:var(--muted);">
              Ningún trago coincide con los filtros aplicados.
            </p>
          </div>
        `}
      `}
    `;
  }

  return '';
}

function renderCanMakeCard(drink) {
  const photoUrl = drink.photo || '';
  const abv = drink.abv !== undefined && drink.abv !== null ? `${drink.abv}% alc.` : null;
  const prep = drink.prep_minutes ? `${drink.prep_minutes} min` : null;
  const isFav = isFavorite(drink.slug);

  // Analizar ingredientes: priorizar los que tengo
  const analyzed = analyzeDrinkIngredients(drink);
  const total = analyzed.length;
  const owned = analyzed.filter((i) => i.owned).length;

  return `
    <article
      class="drink-card ready-card"
      data-open-slug="${esc(drink.slug)}"
      role="button"
      tabindex="0"
      aria-label="Ver receta de ${esc(drink.name)}"
    >
      <div class="card-photo">
        ${photoUrl ? `
          <img
            src="${esc(photoUrl)}"
            alt="${esc(drink.name)}"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="placeholder" style="display:none;">
            ${icon('bottle')}
            <span>${esc(drink.name)}</span>
          </div>
        ` : `
          <div class="placeholder">
            ${icon('bottle')}
            <span>${esc(drink.name)}</span>
          </div>
        `}

        <!-- Botón Favorito -->
        <button
          type="button"
          class="card-fav-btn ${isFav ? 'favorited' : ''}"
          data-toggle-fav="${esc(drink.slug)}"
          aria-label="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
          title="${isFav ? 'En favoritos' : 'Guardar en favoritos'}"
        >
          ${isFav ? icon('heartFilled') : icon('heart')}
        </button>

        ${abv ? `<span class="photo-category">${esc(abv)}</span>` : ''}
        ${prep ? `
          <span class="photo-time">
            ${icon('clock')}
            <span>${esc(prep)}</span>
          </span>
        ` : ''}
      </div>

      <div class="card-copy">
        <div class="card-readiness is-ready"><span aria-hidden="true">✓</span> Podés prepararlo ahora</div>
        <h3>${esc(drink.name)}</h3>

        <!-- Lista visual de ingredientes: priorizando los que tengo -->
        <div class="card-ingredients-container">
          <div class="card-match-bar">
            <span class="match-text full-match">✓ Tenés todos (${owned}/${total})</span>
          </div>
          <div class="card-ingredients-chips">
            ${analyzed.map((item) => `
              <span class="ing-badge owned">
                <span class="ing-icon">✓</span>
                <span class="ing-name">${esc(item.name)}</span>
              </span>
            `).join('')}
          </div>
        </div>

        <div class="card-footer">
          <span class="card-link">Ver receta completa →</span>
        </div>
      </div>
    </article>
  `;
}

function renderOneAwayCard(drink) {
  const photoUrl = drink.photo || '';
  const prep = drink.prep_minutes ? `${drink.prep_minutes} min` : null;
  const missingNames = (drink.missingIngredients || []).map((item) => typeof item === 'string' ? item : item.name).filter(Boolean);
  const missingName = drink.missing?.name || missingNames[0] || 'un ingrediente';
  const missingCountLabel = missingNames.length === 1 ? 'Falta 1 ingrediente' : `Faltan ${missingNames.length || 1} ingredientes`;
  const isFav = isFavorite(drink.slug);

  // Analizar ingredientes: priorizar los que tengo
  const analyzed = drink.verified ? analyzeDrinkIngredients(drink) : [];
  const total = analyzed.length;
  const owned = analyzed.filter((i) => i.owned).length;

  return `
    <article
      class="drink-card incomplete-card"
      data-open-slug="${esc(drink.slug)}"
      role="button"
      tabindex="0"
      aria-label="Ver receta de ${esc(drink.name)}"
    >
      <div class="card-photo">
        ${photoUrl ? `
          <img
            src="${esc(photoUrl)}"
            alt="${esc(drink.name)}"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="placeholder" style="display:none;">
            ${icon('bottle')}
            <span>${esc(drink.name)}</span>
          </div>
        ` : `
          <div class="placeholder">
            ${icon('bottle')}
            <span>${esc(drink.name)}</span>
          </div>
        `}

        <!-- Botón Favorito -->
        <button
          type="button"
          class="card-fav-btn ${isFav ? 'favorited' : ''}"
          data-toggle-fav="${esc(drink.slug)}"
          aria-label="${isFav ? 'Quitar de favoritos' : 'Agregar a favoritos'}"
          title="${isFav ? 'En favoritos' : 'Guardar en favoritos'}"
        >
          ${isFav ? icon('heartFilled') : icon('heart')}
        </button>

        <span class="photo-category ${drink.verificationError ? 'unverified-badge' : 'missing-badge'}">
          ${drink.verificationError ? 'No verificado' : missingCountLabel}
        </span>
        ${prep ? `
          <span class="photo-time">
            ${icon('clock')}
            <span>${esc(prep)}</span>
          </span>
        ` : ''}
      </div>

      <div class="card-copy">
        <div class="card-readiness ${drink.verificationError ? 'is-unverified' : 'is-missing'}">
          <span aria-hidden="true">${drink.verificationError ? '?' : '✕'}</span>
          ${drink.verificationError ? 'No pudimos verificar esta receta' : 'Todavía no podés prepararlo'}
        </div>
        <h3>${esc(drink.name)}</h3>

        <!-- Lista visual de ingredientes: priorizando los que tengo -->
        <div class="card-ingredients-container">
          <div class="card-match-bar">
            <span class="match-text ${drink.verificationError ? 'unverified-match' : 'partial-match'}">
              ${drink.verificationError ? 'No se pudo comprobar la lista de ingredientes' : `Tenés ${owned} de ${total} ingredientes`}
            </span>
          </div>
          <div class="card-ingredients-chips">
            ${analyzed.map((item) => `
              <span class="ing-badge ${item.owned ? 'owned' : 'missing'}">
                <span class="ing-icon">${item.owned ? '✓' : '✕'}</span>
                <span class="ing-name">${esc(item.name)}</span>
              </span>
            `).join('')}
          </div>
        </div>

        <div class="missing-info ${drink.verificationError ? 'unverified-info' : ''}">
          ${drink.verificationError ? `
            <strong>No pudimos verificar los ingredientes</strong>
            <span class="missing-help">Abrí la receta para revisar su lista completa.</span>
          ` : `
            <strong>${missingNames.length > 1 ? 'Te faltan para prepararlo' : 'Te falta para prepararlo'}</strong>
            <div class="missing-items-list">
              ${missingNames.map((name) => `
                <div class="missing-row">
                  <span class="missing-item-name">${esc(name)}</span>
                  <button type="button" class="add-missing-btn" data-add-missing="${esc(name)}"
                    title="Agregar ${esc(name)} a mis ingredientes">+ Tengo esto</button>
                </div>
              `).join('') || `<span class="missing-item-name">${esc(missingName)}</span>`}
            </div>
          `}
        </div>

        <div class="card-footer">
          <span class="card-link">Ver receta →</span>
        </div>
      </div>
    </article>
  `;
}

// ----------------------------------------------------
// VISTA: FAVORITOS & BITÁCORA PERSONAL
// ----------------------------------------------------

function renderFavoritesView() {
  let list = [...favorites];

  // Filtro de favoritos
  if (favFilter === 'liked') {
    list = list.filter((f) => f.liked === true);
  } else if (favFilter === 'disliked') {
    list = list.filter((f) => f.liked === false);
  } else if (favFilter === 'ready') {
    list = list.filter((f) => {
      const analyzed = analyzeDrinkIngredients(f);
      return analyzed.length > 0 && analyzed.every((i) => i.owned);
    });
  }

  return `
    <main class="favorites-view">
      <section class="catalog-heading fav-header">
        <span class="overline">MI BITÁCORA PERSONAL</span>
        <h1>Tragos Favoritos</h1>
        <p class="catalog-lead">
          Los cócteles que guardaste, tus calificaciones personales y si podés prepararlos con lo que tenés en tu barra hoy.
        </p>

        <!-- Filtros de favoritos -->
        <div class="fav-filter-tabs" role="tablist">
          <button
            type="button"
            class="category-tab ${favFilter === 'all' ? 'active' : ''}"
            data-set-fav-filter="all"
          >
            Todos (${favorites.length})
          </button>
          <button
            type="button"
            class="category-tab ${favFilter === 'liked' ? 'active' : ''}"
            data-set-fav-filter="liked"
          >
            👍 Me gustaron (${favorites.filter((f) => f.liked === true).length})
          </button>
          <button
            type="button"
            class="category-tab ${favFilter === 'disliked' ? 'active' : ''}"
            data-set-fav-filter="disliked"
          >
            👎 No repetiría (${favorites.filter((f) => f.liked === false).length})
          </button>
          <button
            type="button"
            class="category-tab ${favFilter === 'ready' ? 'active' : ''}"
            data-set-fav-filter="ready"
          >
            ✓ Listos para preparar hoy
          </button>
        </div>
      </section>

      ${list.length ? `
        <div class="drink-grid">
          ${list.map(renderFavoriteCard).join('')}
        </div>
      ` : `
        <div class="empty">
          <div class="empty-icon">${icon('heart')}</div>
          <h3>${favorites.length ? 'Ningún cóctel coincide con este filtro' : 'Todavía no guardaste ningún trago'}</h3>
          <p>
            ${favorites.length
              ? 'Probá seleccionando "Todos" para ver tu colección.'
              : 'Explorá los tragos recomendados en "Mi Barra" y tocale el corazón a los que más te gusten para puntuarlos y guardarlos.'}
          </p>
          ${!favorites.length ? `
            <button type="button" class="button primary" data-nav="search">
              Explorar tragos
            </button>
          ` : ''}
        </div>
      `}
    </main>
  `;
}

function renderFavoriteCard(drink) {
  const photoUrl = drink.photo || '';
  const abv = drink.abv !== undefined && drink.abv !== null ? `${drink.abv}% alc.` : null;
  const analyzed = analyzeDrinkIngredients(drink);
  const isReady = analyzed.length > 0 && analyzed.every((i) => i.owned);

  return `
    <article
      class="drink-card"
      data-open-slug="${esc(drink.slug)}"
      role="button"
      tabindex="0"
      aria-label="Ver receta de ${esc(drink.name)}"
    >
      <div class="card-photo">
        ${photoUrl ? `
          <img
            src="${esc(photoUrl)}"
            alt="${esc(drink.name)}"
            loading="lazy"
            onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
          />
          <div class="placeholder" style="display:none;">
            ${icon('bottle')}
            <span>${esc(drink.name)}</span>
          </div>
        ` : `
          <div class="placeholder">
            ${icon('bottle')}
            <span>${esc(drink.name)}</span>
          </div>
        `}

        <button
          type="button"
          class="card-fav-btn favorited"
          data-toggle-fav="${esc(drink.slug)}"
          title="Quitar de favoritos"
        >
          ${icon('heartFilled')}
        </button>

        ${abv ? `<span class="photo-category">${esc(abv)}</span>` : ''}
      </div>

      <div class="card-copy">
        <h3>${esc(drink.name)}</h3>

        <!-- Disponibilidad actual en la barra -->
        <span class="readiness-pill ${isReady ? 'ready' : 'not-ready'}">
          ${isReady ? '✓ Podés prepararlo hoy' : '✕ Faltan ingredientes'}
        </span>

        <!-- Reseña del usuario -->
        <div class="fav-card-review">
          <div class="fav-stars-row">
            <div class="fav-stars" aria-label="Calificación: ${drink.score} estrellas">
              ${[1, 2, 3, 4, 5].map((s) => (s <= (drink.score || 0) ? '★' : '☆')).join('')}
            </div>
            ${drink.liked === true ? `
              <span class="fav-opinion-badge like">👍 Me gustó</span>
            ` : drink.liked === false ? `
              <span class="fav-opinion-badge dislike">👎 No repetiría</span>
            ` : '<span style="color:var(--muted); font-size:11px;">Sin nota</span>'}
          </div>
          ${drink.notes ? `
            <p class="fav-user-note">“${esc(drink.notes)}”</p>
          ` : ''}
        </div>

        <div class="card-footer">
          <span class="card-link">Ver receta y calificar →</span>
        </div>
      </div>
    </article>
  `;
}

// ----------------------------------------------------
// VISTA: DETALLE DE TRAGO & CALIFICACIÓN
// ----------------------------------------------------

function renderDetail() {
  const basic = screen.selectedBasic || {};
  const full = screen.fullRecipe || {};
  const slug = screen.selectedSlug;
  const name = full.name || basic.name || 'Detalle del trago';
  const photo = full.photo || basic.photo || '';
  const abv = full.abv !== undefined && full.abv !== null ? full.abv : basic.abv;
  const prep = full.prep_minutes || basic.prep_minutes;
  const glass = full.glass || basic.glass;
  const base = full.base || basic.base;
  const method = full.method || basic.method;
  const ice = full.ice;
  const garnish = full.garnish;
  const description = full.description || '';
  const url = full.url || basic.url || '';

  const isFav = isFavorite(slug);
  const currentFav = getFavorite(slug);

  // Analizar ingredientes para saber cuáles tenés y cuáles faltan
  const analyzedBasic = analyzeDrinkIngredients(basic);

  // Lista detallada de ingredientes
  let ingredientsHtml = '';
  if (Array.isArray(full.ingredients) && full.ingredients.length) {
    // Si tenemos la receta completa con medidas
    const detailedAnalyzed = full.ingredients.map((ing) => {
      const match = analyzedBasic.find((b) => b.name.toLowerCase().includes(ing.name.toLowerCase()) || ing.name.toLowerCase().includes(b.name.toLowerCase()));
      const owned = match ? match.owned : selectedIngredients.some((sel) => ing.name.toLowerCase().includes(sel.toLowerCase()));
      return { ...ing, owned };
    });

    // Priorizar los que tengo
    detailedAnalyzed.sort((a, b) => (b.owned ? 1 : 0) - (a.owned ? 1 : 0));

    ingredientsHtml = `
      <ul class="recipe-ingredients-list">
        ${detailedAnalyzed.map((ing) => `
          <li class="ingredient-row ${ing.owned ? 'owned' : 'missing'}">
            <span class="ingredient-qty">${esc(ing.amount || 'Al gusto')}</span>
            <span class="ingredient-name">
              <span>${esc(ing.name)}${ing.optional ? ' <small>(opcional)</small>' : ''}</span>
              ${ing.owned ? `
                <span class="ing-status-tag owned">✓ Tenés</span>
              ` : `
                <span class="ing-status-tag missing">✕ Te falta</span>
                <button
                  type="button"
                  class="add-missing-btn"
                  data-add-missing="${esc(ing.name)}"
                  title="Sumar a mis ingredientes"
                >+ Tengo esto</button>
              `}
            </span>
          </li>
        `).join('')}
      </ul>
    `;
  } else if (analyzedBasic.length) {
    ingredientsHtml = `
      <ul class="recipe-ingredients-list">
        ${analyzedBasic.map((ing) => `
          <li class="ingredient-row ${ing.owned ? 'owned' : 'missing'}">
            <span class="ingredient-qty">•</span>
            <span class="ingredient-name">
              <span>${esc(ing.name)}</span>
              ${ing.owned ? `
                <span class="ing-status-tag owned">✓ Tenés</span>
              ` : `
                <span class="ing-status-tag missing">✕ Te falta</span>
                <button
                  type="button"
                  class="add-missing-btn"
                  data-add-missing="${esc(ing.name)}"
                  title="Sumar a mis ingredientes"
                >+ Tengo esto</button>
              `}
            </span>
          </li>
        `).join('')}
      </ul>
      ${screen.recipeLoading ? `
        <div style="margin-top: 12px; font-size: 13px; color: var(--muted); display:flex; align-items:center; gap:8px;">
          <div class="spinner-small"></div>
          <span>Cargando medidas exactas...</span>
        </div>
      ` : ''}
    `;
  } else {
    ingredientsHtml = `<p style="color:var(--muted); font-size:14px;">Ingredientes no disponibles.</p>`;
  }

  // Pasos de preparación
  let stepsHtml = '';
  if (Array.isArray(full.steps) && full.steps.length) {
    stepsHtml = `
      <ol class="recipe-steps-list">
        ${full.steps.map((step) => `<li>${esc(step)}</li>`).join('')}
      </ol>
    `;
  } else if (screen.recipeLoading) {
    stepsHtml = `
      <div style="display:flex; align-items:center; gap:8px; color:var(--muted); font-size:14px;">
        <div class="spinner-small"></div>
        <span>Cargando instrucciones de preparación...</span>
      </div>
    `;
  } else {
    stepsHtml = `<p style="color:var(--muted); font-size:14px;">Instrucciones no detalladas en la API.</p>`;
  }

  return `
    <main class="detail">
      <button class="back" data-action="back-home">
        ${icon('back')} Volver
      </button>

      <section class="detail-hero">
        <div class="detail-photo">
          ${photo ? `
            <img src="${esc(photo)}" alt="${esc(name)}" />
          ` : `
            <div class="placeholder">
              ${icon('bottle')}
              <span>Sin foto</span>
            </div>
          `}
        </div>

        <div class="detail-info">
          <span class="overline">${base ? `BASE: ${esc(base.toUpperCase())}` : 'CÓCTEL'}</span>
          <h1>${esc(name)}</h1>
          ${description ? `<p class="recipe-desc">${esc(description)}</p>` : ''}

          <div class="facts">
            ${abv !== undefined && abv !== null ? `<span>${esc(abv)}% alc.</span>` : ''}
            ${prep ? `<span>${esc(prep)} min</span>` : ''}
            ${glass ? `<span>Vaso: ${esc(glass)}</span>` : ''}
            ${method ? `<span>Método: ${esc(method)}</span>` : ''}
            ${ice ? `<span>Hielo: ${esc(ice)}</span>` : ''}
            ${garnish ? `<span>Decoración: ${esc(garnish)}</span>` : ''}
          </div>

          <div class="recipe-actions">
            <!-- Botón Favorito en Hero -->
            <button
              type="button"
              class="button secondary fav-action-btn ${isFav ? 'is-fav' : ''}"
              data-toggle-fav="${esc(slug)}"
            >
              ${isFav ? icon('heartFilled') : icon('heart')}
              <span>${isFav ? 'En Favoritos' : 'Guardar en Favoritos'}</span>
            </button>

            ${url ? `
              <a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="button secondary">
                ${icon('external')} Ver en 24cocktails.com
              </a>
            ` : ''}
          </div>
        </div>
      </section>

      <!-- Widget de Calificación y Notas -->
      <section class="rating-card" id="rating-section">
        <h3>¿Probaste este cóctel? Calificalo</h3>
        <p class="rating-desc">Guardá si te gustó, tu puntuación y notas personales sobre su sabor o preparación.</p>

        <form id="rating-form" data-rating-slug="${esc(slug)}">
          <div class="opinion-selector">
            <button
              type="button"
              class="opinion-btn like ${currentFav?.liked === true ? 'active' : ''}"
              data-set-opinion="like"
            >
              ${icon('thumbUp')} Me gustó
            </button>
            <button
              type="button"
              class="opinion-btn dislike ${currentFav?.liked === false ? 'active' : ''}"
              data-set-opinion="dislike"
            >
              ${icon('thumbDown')} No me gustó
            </button>
          </div>

          <div class="stars-selector-wrap" style="margin-top: 14px;">
            <span class="stars-label">Puntuación:</span>
            <div class="stars-selector" role="radiogroup" aria-label="Calificación de 1 a 5 estrellas">
              ${[1, 2, 3, 4, 5].map((val) => `
                <button
                  type="button"
                  class="star-btn ${(currentFav?.score || 0) >= val ? 'filled' : ''}"
                  data-star-val="${val}"
                  aria-label="${val} estrellas"
                >
                  ${(currentFav?.score || 0) >= val ? icon('starFilled') : icon('star')}
                </button>
              `).join('')}
            </div>
          </div>

          <div style="margin-top: 14px;">
            <textarea
              class="notes-input"
              id="rating-notes"
              placeholder="Notas personales (ej. aroma, ocasiones, con qué marca de licor queda mejor...)"
              maxlength="500"
            >${esc(currentFav?.notes || '')}</textarea>
          </div>

          <div style="margin-top: 14px; display:flex; justify-content: flex-end;">
            <button type="submit" class="button primary">
              Guardar calificación
            </button>
          </div>
        </form>
      </section>

      <!-- Ingredientes y Preparación -->
      <section class="detail-content">
        <div class="detail-block">
          <h2>Ingredientes</h2>
          ${ingredientsHtml}
        </div>

        <div class="detail-block">
          <h2>Preparación</h2>
          ${stepsHtml}
          ${url ? `
            <div class="recipe-attribution">
              <small>Receta verificada de coctelería internacional provista por 24cocktails.com</small>
            </div>
          ` : ''}
        </div>
      </section>
    </main>
  `;
}

// ----------------------------------------------------
// EVENT LISTENERS
// ----------------------------------------------------

let tempLiked = null;
let tempScore = 0;

app.addEventListener('click', (event) => {
  // Cambio de navegación principal (Mi Barra vs Favoritos)
  const navBtn = event.target.closest('[data-nav]');
  if (navBtn) {
    activeMainView = navBtn.dataset.nav;
    screen.page = 'home';
    render();
    return;
  }

  // Filtro dentro de Favoritos
  const favFilterBtn = event.target.closest('[data-set-fav-filter]');
  if (favFilterBtn) {
    favFilter = favFilterBtn.dataset.setFavFilter;
    render();
    return;
  }

  // Botón corazón para favoritos (toggle)
  const favBtn = event.target.closest('[data-toggle-fav]');
  if (favBtn) {
    event.stopPropagation();
    const slug = favBtn.dataset.toggleFav;
    const drink = currentDrinksMap.get(slug) || screen.fullRecipe || screen.selectedBasic;
    if (drink) {
      toggleFavorite(drink);
    }
    return;
  }

  // Botón "+ Tengo esto" para sumar ingrediente faltante
  const addMissingBtn = event.target.closest('[data-add-missing]');
  if (addMissingBtn) {
    event.stopPropagation();
    const missingName = addMissingBtn.dataset.addMissing;
    notify(`¡Sumaste "${missingName}" a tu barra!`);
    addIngredient(missingName, true);
    return;
  }

  // Selección de opinión en el formulario de calificación
  const opinionBtn = event.target.closest('[data-set-opinion]');
  if (opinionBtn) {
    const isLike = opinionBtn.dataset.setOpinion === 'like';
    tempLiked = isLike;
    document.querySelectorAll('.opinion-btn').forEach((btn) => {
      btn.classList.toggle('active', btn === opinionBtn);
    });
    return;
  }

  // Selección de estrellas en el formulario de calificación
  const starBtn = event.target.closest('[data-star-val]');
  if (starBtn) {
    tempScore = Number(starBtn.dataset.starVal);
    document.querySelectorAll('.star-btn').forEach((btn) => {
      const val = Number(btn.dataset.starVal);
      btn.classList.toggle('filled', val <= tempScore);
      btn.innerHTML = val <= tempScore ? icon('starFilled') : icon('star');
    });
    return;
  }

  // Click en sugerencia de autocompletado
  const autocompleteTarget = event.target.closest('[data-autocomplete-add]');
  if (autocompleteTarget) {
    addIngredient(autocompleteTarget.dataset.autocompleteAdd);
    const input = document.querySelector('#ingredient-input');
    if (input) input.value = '';
    return;
  }

  // Cambiar entre tragos listos y recetas que todavía tienen faltantes
  const resultsTab = event.target.closest('[data-results-tab]');
  if (resultsTab) {
    resultsActiveTab = resultsTab.dataset.resultsTab;
    render();
    return;
  }

  // Click en filtro rápido de ingrediente faltante
  const missingChip = event.target.closest('[data-set-missing-filter]');
  if (missingChip) {
    filterMissing = missingChip.dataset.setMissingFilter;
    render();
    return;
  }

  const target = event.target.closest(
    '[data-action], [data-toggle-frequent], [data-remove-ingredient], [data-open-slug]'
  );
  if (!target) {
    if (autocompleteSuggestions.length) {
      autocompleteSuggestions = [];
      autocompleteHighlightIndex = -1;
      render();
    }
    return;
  }

  if (target.dataset.openSlug) {
    const slug = target.dataset.openSlug;
    const fav = getFavorite(slug);
    tempLiked = fav ? fav.liked : null;
    tempScore = fav ? fav.score : 0;
    openRecipeDetail(slug);
    return;
  }

  if (target.dataset.toggleFrequent) {
    toggleFrequent(target.dataset.toggleFrequent);
    return;
  }

  if (target.dataset.removeIngredient) {
    removeIngredient(target.dataset.removeIngredient);
    return;
  }

  switch (target.dataset.action) {
    case 'home':
    case 'back-home':
      screen.page = 'home';
      screen.selectedSlug = null;
      render();
      break;
    case 'search':
      searchCocktails();
      break;
    case 'clear-all':
      clearAllIngredients();
      break;
  }
});

app.addEventListener('input', (event) => {
  // Input del buscador de ingredientes (Autocompletado)
  if (event.target.id === 'ingredient-input') {
    const val = event.target.value.trim().toLowerCase();
    if (val.length >= 2) {
      autocompleteSuggestions = AUTOCOMPLETE_INDEX.filter((item) =>
        item.name.toLowerCase().includes(val) &&
        !selectedIngredients.some((sel) => sel.toLowerCase() === item.name.toLowerCase())
      ).slice(0, 6);
    } else {
      autocompleteSuggestions = [];
    }
    autocompleteHighlightIndex = -1;

    const dropdown = document.querySelector('#autocomplete-list');
    if (autocompleteSuggestions.length) {
      if (!dropdown) {
        render();
        const input = document.querySelector('#ingredient-input');
        if (input) {
          input.focus();
          input.value = event.target.value;
        }
      } else {
        dropdown.innerHTML = autocompleteSuggestions.map((item, idx) => `
          <li
            class="autocomplete-item ${idx === autocompleteHighlightIndex ? 'highlighted' : ''}"
            role="option"
            data-autocomplete-add="${esc(item.name)}"
          >
            <span>${esc(item.name)}</span>
            <span class="autocomplete-category">${esc(item.category)}</span>
          </li>
        `).join('');
      }
    } else if (dropdown) {
      dropdown.remove();
    }
    return;
  }

  // Input de búsqueda en resultados
  if (event.target.id === 'drink-search-input') {
    filterQuery = event.target.value;
    const cursor = event.target.selectionStart;
    render();
    const input = document.querySelector('#drink-search-input');
    if (input) {
      input.focus();
      input.setSelectionRange(cursor, cursor);
    }
  }
});

app.addEventListener('submit', (event) => {
  // Submit de nuevo ingrediente
  if (event.target.id === 'add-ingredient-form') {
    event.preventDefault();
    const input = document.querySelector('#ingredient-input');
    if (!input) return;
    const value = input.value.trim();
    if (value) {
      if (autocompleteHighlightIndex >= 0 && autocompleteSuggestions[autocompleteHighlightIndex]) {
        addIngredient(autocompleteSuggestions[autocompleteHighlightIndex].name);
      } else {
        addIngredient(value);
      }
      input.value = '';
      autocompleteSuggestions = [];
      autocompleteHighlightIndex = -1;
    }
    return;
  }

  // Submit de calificación y nota
  if (event.target.id === 'rating-form') {
    event.preventDefault();
    const slug = event.target.dataset.ratingSlug;
    const notesInput = document.querySelector('#rating-notes');
    const notes = notesInput ? notesInput.value.trim() : '';

    const currentFav = getFavorite(slug);
    const finalLiked = tempLiked !== null ? tempLiked : (currentFav ? currentFav.liked : null);
    const finalScore = tempScore > 0 ? tempScore : (currentFav ? currentFav.score : 0);

    saveDrinkRating(slug, {
      liked: finalLiked,
      score: finalScore,
      notes
    });
  }
});

app.addEventListener('change', (event) => {
  if (event.target.id === 'theme-select') {
    themePreference = event.target.value;
    try {
      localStorage.setItem(THEME_KEY, themePreference);
    } catch {}
    applyTheme();
    render();
    return;
  }

  if (event.target.id === 'base-filter-select') {
    filterBase = event.target.value;
    render();
    return;
  }

  if (event.target.id === 'missing-filter-select') {
    filterMissing = event.target.value;
    render();
    return;
  }
});

// Teclado para navegar sugerencias del autocompletado y accesibilidad
app.addEventListener('keydown', (event) => {
  const input = document.querySelector('#ingredient-input');
  if (input && document.activeElement === input && autocompleteSuggestions.length) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      autocompleteHighlightIndex = (autocompleteHighlightIndex + 1) % autocompleteSuggestions.length;
      updateAutocompleteHighlight();
      return;
    }
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      autocompleteHighlightIndex = (autocompleteHighlightIndex - 1 + autocompleteSuggestions.length) % autocompleteSuggestions.length;
      updateAutocompleteHighlight();
      return;
    }
    if (event.key === 'Escape') {
      autocompleteSuggestions = [];
      autocompleteHighlightIndex = -1;
      const dropdown = document.querySelector('#autocomplete-list');
      if (dropdown) dropdown.remove();
      return;
    }
  }

  if (event.key === 'Enter' || event.key === ' ') {
    const card = event.target.closest('.drink-card[data-open-slug]');
    if (card && event.target === card) {
      event.preventDefault();
      openRecipeDetail(card.dataset.openSlug);
    }
  }
});

function updateAutocompleteHighlight() {
  const items = document.querySelectorAll('.autocomplete-item');
  items.forEach((item, idx) => {
    item.classList.toggle('highlighted', idx === autocompleteHighlightIndex);
  });
}

matchMedia('(prefers-color-scheme: light)').addEventListener?.('change', () => {
  if (themePreference === 'system') applyTheme();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js?v=14').catch(() => {});
  });
}

// Initial render
render();
