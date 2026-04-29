# js-to-pptx

Convierte archivos JS que definen diapositivas (usando **pptxgenjs**) en presentaciones PowerPoint `.pptx`.

## Requisitos

- Node.js 18+
- Dependencias instaladas: `npm install`

## Uso

```bash
# Forma directa
node index.js <archivo.js> [directorio-salida]

# Via npm
npm run convert -- <archivo.js> [directorio-salida]
```

### Ejemplos

```bash
# Genera sesion08.pptx en la misma carpeta que el archivo
node index.js sesion08.js

# Genera sesion08.pptx en ./output/
node index.js sesion08.js ./output

# Atajo npm para el ejemplo incluido
npm run example
```

## Estructura de un archivo de diapositivas

Cada archivo JS debe usar `pptxgenjs` para construir la presentación y llamar a `pres.writeFile()`. El CLI inyecta la ruta de salida automáticamente via la variable de entorno `PPTX_OUTPUT`.

```js
const pptxgen = require("pptxgenjs");
const path = require("path");

async function buildSlides() {
  const pres = new pptxgen();
  // ... agregar diapositivas ...
  const outputFile = process.env.PPTX_OUTPUT || path.join(__dirname, "mi_presentacion.pptx");
  await pres.writeFile({ fileName: outputFile });
  console.log(`✅ Presentación creada: ${outputFile}`);
}

buildSlides().catch(console.error);
```

## Ejemplo incluido

- **`sesion08.js`** — Sesión 8: Estructuras de Control Secuenciales (20 diapositivas, tema Ocean/Tech)

## Dependencias

| Paquete | Uso |
|---|---|
| `pptxgenjs` | Generación de archivos PPTX |
| `react` + `react-dom` | Renderizado de íconos SVG |
| `react-icons` | Biblioteca de íconos |
| `sharp` | Conversión SVG → PNG para imágenes embebidas |
usa con responsavilidad 
