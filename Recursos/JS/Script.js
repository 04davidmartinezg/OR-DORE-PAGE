"use strict";

// COMPORTAMIENTO DE LA PÁGINA. Los textos de productos están en contenido.js.

const foto = id => productos[id].imagen;
// Referencias únicas; las fotos alternativas conservan enlaces válidos.

const referenciaPrincipal = id => equivalencias[id] || id;
const coleccionDe = id => Object.keys(grupos).find(key => grupos[key].includes(id));
// ---------- CATÁLOGO ----------
const catalogo = document.getElementById("catalog-products");
if (catalogo) {
  const key = new URLSearchParams(location.search).get("coleccion");
  const coleccion = Object.hasOwn(colecciones, key) ? colecciones[key] : null;
  if (coleccion) {
    document.title = `${coleccion.nombre} | OR DORÉ`;
    document.getElementById("catalog-title").textContent = coleccion.nombre;
    document.getElementById("catalog-description").textContent = coleccion.descripcion;
    const destacado = { gruta:1, cafe:8, amor:14 }[key];
    const intro = document.createElement('div');
    intro.className = 'collection-intro';
    const heading = document.querySelector('.page-heading');
    heading.before(intro);
    intro.append(heading);
    const preview = document.createElement('a');
    preview.href = 'producto.html?id='+destacado;
    preview.className = 'collection-preview';
    preview.innerHTML = `<img src="${foto(destacado)}" alt="${productos[destacado].nombre}"><span>Descubrir ${productos[destacado].nombre} ↗</span>`;
    intro.append(preview);
    const listHeading = document.createElement('h2');
    listHeading.className = 'catalog-label';
    listHeading.textContent = 'Más piezas de la colección';
    listHeading.hidden = grupos[key].length < 2;
    catalogo.before(listHeading);
    for (const id of grupos[key].filter(id => id !== destacado)) {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `<a href="producto.html?id=${id}" class="product-link"><img class="catalog-image" src="${foto(id)}" alt="${coleccion.nombre}, pieza ${id}" loading="lazy"><div class="card-caption"><div><span class="eyebrow">OR DORÉ / ${String(id).padStart(2,'0')}</span><h2>${productos[id].nombre}</h2><p>Ver producto ↗</p></div></div></a>`;
      catalogo.appendChild(card);
    }

  }
}

// ---------- MENÚ ----------
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");
const aboutMenu = document.querySelector(".about-menu");
function closeNavigation() {
  navigation?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = "Menú ☰";
  if (aboutMenu) aboutMenu.open = false;
}
menuButton?.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "Cerrar ×" : "Menú ☰";
  if (!open && aboutMenu) aboutMenu.open = false;
});
navigation?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  closeNavigation();
  if (aboutMenu) aboutMenu.open = false;
}));
document.addEventListener("click", event => {
  if (aboutMenu && !aboutMenu.contains(event.target)) aboutMenu.open = false;
});
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (aboutMenu?.open) {
    aboutMenu.open = false;
    aboutMenu.querySelector("summary").focus();
  } else if (navigation?.classList.contains("open")) {
    closeNavigation();
    menuButton.focus();
  }
});

// Cerrar al hacer clic o mover el foco fuera del panel y su botón.
function isOutsideMenu(target) {
  return navigation && !navigation.contains(target) && !menuButton.contains(target);
}
document.addEventListener("click", event => {
  if (isOutsideMenu(event.target)) closeNavigation();
});
document.addEventListener("focusin", event => {
  if (isOutsideMenu(event.target)) closeNavigation();
});

// ---------- FICHA Y WHATSAPP ----------
const productDetail = document.getElementById('product-detail');
if (productDetail) {
 const id = referenciaPrincipal(Number(new URLSearchParams(location.search).get('id')));
 if (Number.isInteger(id) && id >= 1 && id <= 18) {
  const key = coleccionDe(id);
  const title = colecciones[key].nombre;
  const nombre = productos[id].nombre, ref = `OD-${String(id).padStart(2,'0')}`;
  const mensaje = `Hola, Or Doré. Me interesa ${nombre} (${ref}), de la colección ${title}. ¿Me confirman su aroma, precio y disponibilidad?`;
  const link = 'https://wa.me/573143850760?text='+encodeURIComponent(mensaje);
  document.title = nombre + ' | Or Doré';
  productDetail.innerHTML = `<a class="back-link" href="catalogo.html?coleccion=${key}">← ${title}</a><div class="company-row ficha"><img class="catalog-image" src="${foto(id)}" alt="${nombre}"><div><span class="eyebrow">${title} · ${ref}</span><h1>${nombre}</h1><p>${productos[id].descripcion}</p><dl><dt>Aroma</dt><dd>${productos[id].aroma}</dd><dt>Referencia</dt><dd>${ref}</dd></dl><a class="button" href="${link}" target="_blank" rel="noopener">Pedir por WhatsApp ↗</a><div class="photo-actions"><button type="button" hidden id="share-photo">Compartir foto del producto</button><a download="${ref}.jpg" href="${foto(id)}">Descargar foto para el pedido ↓</a></div><p class="note" id="share-status" role="status">El chat se abre con la referencia. Para adjuntar la imagen, usa la foto de esta ficha.</p></div></div>`;
  const share = document.getElementById('share-photo');
  if (navigator.canShare && navigator.share) {
   // Precargar el archivo: el selector debe abrirse durante el clic del usuario.
   fetch(foto(id)).then(res=>{if(!res.ok)throw Error();return res.blob()}).then(blob=>{
    const file=new File([blob],ref+'.jpg',{type:'image/jpeg'});
    if(!navigator.canShare({files:[file]}))return;
    share.hidden=false;share.onclick=async()=>{try{await navigator.share({files:[file],text:mensaje,title:nombre})}catch(err){if(err.name!=='AbortError')document.getElementById('share-status').textContent='Descarga la foto y adjúntala en el chat.'}};
   }).catch(()=>{});
  }
 } else productDetail.innerHTML = '<h1>Producto no encontrado</h1><a href="colecciones.html">Volver a las colecciones</a>';
}

