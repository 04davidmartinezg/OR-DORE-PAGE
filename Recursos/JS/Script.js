"use strict";

// Sustituir los espacios de muestra por los productos reales de cada colección.
const colecciones = {
  gruta: { nombre: "Velas de gruta", descripcion: "Diseño y relieve: descubre las piezas de esta colección." },
  cafe: { nombre: "Velas de café", descripcion: "Aroma y calidez: descubre las piezas de esta colección." },
  amor: { nombre: "Amor eterno", descripcion: "Para regalar: descubre las piezas de esta colección." }
};

const catalogo = document.getElementById("catalog-products");
if (catalogo) {
  const key = new URLSearchParams(location.search).get("coleccion");
  const coleccion = Object.hasOwn(colecciones, key) ? colecciones[key] : null;
  if (coleccion) {
    document.title = `${coleccion.nombre} | OR DORÉ`;
    document.getElementById("catalog-title").textContent = coleccion.nombre;
    document.getElementById("catalog-description").textContent = coleccion.descripcion;
    // Tres posiciones de catálogo por colección, sin inventar precios o existencias.
    for (let i = 1; i <= 3; i++) {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = `<div class="image-placeholder"><span class="frame-icon" aria-hidden="true"></span><span>Imagen de la vela</span></div><div class="card-caption"><div><span class="eyebrow">ESPACIO 0${i}</span><h2>Vela por definir</h2><p>Información pendiente</p></div></div>`;
      catalogo.appendChild(card);
    }
    document.getElementById("catalog-note").hidden = false;
  }
}

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("navigation");
const aboutMenu = document.querySelector(".about-menu");
function closeNavigation() {
  navigation?.classList.remove("open");
  menuButton?.setAttribute("aria-expanded", "false");
}
menuButton?.addEventListener("click", () => {
  const open = navigation.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
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
