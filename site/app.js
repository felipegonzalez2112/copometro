const THEME_KEY = 'chinchin.theme.v1';
const INGREDIENTS_KEY = 'chinchin.ingredients.v1';
const API_BASE = 'https://24cocktails.com/api/v1';

// Categorías del catálogo de ingredientes
const INGREDIENT_CATEGORIES = [
  { id: 'frecuentes', label: '⭐ Frecuentes' },
  { id: 'espirituosas', label: '🥃 Espirituosas' },
  { id: 'licores', label: '🍷 Licores & Aperitivos' },
  { id: 'mezcladores', label: '🥤 Mezcladores' },
  { id: 'frutas', label: '🍋 Frutas & Cítricos' },
  { id: 'basicos', label: '🌿 Básicos & Especias' }
];

const INGREDIENT_CATALOG = {
  frecuentes: [
    'Gin', 'Vodka', 'Ron', 'Whisky', 'Fernet', 'Tequila',
    'Lima', 'Limón', 'Naranja', 'Coca-Cola', 'Tónica', 'Soda'
  ],
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

// Índice plano para autocompletado rápido
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
  filter: '<svg viewBox="0 0 24 24"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/></svg>'
};

const app = document.querySelector('#app');

// Caches en memoria para evitar peticiones duplicadas
const searchCache = new Map();
const recipeCache = new Map();
let currentDrinksMap = new Map();

// Control de peticiones concurrentes
let activeSearchAbort = null;

// Estado principal de la aplicación
let themePreference = readThemePreference();
let selectedIngredients = loadSavedIngredients();
let activeCategoryTab = 'frecuentes';
let searchState = {
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  error: null,
  data: null,
  searchedKey: ''
};

