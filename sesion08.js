const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const path = require("path");

// Color palette - Ocean/Tech theme
const C = {
  navy:    "0D2B55",
  blue:    "1565C0",
  teal:    "0097A7",
  amber:   "F57C00",
  white:   "FFFFFF",
  offwhite:"F0F4F8",
  light:   "E3EBF6",
  muted:   "78909C",
  dark:    "1A237E",
  green:   "2E7D32",
  red:     "C62828",
};

// Shared shadow factory
const makeShadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.12 });

async function iconToPng(iconName, color = "#FFFFFF", size = 256) {
  const iconSets = {
    FaCode: require("react-icons/fa").FaCode,
    FaListOl: require("react-icons/fa").FaListOl,
    FaLightbulb: require("react-icons/fa").FaLightbulb,
    FaChalkboardTeacher: require("react-icons/fa").FaChalkboardTeacher,
    FaUsers: require("react-icons/fa").FaUsers,
    FaCheckCircle: require("react-icons/fa").FaCheckCircle,
    FaArrowRight: require("react-icons/fa").FaArrowRight,
    FaBook: require("react-icons/fa").FaBook,
    FaBrain: require("react-icons/fa").FaBrain,
    FaSearch: require("react-icons/fa").FaSearch,
    FaCogs: require("react-icons/fa").FaCogs,
    FaExclamationTriangle: require("react-icons/fa").FaExclamationTriangle,
    FaTerminal: require("react-icons/fa").FaTerminal,
    FaProjectDiagram: require("react-icons/fa").FaProjectDiagram,
    FaQuestion: require("react-icons/fa").FaQuestion,
    FaStar: require("react-icons/fa").FaStar,
    FaFlask: require("react-icons/fa").FaFlask,
    FaComments: require("react-icons/fa").FaComments,
    FaClipboardList: require("react-icons/fa").FaClipboardList,
    FaRocket: require("react-icons/fa").FaRocket,
  };
  const Icon = iconSets[iconName];
  if (!Icon) return null;
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(Icon, { color, size: String(size) }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

async function buildSlides() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Sesión 8 - Estructuras de Control Secuenciales";
  pres.author = "Ing. Arnaldo Vasquez Ruiz";

  // ─── SLIDE 1: PORTADA ─────────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Left accent bar
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 5.625, fill: { color: C.amber }, line: { type: "none" } });
    // Right decorative block
    s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0, w: 2.5, h: 5.625, fill: { color: C.dark }, line: { type: "none" } });
    // Teal line
    s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0, w: 0.08, h: 5.625, fill: { color: C.teal }, line: { type: "none" } });

    // Code-like decorative text in right panel
    s.addText([
      { text: "01  INICIO", options: { breakLine: true } },
      { text: "02    leer datos", options: { breakLine: true } },
      { text: "03    procesar()", options: { breakLine: true } },
      { text: "04    mostrar()", options: { breakLine: true } },
      { text: "05  FIN", options: { breakLine: true } },
    ], { x: 7.6, y: 1.2, w: 2.3, h: 3, fontSize: 10, fontFace: "Consolas", color: "4FC3F7", align: "left", valign: "top" });

    // Session badge
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 0.4, w: 2.2, h: 0.5, fill: { color: C.amber }, line: { type: "none" }, rectRadius: 0.08 });
    s.addText("SESIÓN N.° 08", { x: 0.6, y: 0.4, w: 2.2, h: 0.5, fontSize: 13, fontFace: "Arial Black", color: C.navy, align: "center", valign: "middle", bold: true });

    s.addText("Estructuras", { x: 0.6, y: 1.15, w: 6.6, h: 0.9, fontSize: 46, fontFace: "Georgia", color: C.white, bold: true, align: "left", valign: "middle" });
    s.addText("de Control", { x: 0.6, y: 1.95, w: 6.6, h: 0.9, fontSize: 46, fontFace: "Georgia", color: C.amber, bold: true, align: "left", valign: "middle" });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 3.05, w: 6.6, h: 0.04, fill: { color: C.teal }, line: { type: "none" } });

    s.addText("Unidad Didáctica: Algoritmo de Programación", { x: 0.6, y: 3.2, w: 6.6, h: 0.4, fontSize: 14, fontFace: "Calibri", color: "90CAF9", align: "left" });
    s.addText("Desarrollo de Sistemas de Información", { x: 0.6, y: 3.6, w: 6.6, h: 0.35, fontSize: 13, fontFace: "Calibri", color: C.muted, align: "left" });

    s.addText([
      { text: "Docente: ", options: { bold: true } },
      { text: "Ing. Arnaldo Vasquez Ruiz" }
    ], { x: 0.6, y: 4.2, w: 5, h: 0.35, fontSize: 12, fontFace: "Calibri", color: "B0BEC5", align: "left" });
    s.addText([
      { text: "Fecha: ", options: { bold: true } },
      { text: "29/04/2026" }
    ], { x: 0.6, y: 4.55, w: 5, h: 0.35, fontSize: 12, fontFace: "Calibri", color: "B0BEC5", align: "left" });
  }

  // ─── SLIDE 2: PROPÓSITO DE LA SESIÓN ────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.navy }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("🎯  PROPÓSITO DE LA SESIÓN", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 24, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const items = [
      { icon: "FaCode", color: C.blue, title: "Aplicar", desc: "Estructuras de control secuenciales en problemas simples" },
      { icon: "FaListOl", color: C.teal, title: "Reconocer", desc: "El orden lógico y la secuencia correcta en un algoritmo" },
      { icon: "FaBrain", color: C.amber, title: "Comprender", desc: "La importancia de la secuencia lógica en la resolución de problemas" },
    ];

    for (let i = 0; i < items.length; i++) {
      const x = 0.4 + i * 3.15;
      const y = 1.45;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 3.6, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 3.0, h: 0.07, fill: { color: items[i].color }, line: { type: "none" } });
      s.addShape(pres.shapes.OVAL, { x: x + 1.1, y: y + 0.2, w: 0.8, h: 0.8, fill: { color: items[i].color }, line: { type: "none" } });
      s.addText(`${i+1}`, { x: x + 1.1, y: y + 0.2, w: 0.8, h: 0.8, fontSize: 22, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", bold: true });
      s.addText(items[i].title, { x: x + 0.15, y: y + 1.15, w: 2.7, h: 0.5, fontSize: 18, fontFace: "Arial Black", color: items[i].color, bold: true, align: "center" });
      s.addText(items[i].desc, { x: x + 0.2, y: y + 1.7, w: 2.6, h: 1.7, fontSize: 13, fontFace: "Calibri", color: "37474F", align: "center", valign: "top" });
    }

    s.addText("Al finalizar la sesión, el estudiante será capaz de DIFERENCIAR algoritmos mediante pseudocódigo y diagramas estructurados.", {
      x: 0.4, y: 5.05, w: 9.2, h: 0.45, fontSize: 12, fontFace: "Calibri", color: C.muted, italic: true, align: "center"
    });
  }

  // ─── SLIDE 3: RECUPERACIÓN DE SABERES PREVIOS ───────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.teal }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("💬  RECUPERACIÓN DE SABERES PREVIOS", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 22, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const questions = [
      "¿Qué son las estructuras de control?",
      "¿Cómo se representan los algoritmos?",
      "¿Cuáles son los elementos básicos de un algoritmo?",
      "¿Qué diferencia hay entre una secuencia y un ciclo?",
    ];

    questions.forEach((q, i) => {
      const y = 1.45 + i * 1.0;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.8, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.5, h: 0.8, fill: { color: C.teal }, line: { type: "none" } });
      s.addText(`${i+1}`, { x: 0.5, y, w: 0.5, h: 0.8, fontSize: 18, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", bold: true });
      s.addText(q, { x: 1.15, y: y + 0.05, w: 8.2, h: 0.7, fontSize: 16, fontFace: "Calibri", color: "1A237E", valign: "middle" });
    });
  }

  // ─── SLIDE 4: MOTIVACIÓN ─────────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.amber }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.navy }, line: { type: "none" } });
    s.addText("☕  MOTIVACIÓN", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 26, fontFace: "Arial Black", color: C.navy, bold: true, align: "left", valign: "middle" });

    // Left panel
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 4.5, h: 4.0, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 4.5, h: 0.07, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("Caso Cotidiano", { x: 0.55, y: 1.4, w: 4.2, h: 0.5, fontSize: 17, fontFace: "Arial Black", color: C.amber, bold: true });
    s.addText("Preparar un Café ☕", { x: 0.55, y: 1.85, w: 4.2, h: 0.5, fontSize: 20, fontFace: "Georgia", color: C.navy, bold: true });

    const steps = ["Calentar el agua", "Colocar el café en el filtro", "Verter el agua caliente", "Esperar el tiempo de filtrado", "Servir en la taza"];
    steps.forEach((st, i) => {
      const y = 2.45 + i * 0.53;
      s.addShape(pres.shapes.OVAL, { x: 0.6, y, w: 0.35, h: 0.35, fill: { color: C.amber }, line: { type: "none" } });
      s.addText(`${i+1}`, { x: 0.6, y, w: 0.35, h: 0.35, fontSize: 11, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", bold: true });
      s.addText(st, { x: 1.05, y: y + 0.02, w: 3.7, h: 0.35, fontSize: 13, fontFace: "Calibri", color: "37474F" });
    });

    // Right panel
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.3, w: 4.5, h: 4.0, fill: { color: C.navy }, line: { type: "none" }, shadow: makeShadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 1.3, w: 4.5, h: 0.07, fill: { color: C.teal }, line: { type: "none" } });
    s.addText("Reflexión", { x: 5.25, y: 1.4, w: 4.2, h: 0.5, fontSize: 17, fontFace: "Arial Black", color: C.teal, bold: true });
    s.addText("¿Qué pasaría si no seguimos los pasos en el orden correcto?", {
      x: 5.25, y: 1.95, w: 4.1, h: 1.1, fontSize: 16, fontFace: "Georgia", color: C.white, italic: true
    });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.25, y: 3.15, w: 4.1, h: 0.03, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("Seguir un orden lógico es FUNDAMENTAL para obtener el resultado esperado.", {
      x: 5.25, y: 3.25, w: 4.1, h: 1.8, fontSize: 14, fontFace: "Calibri", color: "CFD8DC"
    });
  }

  // ─── SLIDE 5: SITUACIÓN PROBLEMÁTICA ───────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.blue }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("🛒  SITUACIÓN PROBLEMÁTICA", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 22, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 9.2, h: 0.7, fill: { color: C.blue }, line: { type: "none" }, shadow: makeShadow() });
    s.addText("Ejemplo: Calcular el TOTAL de una compra", { x: 0.55, y: 1.3, w: 9, h: 0.7, fontSize: 18, fontFace: "Georgia", color: C.white, bold: true, valign: "middle" });

    const cols = [
      { title: "¿Qué datos\nnecesitamos?", color: C.teal, items: ["Precio de cada producto", "Cantidad por producto", "Número de productos"] },
      { title: "¿Cuál es el\nresultado esperado?", color: C.amber, items: ["Total a pagar por la compra", "Suma de (precio × cantidad)", "Resultado final impreso"] },
      { title: "¿Cómo organizar\nlos pasos?", color: C.blue, items: ["1. Leer precios y cantidades", "2. Multiplicar y acumular", "3. Mostrar el total"] },
    ];

    cols.forEach((col, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.2, w: 3.0, h: 3.0, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 2.2, w: 3.0, h: 0.07, fill: { color: col.color }, line: { type: "none" } });
      s.addText(col.title, { x: x + 0.1, y: 2.28, w: 2.8, h: 0.75, fontSize: 14, fontFace: "Arial Black", color: col.color, bold: true, align: "center" });
      col.items.forEach((item, j) => {
        s.addText([{ text: item, options: { bullet: true } }], {
          x: x + 0.15, y: 3.1 + j * 0.6, w: 2.75, h: 0.55, fontSize: 13, fontFace: "Calibri", color: "37474F"
        });
      });
    });
  }

  // ─── SLIDE 6: QUÉ ES UNA ESTRUCTURA SECUENCIAL ──────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.4, h: 5.625, fill: { color: C.teal }, line: { type: "none" } });

    s.addText("¿QUÉ ES UNA ESTRUCTURA", { x: 0.6, y: 0.2, w: 9, h: 0.65, fontSize: 26, fontFace: "Arial Black", color: C.white, bold: true });
    s.addText("DE CONTROL SECUENCIAL?", { x: 0.6, y: 0.8, w: 9, h: 0.65, fontSize: 26, fontFace: "Arial Black", color: C.amber, bold: true });

    // Definition box
    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.6, w: 8.8, h: 1.3, fill: { color: C.teal }, line: { type: "none" }, shadow: makeShadow() });
    s.addText('"Las estructuras secuenciales son aquellas donde las instrucciones se ejecutan en el orden en que aparecen, sin ramificaciones ni repeticiones."', {
      x: 0.8, y: 1.65, w: 8.4, h: 1.2, fontSize: 15, fontFace: "Georgia", color: C.white, italic: true, align: "center", valign: "middle"
    });

    // Characteristics
    const chars = [
      { icon: "→", title: "Un solo camino", desc: "Las instrucciones siguen un único flujo de ejecución de inicio a fin." },
      { icon: "≡", title: "Orden estricto", desc: "Cada instrucción se ejecuta exactamente una vez, en secuencia." },
      { icon: "✓", title: "Sin condiciones", desc: "No hay bifurcaciones ni saltos; el algoritmo fluye linealmente." },
    ];

    chars.forEach((c, i) => {
      const x = 0.6 + i * 3.1;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 3.1, w: 2.9, h: 2.2, fill: { color: "0D1F3C" }, line: { color: C.teal, pt: 1 }, shadow: makeShadow() });
      s.addShape(pres.shapes.OVAL, { x: x + 1.05, y: 3.15, w: 0.8, h: 0.8, fill: { color: C.teal }, line: { type: "none" } });
      s.addText(c.icon, { x: x + 1.05, y: 3.15, w: 0.8, h: 0.8, fontSize: 20, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle" });
      s.addText(c.title, { x: x + 0.1, y: 4.1, w: 2.7, h: 0.45, fontSize: 15, fontFace: "Arial Black", color: C.amber, align: "center", bold: true });
      s.addText(c.desc, { x: x + 0.1, y: 4.55, w: 2.7, h: 0.7, fontSize: 12, fontFace: "Calibri", color: "B0BEC5", align: "center" });
    });
  }

  // ─── SLIDE 7: ¿POR QUÉ USAMOS ESTRUCTURAS SECUENCIALES? ─────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.navy }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.teal }, line: { type: "none" } });
    s.addText("💡  ¿POR QUÉ USAMOS ESTRUCTURAS SECUENCIALES?", { x: 0.4, y: 0.1, w: 9.2, h: 0.9, fontSize: 20, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const reasons = [
      { title: "Simplicidad", color: C.green, icon: "⭐", desc: "Son fáciles de entender, diseñar y aplicar. Ideales para aprender los fundamentos de la algoritmia." },
      { title: "Aplicación Común", color: C.blue, icon: "⚙️", desc: "Se usan cuando los pasos a seguir no dependen de condiciones ni repeticiones: cálculos directos, conversiones de datos, etc." },
      { title: "Base de todo algoritmo", color: C.amber, icon: "🏗️", desc: "Todo algoritmo, por complejo que sea, incluye partes secuenciales. Dominar la secuencia es el primer paso." },
    ];

    reasons.forEach((r, i) => {
      const y = 1.4 + i * 1.35;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 1.15, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 0.6, h: 1.15, fill: { color: r.color }, line: { type: "none" } });
      s.addText(r.icon, { x: 0.4, y, w: 0.6, h: 1.15, fontSize: 22, align: "center", valign: "middle" });
      s.addText(r.title, { x: 1.1, y: y + 0.05, w: 8.3, h: 0.45, fontSize: 18, fontFace: "Arial Black", color: r.color, bold: true });
      s.addText(r.desc, { x: 1.1, y: y + 0.5, w: 8.3, h: 0.55, fontSize: 13, fontFace: "Calibri", color: "455A64" });
    });
  }

  // ─── SLIDE 8: EJEMPLO DE ALGORITMO SECUENCIAL ────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.teal }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("💻  EJEMPLO DE ALGORITMO SECUENCIAL", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 22, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    s.addText("Problema: Sumar dos números", { x: 0.4, y: 1.3, w: 9.2, h: 0.5, fontSize: 18, fontFace: "Georgia", color: C.navy, bold: true });

    // Steps with flow arrows
    const steps = [
      { num: "01", label: "INICIO", desc: "Comenzar el algoritmo", color: C.navy },
      { num: "02", label: "LEER", desc: "Ingresar el primer número (A)", color: C.teal },
      { num: "03", label: "LEER", desc: "Ingresar el segundo número (B)", color: C.teal },
      { num: "04", label: "CALCULAR", desc: "Suma ← A + B", color: C.blue },
      { num: "05", label: "MOSTRAR", desc: "Imprimir el valor de Suma", color: C.green },
      { num: "06", label: "FIN", desc: "Terminar el algoritmo", color: C.amber },
    ];

    steps.forEach((st, i) => {
      const col = Math.floor(i / 3);
      const row = i % 3;
      const x = 0.5 + col * 4.8;
      const y = 2.0 + row * 1.05;

      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.4, h: 0.75, fill: { color: C.white }, line: { color: st.color, pt: 2 }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.85, h: 0.75, fill: { color: st.color }, line: { type: "none" } });
      s.addText(st.num, { x, y, w: 0.85, h: 0.75, fontSize: 14, fontFace: "Consolas", color: C.white, align: "center", valign: "middle", bold: true });
      s.addText(st.label, { x: x + 0.9, y, w: 1.1, h: 0.75, fontSize: 13, fontFace: "Arial Black", color: st.color, bold: true, valign: "middle" });
      s.addText(st.desc, { x: x + 2.05, y: y + 0.05, w: 2.25, h: 0.65, fontSize: 12, fontFace: "Calibri", color: "37474F", valign: "middle" });

      // Down arrow within column (not last in each column)
      if (row < 2) {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 1.8, y: y + 0.75, w: 0.06, h: 0.2, fill: { color: C.muted }, line: { type: "none" } });
      }
    });
  }

  // ─── SLIDE 9: REPRESENTACIÓN DE ALGORITMOS ──────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.dark }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("📊  REPRESENTACIÓN DE ALGORITMOS SECUENCIALES", { x: 0.4, y: 0.1, w: 9.2, h: 0.9, fontSize: 19, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    // Diagrama de flujo panel
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 4.4, h: 4.1, fill: { color: "0D1F3C" }, line: { color: C.teal, pt: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 1.3, w: 4.4, h: 0.5, fill: { color: C.teal }, line: { type: "none" } });
    s.addText("DIAGRAMA DE FLUJO", { x: 0.4, y: 1.3, w: 4.4, h: 0.5, fontSize: 14, fontFace: "Arial Black", color: C.white, bold: true, align: "center", valign: "middle" });

    // Flowchart elements
    const fItems = [
      { shape: "OVAL", label: "INICIO", y: 1.95, fillC: C.teal },
      { shape: "RECT_PAR", label: "Leer A, B", y: 2.65, fillC: C.blue },
      { shape: "RECT", label: "Suma ← A + B", y: 3.35, fillC: C.blue },
      { shape: "RECT_PAR", label: "Mostrar Suma", y: 4.05, fillC: C.blue },
      { shape: "OVAL", label: "FIN", y: 4.75, fillC: C.teal },
    ];

    fItems.forEach((fi, i) => {
      const x = 1.0;
      if (fi.shape === "OVAL") {
        s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.4, y: fi.y, w: 2.4, h: 0.5, fill: { color: fi.fillC }, line: { type: "none" }, rectRadius: 0.25 });
      } else {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 0.4, y: fi.y, w: 2.4, h: 0.5, fill: { color: fi.fillC }, line: { type: "none" } });
      }
      s.addText(fi.label, { x: x + 0.4, y: fi.y, w: 2.4, h: 0.5, fontSize: 13, fontFace: "Calibri", color: C.white, align: "center", valign: "middle", bold: true });
      if (i < fItems.length - 1) {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 1.55, y: fi.y + 0.5, w: 0.1, h: 0.15, fill: { color: "90CAF9" }, line: { type: "none" } });
      }
    });

    // Pseudocódigo panel
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.4, h: 4.1, fill: { color: "0D1F3C" }, line: { color: C.amber, pt: 1 } });
    s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.3, w: 4.4, h: 0.5, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("PSEUDOCÓDIGO", { x: 5.2, y: 1.3, w: 4.4, h: 0.5, fontSize: 14, fontFace: "Arial Black", color: C.navy, bold: true, align: "center", valign: "middle" });

    const pseudo = [
      { text: "INICIO", color: C.teal },
      { text: "  LEER A", color: "90CAF9" },
      { text: "  LEER B", color: "90CAF9" },
      { text: "  Suma ← A + B", color: C.amber },
      { text: "  ESCRIBIR Suma", color: "A5D6A7" },
      { text: "FIN", color: C.teal },
    ];
    pseudo.forEach((p, i) => {
      s.addText(p.text, { x: 5.4, y: 1.95 + i * 0.6, w: 4.0, h: 0.5, fontSize: 15, fontFace: "Consolas", color: p.color });
    });
  }

  // ─── SLIDE 10: ESTRUCTURA DE UN ALGORITMO SECUENCIAL ────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.blue }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("🔄  ESTRUCTURA DE UN ALGORITMO SECUENCIAL", { x: 0.4, y: 0.1, w: 9.2, h: 0.9, fontSize: 20, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const phases = [
      { label: "01\nENTRADA", color: C.teal, icon: "📥", desc: "Ingreso de datos", examples: ["Lectura de teclado", "Valores iniciales", "Parámetros del problema"] },
      { label: "02\nPROCESO", color: C.blue, icon: "⚙️", desc: "Operación / Cálculo", examples: ["Operaciones aritméticas", "Asignaciones", "Transformaciones de datos"] },
      { label: "03\nSALIDA", color: C.green, icon: "📤", desc: "Resultado final", examples: ["Mostrar resultados", "Imprimir en pantalla", "Retornar valores"] },
    ];

    phases.forEach((ph, i) => {
      const x = 0.5 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.95, h: 4.0, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.3, w: 2.95, h: 1.1, fill: { color: ph.color }, line: { type: "none" } });
      s.addText(ph.icon, { x, y: 1.35, w: 2.95, h: 0.55, fontSize: 28, align: "center" });
      s.addText(ph.label, { x, y: 1.85, w: 2.95, h: 0.5, fontSize: 15, fontFace: "Arial Black", color: C.white, align: "center", bold: true });
      s.addText(ph.desc, { x: x + 0.15, y: 2.55, w: 2.65, h: 0.45, fontSize: 14, fontFace: "Georgia", color: ph.color, align: "center", bold: true, italic: true });
      ph.examples.forEach((ex, j) => {
        s.addText([{ text: ex, options: { bullet: true } }], {
          x: x + 0.2, y: 3.1 + j * 0.6, w: 2.6, h: 0.55, fontSize: 12, fontFace: "Calibri", color: "455A64"
        });
      });

      if (i < 2) {
        s.addShape(pres.shapes.RECTANGLE, { x: x + 2.95, y: 3.1, w: 0.2, h: 0.06, fill: { color: C.muted }, line: { type: "none" } });
        s.addText("→", { x: x + 2.95, y: 2.9, w: 0.2, h: 0.35, fontSize: 18, fontFace: "Arial Black", color: C.muted, align: "center" });
      }
    });
  }

  // ─── SLIDE 11: REGLAS BÁSICAS ────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.dark }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.teal }, line: { type: "none" } });
    s.addText("📋  REGLAS BÁSICAS DE LA ESTRUCTURA SECUENCIAL", { x: 0.4, y: 0.1, w: 9.2, h: 0.9, fontSize: 19, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const rules = [
      { num: "R1", color: C.teal, title: "Orden definido", desc: "Cada paso debe estar bien definido y ordenado. El algoritmo no puede tener ambigüedades en la secuencia de instrucciones." },
      { num: "R2", color: C.amber, title: "Sin decisiones ni repeticiones", desc: "No hay estructuras condicionales (si/sino) ni ciclos (mientras, para). Eso corresponde a otras estructuras de control." },
      { num: "R3", color: "64B5F6", title: "Flujo lineal", desc: "El algoritmo sigue un flujo lineal de principio a fin. Cada instrucción se ejecuta exactamente una sola vez." },
    ];

    rules.forEach((r, i) => {
      const y = 1.4 + i * 1.35;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 1.15, fill: { color: "0D1F3C" }, line: { color: r.color, pt: 1 } });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 1.0, h: 1.15, fill: { color: r.color }, line: { type: "none" } });
      s.addText(r.num, { x: 0.5, y, w: 1.0, h: 1.15, fontSize: 20, fontFace: "Arial Black", color: C.navy, align: "center", valign: "middle", bold: true });
      s.addText(r.title, { x: 1.65, y: y + 0.05, w: 7.7, h: 0.45, fontSize: 17, fontFace: "Arial Black", color: r.color, bold: true });
      s.addText(r.desc, { x: 1.65, y: y + 0.5, w: 7.7, h: 0.6, fontSize: 13, fontFace: "Calibri", color: "B0BEC5" });
    });
  }

  // ─── SLIDE 12: EJEMPLO GUIADO 1 ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.teal }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("🧮  EJEMPLO GUIADO N.° 1", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 24, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    s.addText("Problema: Calcular el total de una compra de 3 productos", { x: 0.4, y: 1.25, w: 9.2, h: 0.45, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true });

    // EPSalida 3 columns
    const epsData = [
      { label: "ENTRADA", color: C.teal, items: ["Precio del Producto 1 (P1)", "Precio del Producto 2 (P2)", "Precio del Producto 3 (P3)", "Cantidad de cada producto (Q1, Q2, Q3)"] },
      { label: "PROCESO", color: C.blue, items: ["Sub1 ← P1 × Q1", "Sub2 ← P2 × Q2", "Sub3 ← P3 × Q3", "Total ← Sub1 + Sub2 + Sub3"] },
      { label: "SALIDA", color: C.green, items: ["Mostrar Total", "(Total a pagar por la compra)", "", ""] },
    ];

    epsData.forEach((col, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.85, w: 3.0, h: 3.5, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.85, w: 3.0, h: 0.5, fill: { color: col.color }, line: { type: "none" } });
      s.addText(col.label, { x, y: 1.85, w: 3.0, h: 0.5, fontSize: 15, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", bold: true });
      col.items.forEach((item, j) => {
        if (item) {
          s.addText([{ text: item, options: { bullet: true } }], {
            x: x + 0.15, y: 2.4 + j * 0.68, w: 2.7, h: 0.62, fontSize: 12, fontFace: col.label === "PROCESO" ? "Consolas" : "Calibri", color: "37474F"
          });
        }
      });
    });

    // Formula highlight
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 5.45, w: 9.2, h: 0.07, fill: { color: C.amber }, line: { type: "none" } });
    // removed - out of bounds
  }

  // ─── SLIDE 13: EJEMPLO GUIADO 2 ────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.blue }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("📝  EJEMPLO GUIADO N.° 2", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 24, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    s.addText("Problema: Calcular el promedio de tres notas", { x: 0.4, y: 1.25, w: 9.2, h: 0.45, fontSize: 16, fontFace: "Georgia", color: C.navy, bold: true });

    const epsData2 = [
      { label: "ENTRADA", color: C.teal, items: ["Nota 1 (N1)", "Nota 2 (N2)", "Nota 3 (N3)", ""] },
      { label: "PROCESO", color: C.blue, items: ["Suma ← N1 + N2 + N3", "Promedio ← Suma / 3", "", ""] },
      { label: "SALIDA", color: C.green, items: ["Mostrar Promedio", "(Promedio de las tres notas)", "", ""] },
    ];

    epsData2.forEach((col, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.85, w: 3.0, h: 2.8, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.85, w: 3.0, h: 0.5, fill: { color: col.color }, line: { type: "none" } });
      s.addText(col.label, { x, y: 1.85, w: 3.0, h: 0.5, fontSize: 15, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", bold: true });
      col.items.forEach((item, j) => {
        if (item) {
          s.addText([{ text: item, options: { bullet: true } }], {
            x: x + 0.15, y: 2.4 + j * 0.65, w: 2.7, h: 0.6, fontSize: 13, fontFace: col.label === "PROCESO" ? "Consolas" : "Calibri", color: "37474F"
          });
        }
      });
    });

    // Pseudocode box
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.85, w: 9.2, h: 0.06, fill: { color: C.blue }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y: 4.91, w: 9.2, h: 0.6, fill: { color: "EEF2FF" }, line: { type: "none" } });
    s.addText([
      { text: "Pseudocódigo: ", options: { bold: true } },
      { text: "INICIO | LEER N1, N2, N3 | Suma ← N1+N2+N3 | Promedio ← Suma/3 | ESCRIBIR Promedio | FIN", options: { bold: false } }
    ], { x: 0.5, y: 4.93, w: 9.0, h: 0.55, fontSize: 12, fontFace: "Consolas", color: C.blue });
  }

  // ─── SLIDE 14: ACTIVIDAD 2 EN CLASE ─────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.amber }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.teal }, line: { type: "none" } });
    s.addText("✏️  ACTIVIDAD 2 — EN CLASE", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 24, fontFace: "Arial Black", color: C.navy, bold: true, align: "left", valign: "middle" });

    const acts = [
      { icon: "🔍", title: "Análisis Guiado", desc: "El docente presenta casos simples de problemas con estructuras secuenciales para análisis colectivo en el aula." },
      { icon: "📌", title: "Identificación E–P–S", desc: "Los estudiantes identifican la Entrada, el Proceso y la Salida en cada caso presentado." },
      { icon: "⚡", title: "Desarrollo de Algoritmos", desc: "Se desarrollan algoritmos secuenciales paso a paso, discutiendo el orden lógico de cada instrucción." },
    ];

    acts.forEach((a, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w: 2.95, h: 3.9, fill: { color: "0D1F3C" }, line: { color: C.amber, pt: 1 } });
      s.addText(a.icon, { x, y: 1.6, w: 2.95, h: 0.9, fontSize: 38, align: "center" });
      s.addText(a.title, { x: x + 0.1, y: 2.55, w: 2.75, h: 0.6, fontSize: 16, fontFace: "Arial Black", color: C.amber, align: "center", bold: true });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.5, y: 3.2, w: 1.95, h: 0.04, fill: { color: C.teal }, line: { type: "none" } });
      s.addText(a.desc, { x: x + 0.15, y: 3.3, w: 2.65, h: 2.0, fontSize: 13, fontFace: "Calibri", color: "B0BEC5", align: "center" });
    });

    s.addText("Método: Demostrativo  |  Técnica: Resolución guiada y modelado del procedimiento", {
      x: 0.4, y: 5.3, w: 9.2, h: 0.25, fontSize: 11, fontFace: "Calibri", color: C.muted, italic: true, align: "center"
    });
  }

  // ─── SLIDE 15: ACTIVIDAD 3 – TRABAJO EN EQUIPOS ──────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.teal }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("👥  ACTIVIDAD 3 — TRABAJO EN EQUIPOS", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 22, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const steps = [
      "Leer el problema planteado",
      "Identificar Entrada, Proceso y Salida",
      "Construir el algoritmo secuencial",
      "Representar el algoritmo en un diagrama de flujo",
      "Socializar el ejercicio con el aula",
    ];

    steps.forEach((st, i) => {
      const y = 1.35 + i * 0.83;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9.0, h: 0.65, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.7, h: 0.65, fill: { color: C.teal }, line: { type: "none" } });
      s.addText(`${i + 1}`, { x: 0.5, y, w: 0.7, h: 0.65, fontSize: 20, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", bold: true });
      s.addText(st, { x: 1.35, y: y + 0.07, w: 8.0, h: 0.5, fontSize: 16, fontFace: "Calibri", color: C.navy, valign: "middle" });
      if (i < steps.length - 1) {
        s.addShape(pres.shapes.RECTANGLE, { x: 0.82, y: y + 0.65, w: 0.06, h: 0.18, fill: { color: C.muted }, line: { type: "none" } });
      }
    });

    s.addText("Método: Cooperativo  |  Técnica: Demostración de desempeño", {
      x: 0.4, y: 5.35, w: 9.2, h: 0.23, fontSize: 11, fontFace: "Calibri", color: C.muted, italic: true, align: "center"
    });
  }

  // ─── SLIDE 16: EJERCICIOS PROPUESTOS ────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.blue }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("🏆  EJERCICIOS PROPUESTOS PARA LOS GRUPOS", { x: 0.4, y: 0.1, w: 9.2, h: 0.9, fontSize: 20, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const exercises = [
      { num: "E1", color: C.teal, title: "Compra de 5 productos", desc: "Calcular el total a pagar por la compra de 5 productos (sin aplicar descuentos)." },
      { num: "E2", color: C.blue, title: "Promedio de notas", desc: "Calcular el promedio de tres notas obtenidas en tres materias." },
      { num: "E3", color: C.amber, title: "Área de un rectángulo", desc: "Obtener el área de un rectángulo dada su base y altura (Área = base × altura)." },
      { num: "E4", color: C.green, title: "Tiempo total en minutos", desc: "Calcular el tiempo total en minutos, dado el tiempo en horas y minutos." },
      { num: "E5", color: "9C27B0", title: "Distancia total recorrida", desc: "Calcular los metros totales recorridos por un vehículo, dada la distancia por hora y el número de horas." },
    ];

    exercises.forEach((ex, i) => {
      const col = Math.floor(i / 3);
      const row = i % 3;
      const x = 0.4 + col * 4.85;
      const y = 1.35 + row * 1.38;
      const h = 1.2;

      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.55, h, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 0.75, h, fill: { color: ex.color }, line: { type: "none" } });
      s.addText(ex.num, { x, y, w: 0.75, h, fontSize: 14, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", bold: true });
      s.addText(ex.title, { x: x + 0.85, y: y + 0.05, w: 3.6, h: 0.4, fontSize: 14, fontFace: "Arial Black", color: ex.color, bold: true });
      s.addText(ex.desc, { x: x + 0.85, y: y + 0.45, w: 3.6, h: 0.7, fontSize: 12, fontFace: "Calibri", color: "455A64" });
    });
  }

  // ─── SLIDE 17: ERRORES COMUNES ───────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.red }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("⚠️  ERRORES COMUNES EN ALGORITMOS SECUENCIALES", { x: 0.4, y: 0.1, w: 9.2, h: 0.9, fontSize: 19, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const errors = [
      { icon: "❌", title: "Omitir pasos del proceso", wrong: "Calcular el total sin ingresar todos los precios", right: "Asegurarse de que CADA dato sea leído antes de usarlo", color: C.red },
      { icon: "⛔", title: "Usar símbolo incorrecto en diagrama de flujo", wrong: "Usar rombo para una operación aritmética", right: "Usar rectángulo para procesos, paralelogramo para E/S", color: "FF7043" },
      { icon: "🔀", title: "Confundir el orden de los pasos", wrong: "Mostrar el resultado antes de calcularlo", right: "Respetar el flujo: Entrada → Proceso → Salida", color: C.amber },
    ];

    errors.forEach((err, i) => {
      const y = 1.35 + i * 1.37;
      s.addShape(pres.shapes.RECTANGLE, { x: 0.4, y, w: 9.2, h: 1.15, fill: { color: "0D1F3C" }, line: { color: err.color, pt: 1 } });
      s.addText(err.icon, { x: 0.4, y, w: 0.8, h: 1.15, fontSize: 26, align: "center", valign: "middle" });
      s.addText(err.title, { x: 1.25, y: y + 0.05, w: 8.2, h: 0.38, fontSize: 16, fontFace: "Arial Black", color: err.color, bold: true });
      s.addText([
        { text: "✗  " + err.wrong, options: { color: "EF9A9A", breakLine: true } },
        { text: "✔  " + err.right, options: { color: "A5D6A7" } },
      ], { x: 1.25, y: y + 0.45, w: 8.2, h: 0.65, fontSize: 12, fontFace: "Calibri" });
    });
  }

  // ─── SLIDE 18: SOCIALIZACIÓN DE RESULTADOS ──────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.offwhite };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.green }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("🎤  SOCIALIZACIÓN DE RESULTADOS", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 23, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const items = [
      { icon: "👥", title: "Exposición grupal", desc: "Cada grupo expone su ejercicio desarrollado ante toda la clase." },
      { icon: "🔢", title: "Explica los pasos", desc: "El grupo explica cada paso del algoritmo secuencial desarrollado." },
      { icon: "🎯", title: "Justifica el orden", desc: "Justifica por qué los pasos deben ir en ese orden específico." },
    ];

    items.forEach((it, i) => {
      const x = 0.4 + i * 3.15;
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w: 3.0, h: 3.8, fill: { color: C.white }, line: { type: "none" }, shadow: makeShadow() });
      s.addShape(pres.shapes.RECTANGLE, { x, y: 1.4, w: 3.0, h: 0.07, fill: { color: C.green }, line: { type: "none" } });
      s.addText(it.icon, { x, y: 1.55, w: 3.0, h: 1.0, fontSize: 40, align: "center" });
      s.addText(it.title, { x: x + 0.15, y: 2.6, w: 2.7, h: 0.6, fontSize: 17, fontFace: "Arial Black", color: C.green, align: "center", bold: true });
      s.addShape(pres.shapes.RECTANGLE, { x: x + 0.6, y: 3.25, w: 1.8, h: 0.04, fill: { color: C.amber }, line: { type: "none" } });
      s.addText(it.desc, { x: x + 0.15, y: 3.35, w: 2.7, h: 1.8, fontSize: 14, fontFace: "Calibri", color: "455A64", align: "center" });
    });

    s.addText("Instrumento de evaluación: Lista de cotejo  |  Técnica: Observación sistemática", {
      x: 0.4, y: 5.3, w: 9.2, h: 0.25, fontSize: 11, fontFace: "Calibri", color: C.muted, italic: true, align: "center"
    });
  }

  // ─── SLIDE 19: METACOGNICIÓN ─────────────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: "1A237E" };

    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.1, fill: { color: C.dark }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 1.1, w: 10, h: 0.06, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("🧠  METACOGNICIÓN", { x: 0.4, y: 0.1, w: 9, h: 0.9, fontSize: 28, fontFace: "Arial Black", color: C.white, bold: true, align: "left", valign: "middle" });

    const questions = [
      { q: "¿Qué aprendí hoy sobre las estructuras de control secuenciales?" },
      { q: "¿Por qué es importante que las instrucciones sigan un orden lógico?" },
      { q: "¿Qué dificultades encontré al aplicar estructuras secuenciales?" },
      { q: "¿En qué situaciones de la vida diaria puedo aplicar una secuencia lógica?" },
    ];

    questions.forEach((item, i) => {
      const x = i % 2 === 0 ? 0.4 : 5.2;
      const y = i < 2 ? 1.4 : 3.5;
      s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.8, fill: { color: "0D1F3C" }, line: { color: "3949AB", pt: 1 }, shadow: makeShadow() });
      s.addShape(pres.shapes.OVAL, { x: x + 0.15, y: y + 0.15, w: 0.6, h: 0.6, fill: { color: C.amber }, line: { type: "none" } });
      s.addText("?", { x: x + 0.15, y: y + 0.15, w: 0.6, h: 0.6, fontSize: 18, fontFace: "Arial Black", color: C.navy, align: "center", valign: "middle", bold: true });
      s.addText(item.q, { x: x + 0.9, y: y + 0.15, w: 3.5, h: 1.55, fontSize: 13, fontFace: "Calibri", color: "CFD8DC" });
    });
  }

  // ─── SLIDE 20: CIERRE DE LA SESIÓN ──────────────────────────────────────
  {
    const s = pres.addSlide();
    s.background = { color: C.navy };

    // Left accent
    s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 0.35, h: 5.625, fill: { color: C.amber }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0, w: 2.5, h: 5.625, fill: { color: C.dark }, line: { type: "none" } });
    s.addShape(pres.shapes.RECTANGLE, { x: 7.5, y: 0, w: 0.08, h: 5.625, fill: { color: C.teal }, line: { type: "none" } });

    s.addText("CIERRE", { x: 0.6, y: 0.3, w: 6.5, h: 0.8, fontSize: 44, fontFace: "Arial Black", color: C.amber, bold: true });
    s.addText("de la Sesión N.° 08", { x: 0.6, y: 1.0, w: 6.5, h: 0.6, fontSize: 26, fontFace: "Georgia", color: C.white });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 1.75, w: 6.7, h: 0.04, fill: { color: C.teal }, line: { type: "none" } });

    const summaryItems = [
      { icon: "✓", text: "Estructuras secuenciales: instrucciones en orden, sin ramificaciones" },
      { icon: "✓", text: "Todo algoritmo sigue el esquema: Entrada → Proceso → Salida" },
      { icon: "✓", text: "Representación en pseudocódigo y diagrama de flujo" },
    ];
    summaryItems.forEach((it, i) => {
      s.addShape(pres.shapes.OVAL, { x: 0.6, y: 2.05 + i * 0.7, w: 0.4, h: 0.4, fill: { color: C.teal }, line: { type: "none" } });
      s.addText(it.icon, { x: 0.6, y: 2.05 + i * 0.7, w: 0.4, h: 0.4, fontSize: 13, fontFace: "Arial Black", color: C.white, align: "center", valign: "middle", bold: true });
      s.addText(it.text, { x: 1.1, y: 2.07 + i * 0.7, w: 6.1, h: 0.38, fontSize: 14, fontFace: "Calibri", color: "CFD8DC" });
    });

    s.addShape(pres.shapes.RECTANGLE, { x: 0.6, y: 4.1, w: 6.7, h: 0.04, fill: { color: C.amber }, line: { type: "none" } });
    s.addText("Próxima sesión: Estructuras de Control Condicionales", {
      x: 0.6, y: 4.2, w: 6.7, h: 0.4, fontSize: 14, fontFace: "Calibri", color: "90CAF9", italic: true
    });
    s.addText('"El orden lógico no es solo programación — es una forma de pensar."', {
      x: 0.6, y: 4.7, w: 6.7, h: 0.7, fontSize: 15, fontFace: "Georgia", color: C.amber, italic: true
    });

    // Right panel content
    s.addText("Sesión N.° 08", { x: 7.6, y: 0.5, w: 2.3, h: 0.5, fontSize: 13, fontFace: "Arial Black", color: C.amber, align: "center", bold: true });
    s.addText("Estructuras\nde Control\nSecuenciales", { x: 7.6, y: 1.2, w: 2.3, h: 1.8, fontSize: 15, fontFace: "Georgia", color: C.white, align: "center", bold: true });
    s.addShape(pres.shapes.RECTANGLE, { x: 7.7, y: 3.1, w: 2.1, h: 0.04, fill: { color: C.teal }, line: { type: "none" } });
    s.addText("Algoritmo\nde Programación\n2026-I", { x: 7.6, y: 3.2, w: 2.3, h: 1.5, fontSize: 11, fontFace: "Calibri", color: "90CAF9", align: "center" });
  }

  const outputFile = process.env.PPTX_OUTPUT || path.join(__dirname, "Sesion_08_Algoritmos.pptx");
  await pres.writeFile({ fileName: outputFile });
  console.log(`✅ Presentación creada: ${outputFile}`);
}

buildSlides().catch(console.error);
