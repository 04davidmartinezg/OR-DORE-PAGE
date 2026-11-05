"use strict";

// Sustituir los espacios de muestra por los productos reales de cada colección.
const colecciones = {
  gruta: { nombre: "Velas de gruta", descripcion: "Ángeles, flores y figuras se reúnen en pequeñas escenas. Observa el relieve y el color de cada nicho para elegir el que más te llama." },
  cafe: { nombre: "Velas de café", descripcion: "El contraste entre la cera clara y los granos oscuros convierte esta pieza en un detalle para la mesa o el rincón del café." },
  amor: { nombre: "Amor eterno", descripcion: "Abrazos, mantos y gestos de cuidado dan forma a esta colección de figuras. Elige por la escena o por la persona a quien quieres dedicarla." }
};

const nombres = ["Gruta del ángel", "Gruta de las flores doradas", "Figura en el portal", "Gruta del manto blanco", "Gruta de flores rojas", "Gruta del ángel en relieve", "Gruta del manto oscuro", "Vela de café", "Gruta de luz marfil", "Gruta de luz ámbar", "Gruta del atardecer", "Madre con manto azul", "Figura con túnica azul", "Abrazo de familia", "Familia en tonos tierra", "Ángel con escudo", "Figura en rosa", "Madre con niño"];
const descripciones = ["Escena de un ángel entre flores rojas, con una abertura enmarcada en dorado.", "Una figura de manto oscuro destaca en un nicho rodeado de flores amarillas.", "El arco enmarca una figura de pie junto a una puerta en tonos madera.", "Una figura de manto claro contrasta con flores de colores y un fondo verde.", "Flores rojas acompañan la escena central bajo una corona de color marfil.", "El relieve del ángel se destaca sobre una base floral en tonos cálidos.", "Una silueta de hábito oscuro aparece entre pequeños detalles dorados.", "Vela cilíndrica de tono crema con una franja de granos de café en la base y una mecha plana.", "La escena del nicho combina tonos rojos y marfil con un marco dorado.", "Una franja de luz cálida corona la escena floral del frente.", "La parte superior combina naranja y violeta sobre un nicho de tonos tierra.", "Figura de pie que sostiene a un niño, con pliegues azules sobre una túnica clara.", "El manto azul enmarca al niño y cae sobre una base de tono marfil.", "Tres figuras se reúnen en un abrazo, con mantos crema, rosa y marrón.", "Una escena familiar de líneas suaves, con el niño en el centro de la composición.", "Las alas abiertas, el escudo y los detalles dorados dan altura a esta figura.", "Figura de silueta alargada, con manto rosa y la cabeza ligeramente inclinada.", "La madre sostiene al niño cerca del rostro, entre pliegues azules y beige."];
const foto = id => `Recursos/imagenes/piezas/OD-${String(id).padStart(2,"0")}.jpg`;
const catalogo = document.getElementById("catalog-products");
if (catalogo) {
  const key = new URLSearchParams(location.search).get("coleccion");
  const coleccion = Object.hasOwn(colecciones, key) ? colecciones[key] : null;
  if (coleccion) {
    document.title = `${coleccion.nombre} | OR DORÉ`;
    document.getElementById("catalog-title").textContent = coleccion.nombre;
    document.getElementById("catalog-description").textContent = coleccion.descripcion;
    const grupos = { gruta: [1,5,6,2,7,4,9,10,11,3], cafe: [8], amor: [12,13,14,15,16,17,18] };
    for (const id of grupos[key]) {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `<a href="producto.html?id=${id}" class="product-link"><img class="catalog-image" src="${foto(id)}" alt="${coleccion.nombre}, pieza ${id}" loading="lazy"><div class="card-caption"><div><span class="eyebrow">OR DORÉ / ${String(id).padStart(2,'0')}</span><h2>${nombres[id-1]}</h2><p>Ver producto ↗</p></div></div></a>`;
      catalogo.appendChild(card);
    }

  }
}

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

const productDetail = document.getElementById('product-detail');
if (productDetail) {
 const id = Number(new URLSearchParams(location.search).get('id'));
 if (Number.isInteger(id) && id >= 1 && id <= 18) {
  const key = id === 8 ? 'cafe' : id >= 12 ? 'amor' : 'gruta';
  const title = colecciones[key].nombre;
  const nombre = nombres[id-1], ref = `OD-${String(id).padStart(2,'0')}`;
  const mensaje = `Hola, Or Doré. Me interesa ${nombre} (${ref}), de la colección ${title}. ¿Me confirman su aroma, precio y disponibilidad?`;
  const link = 'https://wa.me/573143850760?text='+encodeURIComponent(mensaje);
  document.title = nombre + ' | Or Doré';
  productDetail.innerHTML = `<a class="back-link" href="catalogo.html?coleccion=${key}">← ${title}</a><div class="company-row ficha"><img class="catalog-image" src="${foto(id)}" alt="${nombre}"><div><span class="eyebrow">${title} · ${ref}</span><h1>${nombre}</h1><p>${descripciones[id-1]}</p><dl><dt>Aroma</dt><dd>Por confirmar al pedir</dd><dt>Referencia</dt><dd>${ref}</dd></dl><a class="button" href="${link}" target="_blank" rel="noopener">Pedir por WhatsApp ↗</a><div class="photo-actions"><button type="button" hidden id="share-photo">Compartir foto del producto</button><a download="${ref}.jpg" href="${foto(id)}">Descargar foto para el pedido ↓</a></div><p class="note" id="share-status" role="status">El chat se abre con la referencia. Para adjuntar la imagen, usa la foto de esta ficha.</p></div></div>`;
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
