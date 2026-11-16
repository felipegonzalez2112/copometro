const KEY = 'chinchin.collection.v1';
const CATEGORIES = ['Vinos', 'Gin', 'Vodka', 'Aperitivos', 'Otros'];
const icons = {
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  search: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
  bottle: '<svg viewBox="0 0 24 24"><path d="M9 3h6v3l2 2v12H7V8l2-2zM9 6h6M7 11h10"/></svg>',
  back: '<svg viewBox="0 0 24 24"><path d="m15 18-6-6 6-6M9 12h12"/></svg>',
  star: '<svg viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/></svg>',
  trash: '<svg viewBox="0 0 24 24"><path d="M4 7h16M10 11v6m4-6v6M6 7l1 14h10l1-14M9 7V4h6v3"/></svg>',
  edit: '<svg viewBox="0 0 24 24"><path d="m15 5 4 4M4 20l4-.8L19 8l-4-4L4 15z"/></svg>',
  photo: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="8.5" cy="9" r="1.5"/><path d="m21 15-5-5L5 20"/></svg>',
};
const app = document.querySelector('#app');
let drinks = load();
let screen = { page: 'home', drinkId: null, modal: null, query: '', category: 'Todas', notice: '' };

function load() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved !== null) { const parsed = JSON.parse(saved); return Array.isArray(parsed) ? parsed : []; }
    const oldDrinks = JSON.parse(localStorage.getItem('chinchin.drinks.v1') || '[]');
    const oldRatings = JSON.parse(localStorage.getItem('chinchin.ratings.v1') || '[]');
    if (Array.isArray(oldDrinks) && oldDrinks.length) {
      const migrated = oldDrinks.map((drink) => ({ ...drink, ratings: (Array.isArray(oldRatings) ? oldRatings : []).filter((rating) => rating.drink_id === drink.id) }));
      localStorage.setItem(KEY, JSON.stringify(migrated));
      return migrated;
    }
    return [];
  }
  catch { return []; }
}
function persist() {
  try { localStorage.setItem(KEY, JSON.stringify(drinks)); return true; }
  catch { notify('No hay espacio suficiente. Probá con una foto más liviana.'); return false; }
}
function esc(value = '') { return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char])); }
function icon(name) { return icons[name] || ''; }
function notify(message) { screen.notice = message; render(); setTimeout(() => { if (screen.notice === message) { screen.notice = ''; render(); } }, 2600); }
function latest(drink) { return [...(drink.ratings || [])].sort((a, b) => b.tasted_at.localeCompare(a.tasted_at))[0]; }
function dateLabel(value) { return value ? new Date(`${value}T12:00:00`).toLocaleDateString('es-AR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''; }
function image(src, name, cls = '') {
  return src ? `<img class="${cls}" src="${esc(src)}" alt="${esc(name)}" loading="lazy">` : `<div class="placeholder ${cls}">${icon('bottle')}<span>Sin foto</span></div>`;
}

function render() {
  const selected = drinks.find((drink) => drink.id === screen.drinkId);
  app.innerHTML = `<header class="topbar"><button class="brand" data-action="home" aria-label="Ir al inicio"><span class="brand-mark">C</span><span>ChinChin<span class="gold">.</span></span></button><span class="local-mark">${navigator.onLine ? 'EN ESTE DISPOSITIVO' : 'SIN CONEXIÓN'}</span></header>
    ${screen.notice ? `<div class="toast" role="status">${esc(screen.notice)}</div>` : ''}
    ${selected ? detail(selected) : home()}
    ${screen.modal ? modal() : ''}
    ${!selected ? `<button class="fab" data-action="add" aria-label="Agregar bebida">${icon('plus')}</button>` : ''}`;
}

function home() {
  const shown = drinks.filter((drink) => (screen.category === 'Todas' || drink.category === screen.category) && `${drink.name} ${drink.brand || ''} ${drink.category}`.toLocaleLowerCase().includes(screen.query.toLocaleLowerCase()));
  return `<main class="home"><section class="collection"><div class="catalog-heading"><div><span class="overline">${drinks.length} ${drinks.length === 1 ? 'BEBIDA' : 'BEBIDAS'}</span><h1>Mi colección</h1></div><button class="button primary desktop-add" data-action="add">${icon('plus')} Agregar</button></div>
      <label class="search">${icon('search')}<input id="search" type="search" placeholder="Buscar una bebida" value="${esc(screen.query)}" autocomplete="off">${screen.query ? '<button data-action="clear-search" class="clear-search" aria-label="Limpiar">×</button>' : ''}</label>
      <div class="filters" aria-label="Filtrar por categoría">${['Todas', ...CATEGORIES].map((category) => `<button class="filter ${screen.category === category ? 'active' : ''}" data-category="${esc(category)}">${esc(category)}</button>`).join('')}</div>
      ${shown.length ? `<div class="drink-grid">${shown.map(card).join('')}</div>` : `<div class="empty"><div class="empty-icon">${icon('bottle')}</div><h3>${drinks.length ? 'No encontré esa bebida' : 'Empezá tu colección'}</h3><p>${drinks.length ? 'Probá con otro nombre o categoría.' : 'Agregá una botella para guardar lo que te gustó.'}</p>${!drinks.length ? '<button class="button primary" data-action="add">Agregar bebida</button>' : ''}</div>`}
    </section></main>`;
}

function card(drink) {
  const rating = latest(drink);
  return `<button class="drink-card" data-open="${drink.id}" aria-label="Ver ${esc(drink.name)}"><div class="card-photo">${image(drink.image_url, drink.name)}<span class="photo-category">${esc(drink.category)}</span></div><div class="card-copy"><h3>${esc(drink.name)}</h3><p>${esc(drink.brand || 'Marca sin especificar')}</p><div class="card-rating">${rating ? `${icon('star')}<strong>${Number(rating.score).toFixed(1)}</strong><span>/ 10</span>` : '<span class="not-rated">Todavía sin calificar</span>'}</div></div></button>`;
}

function detail(drink) {
  const ratings = [...(drink.ratings || [])].sort((a, b) => b.tasted_at.localeCompare(a.tasted_at));
  return `<main class="detail"><button class="back" data-action="home">${icon('back')} Mi colección</button>
    <section class="detail-hero"><div class="detail-photo">${image(drink.image_url, drink.name)}</div><div class="detail-info"><span class="overline">${esc(drink.category)}</span><h1>${esc(drink.name)}</h1><p class="brand-name">${esc(drink.brand || 'Marca sin especificar')}</p><div class="facts">${drink.country ? `<span>${esc(drink.country)}</span>` : ''}${drink.alcohol_percentage ? `<span>${esc(drink.alcohol_percentage)}% alc.</span>` : ''}</div><div class="actions"><button class="button secondary" data-action="edit-drink">${icon('edit')} Editar</button><button class="button danger" data-action="delete-drink">${icon('trash')} Eliminar</button></div></div></section>
    <section class="tastings"><div class="section-title"><div><span class="overline">MIS NOTAS</span><h2>Calificaciones <small>${ratings.length}</small></h2></div><button class="button secondary" data-action="add-rating">${icon('plus')} Calificar</button></div>
      ${ratings.length ? `<div class="rating-list">${ratings.map((rating) => `<article class="rating"><div class="rating-head"><div class="rating-score">${icon('star')}<strong>${Number(rating.score).toFixed(1)}</strong><span>/ 10</span></div><time>${dateLabel(rating.tasted_at)}</time><div class="rating-actions"><button data-rating-edit="${rating.id}" aria-label="Editar calificación">${icon('edit')}</button><button data-rating-delete="${rating.id}" aria-label="Eliminar calificación">${icon('trash')}</button></div></div>${rating.comments ? `<p class="comment">“${esc(rating.comments)}”</p>` : ''}<span class="again ${rating.would_drink_again ? 'yes' : ''}">${rating.would_drink_again ? 'La volvería a tomar' : 'No la volvería a tomar'}</span></article>`).join('')}</div>` : '<div class="empty-rating">Todavía no la calificaste. <button class="text-button" data-action="add-rating">Agregar primera nota</button></div>'}
    </section></main>`;
}

function modal() {
  const isRating = screen.modal.type === 'rating';
  const existing = screen.modal.id ? drinks.find((drink) => drink.id === screen.modal.id) : null;
  const rating = isRating && existing ? (existing.ratings || []).find((item) => item.id === screen.modal.ratingId) : null;
  const isNewDrink = !isRating && !existing;
  const drinkValue = existing || { name: '', brand: '', category: 'Vinos', country: '', alcohol_percentage: '', image_url: '' };
  const ratingValue = rating || { score: 8, comments: '', tasted_at: new Date().toISOString().slice(0, 10), would_drink_again: true };
  const title = isRating ? (rating ? 'Editar bebida y cata' : 'Nueva cata') : (existing ? 'Editar bebida' : 'Registrar lo que probé');
  return `<div class="modal-shade" data-action="close-shade"><section class="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><header class="modal-head"><div><span class="overline">MI BITÁCORA</span><h2 id="modal-title">${title}</h2></div><button class="close" data-action="close-modal" aria-label="Cerrar">×</button></header>
    <form id="entry-form" data-form="${isRating ? 'rating' : 'drink'}" data-id="${existing?.id || ''}" data-rating-id="${rating?.id || ''}">
      <section class="form-section"><span class="form-section-title">LA BEBIDA</span>${drinkFields(drinkValue)}</section>
      ${isRating || isNewDrink ? `<section class="form-section"><span class="form-section-title">${isNewDrink ? 'LO QUE PROBÉ' : 'MI CATA'}</span>${ratingFields(ratingValue)}</section>` : ''}
      <div class="form-actions"><button type="button" class="button secondary" data-action="close-modal">Cancelar</button><button class="button primary" type="submit">Guardar</button></div>
    </form></section></div>`;
}

function drinkFields(drink) {
  const selectedCategory = CATEGORIES.includes(drink.category) ? drink.category : 'Otros';
  return `<div class="photo-select">${image(drink.image_url, drink.name || 'Vista previa')}<label class="button secondary">${icon('photo')} Elegir foto<input name="image_file" type="file" accept="image/*"></label><small>Una foto desde tu galería</small></div>
    <input type="hidden" name="image_url" value="${esc(drink.image_url || '')}">
    <label class="field">Nombre *<input name="name" value="${esc(drink.name)}" placeholder="Ej. Malbec Reserva" required maxlength="90"></label>
    <label class="field">Marca<input name="brand" value="${esc(drink.brand || '')}" placeholder="Bodega o destilería"></label>
    <fieldset class="category-field"><legend>Tipo</legend><input type="hidden" name="category" value="${esc(selectedCategory)}"><div class="category-pills" role="radiogroup" aria-label="Tipo de bebida">${CATEGORIES.map((category) => `<button type="button" class="category-pill ${selectedCategory === category ? 'active' : ''}" role="radio" aria-checked="${selectedCategory === category}" data-drink-category="${esc(category)}">${esc(category)}</button>`).join('')}</div></fieldset>`;
}

function ratingFields(rating) {
  return `<label class="field score-field">Puntuación <strong><output id="score-output">${esc(rating.score)}</output> / 10</strong><input name="score" type="range" min="1" max="10" value="${esc(rating.score)}"></label>
    <label class="field">Fecha en que la probé<input name="tasted_at" type="date" value="${esc(rating.tasted_at)}" required></label>
    <label class="field">Comentario personal<textarea name="comments" rows="4" maxlength="1000" placeholder="Aroma, sabor, ocasión…">${esc(rating.comments || '')}</textarea></label>
    <label class="again-choice"><input name="would_drink_again" type="checkbox" ${rating.would_drink_again ? 'checked' : ''}><span>La volvería a tomar</span></label>`;
}

async function compress(file) {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 900 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement('canvas'); canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height); bitmap.close();
  return canvas.toDataURL('image/jpeg', 0.76);
}

app.addEventListener('click', async (event) => {
  const target = event.target.closest('[data-action], [data-open], [data-category], [data-drink-category], [data-rating-edit], [data-rating-delete]');
  if (!target) return;
  if (target.dataset.open) { screen.drinkId = target.dataset.open; render(); return; }
  if (target.dataset.category) { screen.category = target.dataset.category; render(); return; }
  if (target.dataset.drinkCategory) {
    const form = target.closest('form');
    form.querySelector('[name="category"]').value = target.dataset.drinkCategory;
    form.querySelectorAll('[data-drink-category]').forEach((pill) => {
      const active = pill === target; pill.classList.toggle('active', active); pill.setAttribute('aria-checked', String(active));
    });
    return;
  }
  if (target.dataset.ratingEdit || target.dataset.ratingDelete) {
    const drink = drinks.find((item) => item.id === screen.drinkId); const ratingId = target.dataset.ratingEdit || target.dataset.ratingDelete;
    if (target.dataset.ratingEdit) { screen.modal = { type: 'rating', id: drink.id, ratingId }; render(); }
    else if (confirm('¿Eliminar esta calificación?')) { drink.ratings = drink.ratings.filter((item) => item.id !== ratingId); persist(); render(); }
    return;
  }
  switch (target.dataset.action) {
    case 'home': screen.page = 'home'; screen.drinkId = null; screen.modal = null; render(); break;
    case 'add': screen.modal = { type: 'drink' }; render(); break;
    case 'edit-drink': screen.modal = { type: 'drink', id: screen.drinkId }; render(); break;
    case 'add-rating': screen.modal = { type: 'rating', id: screen.drinkId }; render(); break;
    case 'close-modal': screen.modal = null; render(); break;
    case 'close-shade': if (event.target === target) { screen.modal = null; render(); } break;
    case 'clear-search': screen.query = ''; render(); break;
    case 'delete-drink': {
      const drink = drinks.find((item) => item.id === screen.drinkId);
      if (confirm(`¿Eliminar “${drink.name}” y sus calificaciones?`)) { drinks = drinks.filter((item) => item.id !== drink.id); persist(); screen.drinkId = null; render(); }
      break;
    }
  }
});

app.addEventListener('input', (event) => {
  if (event.target.id === 'search') { screen.query = event.target.value; const cursor = event.target.selectionStart; render(); const input = document.querySelector('#search'); input.focus(); input.setSelectionRange(cursor, cursor); }
  if (event.target.name === 'score') { const output = document.querySelector('#score-output'); if (output) output.value = event.target.value; }
});

app.addEventListener('change', async (event) => {
  if (event.target.name !== 'image_file') return;
  const file = event.target.files?.[0]; if (!file) return;
  if (!file.type.startsWith('image/')) { notify('Elegí un archivo de imagen.'); return; }
  try {
    const data = await compress(file); const hidden = document.querySelector('[name="image_url"]'); hidden.value = data;
    const preview = document.querySelector('.photo-select img, .photo-select .placeholder');
    if (preview) { const imageElement = document.createElement('img'); imageElement.src = data; imageElement.alt = 'Vista previa'; imageElement.className = 'selected-photo'; preview.replaceWith(imageElement); }
  } catch { notify('No se pudo abrir esa imagen.'); }
});

app.addEventListener('submit', async (event) => {
  if (event.target.id !== 'entry-form') return;
  event.preventDefault(); const form = event.target; const data = new FormData(form); const id = form.dataset.id;
  if (form.dataset.form === 'drink') {
    const existing = id ? drinks.find((drink) => drink.id === id) : null;
    const drink = { id: existing?.id || crypto.randomUUID(), name: String(data.get('name')).trim(), brand: String(data.get('brand')).trim(), category: data.get('category'), country: existing?.country || '', alcohol_percentage: existing?.alcohol_percentage || '', image_url: data.get('image_url') || '', created_at: existing?.created_at || new Date().toISOString(), ratings: existing?.ratings || [] };
    if (!drink.name) return;
    if (!existing && data.has('score') && data.has('tasted_at')) {
      drink.ratings.unshift({ id: crypto.randomUUID(), score: Number(data.get('score')), comments: String(data.get('comments')).trim(), tasted_at: data.get('tasted_at'), would_drink_again: data.get('would_drink_again') === 'on', created_at: new Date().toISOString() });
    }
    if (existing) drinks = drinks.map((item) => item.id === id ? drink : item); else drinks.unshift(drink);
    if (persist()) { screen.modal = null; screen.drinkId = drink.id; notify(existing ? 'Bebida actualizada' : 'Bebida y cata guardadas'); }
  } else {
    const current = drinks.find((item) => item.id === id); const ratingId = form.dataset.ratingId;
    const drink = { ...current, name: String(data.get('name')).trim(), brand: String(data.get('brand')).trim(), category: data.get('category'), image_url: data.get('image_url') || '', ratings: [...(current.ratings || [])] };
    const oldRating = drink.ratings.find((item) => item.id === ratingId);
    const rating = { id: ratingId || crypto.randomUUID(), score: Number(data.get('score')), comments: String(data.get('comments')).trim(), tasted_at: data.get('tasted_at'), would_drink_again: data.get('would_drink_again') === 'on', created_at: oldRating?.created_at || new Date().toISOString() };
    if (!drink.name) return;
    if (ratingId) drink.ratings = drink.ratings.map((item) => item.id === ratingId ? { ...item, ...rating } : item); else drink.ratings.unshift(rating);
    drinks = drinks.map((item) => item.id === id ? drink : item);
    if (persist()) { screen.modal = null; notify('Calificación guardada'); }
  }
  render();
});

window.addEventListener('online', render);
window.addEventListener('offline', render);
if ('serviceWorker' in navigator) window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js?v=6').catch(() => {}));
render();
