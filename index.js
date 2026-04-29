#!/usr/bin/env node
/**
 * js-to-pptx — CLI para convertir archivos JS de diapositivas a PPTX
 *
 * Uso:
 *   node index.js <archivo.js> [directorio-salida]
 *
 * Ejemplos:
 *   node index.js sesion08.js
 *   node index.js sesion08.js ./output
 */

const path = require("path");
const fs = require("fs");

const [, , inputFile, outputDir] = process.argv;

if (!inputFile) {
  console.error("╔══════════════════════════════════════╗");
  console.error("║         js-to-pptx  Conversor        ║");
  console.error("╚══════════════════════════════════════╝");
  console.error("");
  console.error("Uso:     node index.js <archivo.js> [directorio-salida]");
  console.error("Ejemplo: node index.js sesion08.js");
  console.error("Ejemplo: node index.js sesion08.js ./output");
  process.exit(1);
}

const absInput = path.resolve(inputFile);

if (!fs.existsSync(absInput)) {
  console.error(`❌ Archivo no encontrado: ${absInput}`);
  process.exit(1);
}

const outDir = outputDir ? path.resolve(outputDir) : path.dirname(absInput);
const baseName = path.basename(absInput, ".js") + ".pptx";
const outputPath = path.join(outDir, baseName);

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

process.env.PPTX_OUTPUT = outputPath;

console.log("╔══════════════════════════════════════╗");
console.log("║         js-to-pptx  Conversor        ║");
console.log("╚══════════════════════════════════════╝");
console.log(`📄 Archivo:  ${inputFile}`);
console.log(`📁 Salida:   ${outputPath}`);
console.log("");

require(absInput);