// Filtros y pestañas dentro de los resultados
let resultsActiveTab = 'can_make'; // 'can_make' | 'one_away'
let filterBase = 'all'; // 'all' | 'gin' | 'vodka' | 'rum' | 'whiskey' | 'tequila' | 'other'
let filterMissing = 'all';
let filterQuery = '';

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
    return ['system', 'light', 'dark'].includes(saved) ? saved : 'system';
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
  document.querySelector('#theme-color')?.setAttribute('content', theme === 'light' ? '#f3f6f3' : '#101617');
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

  // Cancelar petición anterior si estuviera corriendo
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
    const data = await res.json();
    if (!data || !data.can_make || !data.one_away) {
      throw new Error('Estructura de respuesta inesperada');
    }

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
    // Filtro por base de alcohol
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

    // Filtro por ingrediente faltante (solo aplica en one_away)
    if (filterMissing !== 'all' && drink.missing) {
      const missingName = drink.missing.name || '';
      if (missingName !== filterMissing) {
        return false;
      }
    }

    // Filtro de texto por nombre o ingrediente
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
      <label class="theme-picker">
        <span>Tema</span>
        <select id="theme-select" aria-label="Apariencia de ChinChin">
          <option value="system" ${themePreference === 'system' ? 'selected' : ''}>Sistema</option>
          <option value="light" ${themePreference === 'light' ? 'selected' : ''}>Claro</option>
          <option value="dark" ${themePreference === 'dark' ? 'selected' : ''}>Oscuro</option>
        </select>
      </label>
    </header>
    ${notice ? `<div class="toast" role="status">${esc(notice)}</div>` : ''}
    ${screen.page === 'detail' ? renderDetail() : renderHome()}
    <footer class="footer">
      ChinChin · Recomendador de tragos · Datos por 24cocktails.com
    </footer>
  `;
}

function renderHome() {
  const currentCategoryItems = INGREDIENT_CATALOG[activeCategoryTab] || INGREDIENT_CATALOG.frecuentes;
  const isChangedSinceSearch = searchState.status === 'success' && searchState.searchedKey !== selectedIngredients.slice().sort().join(',').toLowerCase();

  return `
    <main class="home">
      <section class="catalog-heading">
        <span class="overline">¿QUÉ HAY EN TU BARRA?</span>
        <h1>Mis ingredientes</h1>
        <p class="catalog-lead">
          Elegí o buscá las bebidas e ingredientes que tenés disponibles. Te recomendaremos qué cócteles podés armar al instante.
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

        <!-- Explorador de Ingredientes por Categoría -->
        <div class="category-tabs-container">
          <div class="section-subtitle">Explorar por categoría</div>
          <div class="category-tabs" role="tablist" aria-label="Categorías de ingredientes">
            ${INGREDIENT_CATEGORIES.map((cat) => `
              <button
                type="button"
                class="category-tab ${activeCategoryTab === cat.id ? 'active' : ''}"
                role="tab"
                aria-selected="${activeCategoryTab === cat.id}"
                data-select-category="${cat.id}"
              >
                ${esc(cat.label)}
              </button>
            `).join('')}
          </div>

          <!-- Chips de la categoría activa -->
          <div class="frequent-wrap" role="group" aria-label="Ingredientes">
            ${currentCategoryItems.map((item) => {
              const isSelected = selectedIngredients.some(
                (selected) => selected.toLowerCase() === item.toLowerCase()
              );
              return `
                <button
                  type="button"
                  class="frequent-chip ${isSelected ? 'selected' : ''}"
                  data-toggle-frequent="${esc(item)}"
                  aria-pressed="${isSelected}"
                >
                  <span class="chip-icon">${isSelected ? '✓' : '+'}</span>
                  <span>${esc(item)}</span>
                </button>
              `;
            }).join('')}
          </div>
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

    // Calcular frecuencias de ingredientes faltantes para el filtro
    const missingCounts = {};
    for (const d of rawOneAway) {
      const name = d.missing?.name || 'Otro';
      missingCounts[name] = (missingCounts[name] || 0) + 1;
    }
    const sortedMissing = Object.entries(missingCounts).sort((a, b) => b[1] - a[1]);

    // Aplicar filtros a cada lista
    const filteredCanMake = filterDrinksList(rawCanMake);
    const filteredOneAway = filterDrinksList(rawOneAway);

    return `
      <!-- Pestañas de Resultados -->
      <nav class="results-tabs" role="tablist" aria-label="Tipos de resultados">
        <button
          type="button"
          class="results-tab ${resultsActiveTab === 'can_make' ? 'active' : ''}"
          role="tab"
          aria-selected="${resultsActiveTab === 'can_make'}"
          data-results-tab="can_make"
        >
          <span>Podés preparar</span>
          <small>${rawCanMake.length}</small>
        </button>
        <button
          type="button"
          class="results-tab ${resultsActiveTab === 'one_away' ? 'active' : ''}"
          role="tab"
          aria-selected="${resultsActiveTab === 'one_away'}"
          data-results-tab="one_away"
        >
          <span>Te falta 1 ingrediente</span>
          <small>${rawOneAway.length}</small>
        </button>
      </nav>

      <!-- Barra de Filtros secundarios (Base, Búsqueda, Faltante) -->
      <div class="results-filter-bar">
        <div class="filter-group">
          <!-- Búsqueda en resultados -->
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

          <!-- Filtro por Base Spirit -->
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
          <!-- Filtro por Ingrediente Faltante -->
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
              ${rawCanMake.length ? 'Ningún trago coincide con los filtros aplicados.' : 'No encontramos cócteles que puedas preparar con exactamente estos ingredientes. ¡Revisá la pestaña "Te falta 1 ingrediente" para ver cuáles podés desbloquear!'}
            </p>
          </div>
        `}
      ` : `
        <!-- Pestaña Te falta 1 ingrediente -->
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
  const ingredientsStr = Array.isArray(drink.ingredients) ? drink.ingredients.join(', ') : '';

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
        ${abv ? `<span class="photo-category">${esc(abv)}</span>` : ''}
        ${prep ? `
          <span class="photo-time">
            ${icon('clock')}
            <span>${esc(prep)}</span>
          </span>
        ` : ''}
      </div>
      <div class="card-copy">
        <h3>${esc(drink.name)}</h3>
        ${ingredientsStr ? `
          <p class="card-ingredients" title="${esc(ingredientsStr)}">
            ${esc(ingredientsStr)}
          </p>
        ` : ''}
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
  const missingName = drink.missing?.name || '1 ingrediente';

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
        <span class="photo-category missing-badge">Falta: ${esc(missingName)}</span>
        ${prep ? `
          <span class="photo-time">
            ${icon('clock')}
            <span>${esc(prep)}</span>
          </span>
        ` : ''}
      </div>
      <div class="card-copy">
        <h3>${esc(drink.name)}</h3>
        <div class="missing-info">
          <div class="missing-row">
            <strong>Te falta</strong>
            <button
              type="button"
              class="add-missing-btn"
              data-add-missing="${esc(missingName)}"
              title="Agregar ${esc(missingName)} a mis ingredientes"
            >
              + Tengo esto
            </button>
          </div>
          <span>${esc(missingName)}</span>
        </div>
        <div class="card-footer">
          <span class="card-link">Ver receta →</span>
        </div>
      </div>
    </article>
  `;
}

function renderDetail() {
  const basic = screen.selectedBasic || {};
  const full = screen.fullRecipe || {};
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

  // Lista detallada de ingredientes
  let ingredientsHtml = '';
  if (Array.isArray(full.ingredients) && full.ingredients.length) {
    ingredientsHtml = `
      <ul class="recipe-ingredients-list">
        ${full.ingredients.map((ing) => `
          <li class="ingredient-row">
            <span class="ingredient-qty">${esc(ing.amount || 'Al gusto')}</span>
            <span class="ingredient-name">
              ${esc(ing.name)}${ing.optional ? ' <small>(opcional)</small>' : ''}
            </span>
          </li>
        `).join('')}
      </ul>
    `;
  } else if (Array.isArray(basic.ingredients) && basic.ingredients.length) {
    ingredientsHtml = `
      <ul class="recipe-ingredients-list">
        ${basic.ingredients.map((ing) => `
          <li class="ingredient-row">
            <span class="ingredient-qty">•</span>
            <span class="ingredient-name">${esc(ing)}</span>
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
        ${icon('back')} Volver a resultados
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

          ${url ? `
            <div class="recipe-actions">
              <a href="${esc(url)}" target="_blank" rel="noopener noreferrer" class="button secondary">
                ${icon('external')} Ver receta en 24cocktails.com
              </a>
            </div>
          ` : ''}
        </div>
      </section>

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

app.addEventListener('click', (event) => {
  // Manejo de "Tengo esto" para sumar ingrediente faltante directamente
  const addMissingBtn = event.target.closest('[data-add-missing]');
  if (addMissingBtn) {
    event.stopPropagation();
    const missingName = addMissingBtn.dataset.addMissing;
    notify(`¡Sumaste "${missingName}" a tu barra!`);
    addIngredient(missingName, true);
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

  // Click en pestaña de categoría de ingredientes
  const catTab = event.target.closest('[data-select-category]');
  if (catTab) {
    activeCategoryTab = catTab.dataset.selectCategory;
    render();
    return;
  }

  // Click en pestaña de resultados ("Podés preparar" vs "Te falta 1 ingrediente")
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
    // Si hace click fuera del autocomplete, cerrarlo
    if (autocompleteSuggestions.length) {
      autocompleteSuggestions = [];
      autocompleteHighlightIndex = -1;
      render();
    }
    return;
  }

  if (target.dataset.openSlug) {
    openRecipeDetail(target.dataset.openSlug);
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

    // Actualizar solo el contenedor del dropdown si existe para no perder foco
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
  if (event.target.id === 'add-ingredient-form') {
    event.preventDefault();
    const input = document.querySelector('#ingredient-input');
    if (!input) return;
    const value = input.value.trim();
    if (value) {
      // Si había una sugerencia resaltada con teclado
      if (autocompleteHighlightIndex >= 0 && autocompleteSuggestions[autocompleteHighlightIndex]) {
        addIngredient(autocompleteSuggestions[autocompleteHighlightIndex].name);
      } else {
        addIngredient(value);
      }
      input.value = '';
      autocompleteSuggestions = [];
      autocompleteHighlightIndex = -1;
    }
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
    navigator.serviceWorker.register('./sw.js?v=10').catch(() => {});
  });
}

// Initial render
render();