const allDropdowns = document.querySelectorAll('nav details');
allDropdowns.forEach(dropdown => dropdown.addEventListener('toggle', () => {
 if (dropdown.open) allDropdowns.forEach(other => { if (other !== dropdown) other.open = false; });
}));
document.addEventListener('click', event => allDropdowns.forEach(d => { if (!d.contains(event.target)) d.open = false; }));
document.addEventListener('keydown', event => {
 if (event.key === 'Escape') allDropdowns.forEach(d => { if (d.open) { d.open = false; menuButton?.focus(); } });
});

if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const entrada = new IntersectionObserver(items => {
    for (const item of items) if (item.isIntersecting) {
      item.target.classList.add('en-vista');
      entrada.unobserve(item.target);
    }
  }, { threshold: .12 });
  document.querySelectorAll('.gallery figure').forEach(item => entrada.observe(item));
}

// Galería independiente: selección, ampliación y acceso a la ficha.
// ---------- FILTROS Y VISOR DE GALERÍA ----------
const galleryItems = [...document.querySelectorAll('.curated figure')];
if (galleryItems.length) {
 const viewer = document.getElementById('gallery-viewer');
 let selected = 0, visible = galleryItems;
 function showPhoto(index) {
  selected = (index + visible.length) % visible.length;
  const item = visible[selected], img = item.querySelector('img');
  document.getElementById('viewer-image').src = img.src;
  document.getElementById('viewer-image').alt = img.alt;
  document.getElementById('viewer-name').textContent = item.querySelector('figcaption span').textContent;
  document.getElementById('viewer-product').href = 'producto.html?id='+referenciaPrincipal(Number(item.dataset.product));
  document.getElementById('viewer-prev').disabled = visible.length < 2;
  document.getElementById('viewer-next').disabled = visible.length < 2;
 }
 function count(){document.getElementById('gallery-count').textContent = visible.length+' piezas para descubrir';}
 count();
 document.querySelectorAll('[data-gallery-filter]').forEach(button=>button.addEventListener('click',()=>{
  document.querySelectorAll('[data-gallery-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  galleryItems.forEach(item=>item.hidden=button.dataset.galleryFilter!=='all' && item.dataset.category!==button.dataset.galleryFilter);
  document.querySelectorAll('[data-gallery-chapter]').forEach(chapter => {
   chapter.hidden = button.dataset.galleryFilter !== 'all' && chapter.dataset.galleryChapter !== button.dataset.galleryFilter;
  });
  visible=galleryItems.filter(item=>!item.hidden);count();
 }));
 galleryItems.forEach(item=>item.querySelector('button').addEventListener('click',()=>{
  showPhoto(visible.indexOf(item));viewer.showModal();document.body.classList.add('gallery-modal-open');
 }));
 document.getElementById('viewer-close').onclick=()=>viewer.close();
 document.getElementById('viewer-prev').onclick=()=>showPhoto(selected-1);
 document.getElementById('viewer-next').onclick=()=>showPhoto(selected+1);
 viewer.addEventListener('keydown',event=>{
  if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(selected-1)}
  if(event.key==='ArrowRight'){event.preventDefault();showPhoto(selected+1)}
 });
 viewer.addEventListener('close',()=>document.body.classList.remove('gallery-modal-open'));
}

// Vistas del producto: fotografía de catálogo y fotografía en ambiente.

if (productDetail && productDetail.querySelector('.ficha')) {
 const id = referenciaPrincipal(Number(new URLSearchParams(location.search).get('id')));
 const primary = productDetail.querySelector('.ficha > img');
 const visual = document.createElement('div');
 visual.className = 'product-visual';
 primary.before(visual);visual.append(primary);
 if (ambiencePhotos[id]) {
  const views = document.createElement('div');views.className='product-views';views.setAttribute('role','group');views.setAttribute('aria-label','Vista del producto');
  [['La pieza',foto(id)],['En un ambiente',ambiencePhotos[id]]].forEach(([label,src],index)=>{
   const button=document.createElement('button');button.type='button';button.textContent=label;button.setAttribute('aria-pressed',String(index===0));
   button.addEventListener('click',()=>{
    primary.src=src;primary.alt=productos[id].nombre+(index?' en ambiente':'');
    primary.classList.toggle('ambient-view',index===1);
    views.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
   });views.append(button);
  });visual.append(views);
 }
 const recommendationIds = grupos[coleccionDe(id)].filter(n=>n!==id).slice(0,2);
 if (!recommendationIds.length) recommendationIds.push(1,14);
 const related=document.createElement('section');related.className='related-pieces';
 related.innerHTML='<span class="eyebrow">SIGUE EXPLORANDO</span><h2>Otros detalles para descubrir.</h2><div class="related-grid">'+recommendationIds.map(n=>'<a href="producto.html?id='+n+'"><img loading="lazy" src="'+foto(n)+'" alt="'+productos[n].nombre+'"><span>'+productos[n].nombre+' ↗</span></a>').join('')+'</div>';
 productDetail.append(related);
}
