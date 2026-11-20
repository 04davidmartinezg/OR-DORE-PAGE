"use strict";
// EDITA AQUÍ LOS TEXTOS DEL CATÁLOGO.
// Cada número es una referencia estable. No lo cambies: lo usan los enlaces.
// Los textos de las otras páginas se editan directamente en su archivo HTML.

const colecciones = {
  gruta: { nombre: "Velas de gruta", descripcion: "Ángeles, flores y figuras se reúnen en pequeñas escenas. Observa el relieve y el color de cada nicho para elegir el que más te llama." },
  cafe: { nombre: "Velas de café", descripcion: "El contraste entre la cera clara y los granos oscuros convierte esta pieza en un detalle para la mesa o el rincón del café." },
  amor: { nombre: "Amor eterno", descripcion: "Abrazos, mantos y gestos de cuidado dan forma a esta colección de figuras. Elige por la escena o por la persona a quien quieres dedicarla." }
};

// Nombre, descripción, aroma y foto, juntos para cada pieza.
const productos = {
  "1": {
    "nombre": "Gruta del ángel",
    "descripcion": "Escena de un ángel entre flores rojas, con una abertura enmarcada en dorado.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-01.jpg"
  },
  "2": {
    "nombre": "Gruta de las flores doradas",
    "descripcion": "Una figura de manto oscuro destaca en un nicho rodeado de flores amarillas.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-02.jpg"
  },
  "3": {
    "nombre": "Figura en el portal",
    "descripcion": "El arco enmarca una figura de pie junto a una puerta en tonos madera.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-03.jpg"
  },
  "4": {
    "nombre": "Gruta del manto blanco",
    "descripcion": "Una figura de manto claro contrasta con flores de colores y un fondo verde.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-04.jpg"
  },
  "5": {
    "nombre": "Gruta de flores rojas",
    "descripcion": "Flores rojas acompañan la escena central bajo una corona de color marfil.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-05.jpg"
  },
  "6": {
    "nombre": "Gruta del ángel en relieve",
    "descripcion": "El relieve del ángel se destaca sobre una base floral en tonos cálidos.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-06.jpg"
  },
  "7": {
    "nombre": "Gruta del manto oscuro",
    "descripcion": "Una silueta de hábito oscuro aparece entre pequeños detalles dorados.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-07.jpg"
  },
  "8": {
    "nombre": "Vela de café",
    "descripcion": "Vela cilíndrica de tono crema con una franja de granos de café en la base y una mecha plana.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-08.jpg"
  },
  "9": {
    "nombre": "Gruta de luz marfil",
    "descripcion": "La escena del nicho combina tonos rojos y marfil con un marco dorado.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-09.jpg"
  },
  "10": {
    "nombre": "Gruta de luz ámbar",
    "descripcion": "Una franja de luz cálida corona la escena floral del frente.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-10.jpg"
  },
  "11": {
    "nombre": "Gruta del atardecer",
    "descripcion": "La parte superior combina naranja y violeta sobre un nicho de tonos tierra.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-11.jpg"
  },
  "12": {
    "nombre": "Madre con manto azul",
    "descripcion": "Figura de pie que sostiene a un niño, con pliegues azules sobre una túnica clara.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-12.jpg"
  },
  "13": {
    "nombre": "Figura con túnica azul",
    "descripcion": "El manto azul enmarca al niño y cae sobre una base de tono marfil.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-13.jpg"
  },
  "14": {
    "nombre": "Abrazo de familia",
    "descripcion": "Tres figuras se reúnen en un abrazo, con mantos crema, rosa y marrón.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-14.jpg"
  },
  "15": {
    "nombre": "Familia en tonos tierra",
    "descripcion": "Una escena familiar de líneas suaves, con el niño en el centro de la composición.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-15.jpg"
  },
  "16": {
    "nombre": "Ángel con escudo",
    "descripcion": "Las alas abiertas, el escudo y los detalles dorados dan altura a esta figura.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-16.jpg"
  },
  "17": {
    "nombre": "Figura en rosa",
    "descripcion": "Figura de silueta alargada, con manto rosa y la cabeza ligeramente inclinada.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-17.jpg"
  },
  "18": {
    "nombre": "Madre con niño",
    "descripcion": "La madre sostiene al niño cerca del rostro, entre pliegues azules y beige.",
    "aroma": "Por confirmar al pedir",
    "imagen": "Recursos/imagenes/piezas/OD-18.jpg"
  }
};

// Referencias visibles por colección y equivalencias de fotos alternativas.
const grupos = { gruta:[1,2,4,9,11], cafe:[8], amor:[3,12,13,14,16,17,18] };
const equivalencias = { 5:1, 6:1, 7:2, 10:9, 15:14 };

// Fotografía ambiental de cada referencia.
const ambiencePhotos = {
  "1": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%281%29.jpeg",
  "2": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%283%29.jpeg",
  "4": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM.jpeg",
  "9": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.53%20PM%20%281%29.jpeg",
  "11": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.53%20PM%20%282%29.jpeg",
  "8": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%2812%29.jpeg",
  "3": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%284%29.jpeg",
  "12": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%285%29.jpeg",
  "13": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%286%29.jpeg",
  "14": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%287%29.jpeg",
  "16": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%289%29.jpeg",
  "17": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%2810%29.jpeg",
  "18": "Recursos/imagenes/galeria/WhatsApp%20Image%202026-11-04%20at%204.44.52%20PM%20%2811%29.jpeg"
};
