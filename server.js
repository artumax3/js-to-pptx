'use strict';

const express  = require('express');
const multer   = require('multer');
const path     = require('path');
const fs       = require('fs');
const { execFile } = require('child_process');
const { randomUUID } = require('crypto');

const app      = express();
const PORT     = process.env.PORT || 3000;
const TEMP_BASE = path.join(__dirname, '.tmp');

// Clean leftover temp dirs from previous runs
if (fs.existsSync(TEMP_BASE)) {
  fs.rmSync(TEMP_BASE, { recursive: true, force: true });
}

// ── Multer: accept only .js files up to 5 MB ──────────────────────────────
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (path.extname(file.originalname).toLowerCase() === '.js') {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos .js'));
    }
  },
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json({ limit: '5mb' }));

// ── POST /convert ──────────────────────────────────────────────────────────
app.post('/convert', upload.single('file'), async (req, res) => {
  let tempDir = null;
  try {
    let jsCode;
    let baseName = 'presentacion';

    if (req.file) {
      // File upload path
      jsCode    = req.file.buffer.toString('utf8');
      baseName  = path.basename(req.file.originalname, '.js');
    } else if (req.body?.code) {
      // JSON/code paste path
      jsCode   = req.body.code;
      baseName = (req.body.name || 'presentacion')
        .replace(/[^a-zA-Z0-9_\-\s]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .substring(0, 80) || 'presentacion';
    } else {
      return res.status(400).json({ error: 'No se proporcionó código JS o archivo.' });
    }

    // Override name from form field if present (multipart case)
    if (req.body?.name) {
      baseName = req.body.name
        .replace(/[^a-zA-Z0-9_\-\s]/g, '')
        .trim()
        .replace(/\s+/g, '_')
        .substring(0, 80) || baseName;
    }

    // Create isolated temp directory inside project tree so require() can
    // resolve node_modules by walking up to __dirname
    tempDir = path.join(TEMP_BASE, randomUUID());
    fs.mkdirSync(tempDir, { recursive: true });

    const inputFile  = path.join(tempDir, 'slide.js');
    const outputFile = path.join(tempDir, 'output.pptx');

    // ── Runner: patches pptxgenjs so ANY hardcoded path is overridden.
    //    The user's script never needs to know about PPTX_OUTPUT.
    const runnerLines = [
      "const PptxGen = require('pptxgenjs');",
      "const _origWrite = PptxGen.prototype.writeFile;",
      "const _out = " + JSON.stringify(outputFile) + ";",
      "PptxGen.prototype.writeFile = function(opts) {",
      "  return _origWrite.call(this, Object.assign({}, opts || {}, { fileName: _out }));",
      "};",
      "require(" + JSON.stringify(inputFile) + ");",
    ];
    const runnerCode = runnerLines.join('\n');
    const runnerFile = path.join(tempDir, 'runner.js');
    fs.writeFileSync(inputFile, jsCode, 'utf8');
    fs.writeFileSync(runnerFile, runnerCode, 'utf8');

    // Run via the wrapper
    const { exitCode, stderr: capturedStderr } = await new Promise((resolve) => {
      execFile(
        process.execPath,
        [runnerFile],
        {
          env:     { ...process.env, PPTX_OUTPUT: outputFile },
          cwd:     __dirname,
          timeout: 60_000,
        },
        (error, stdout, stderr) => {
          resolve({
            exitCode: error ? (error.code ?? 1) : 0,
            stderr: (stderr || '').trim(),
            stdout: (stdout || '').trim(),
          });
        }
      );
    });

    if (exitCode !== 0 || !fs.existsSync(outputFile)) {
      const detail = capturedStderr
        ? capturedStderr.substring(0, 3000)
        : 'El código finalizó sin generar el archivo PPTX.\nAsegúrate de usar:\n\n  const out = process.env.PPTX_OUTPUT || path.join(__dirname, "out.pptx");\n  await pres.writeFile({ fileName: out });';
      return res.status(500).json({ error: detail });
    }

    const pptxName = baseName + '.pptx';
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename*=UTF-8''${encodeURIComponent(pptxName)}`
    );

    const rs = fs.createReadStream(outputFile);
    rs.pipe(res);
    rs.on('close', () => cleanup(tempDir));
    rs.on('error', () => cleanup(tempDir));

  } catch (err) {
    cleanup(tempDir);
    return res.status(500).json({
      error: err.message || 'Error desconocido durante la conversión.',
    });
  }
});

function cleanup(dir) {
  if (dir) {
    try { fs.rmSync(dir, { recursive: true, force: true }); } catch { /* ignore */ }
  }
}

// ── Global error handler (handles body-parser / multer errors) ────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const status  = err.status || err.statusCode || 500;
  const message = err.message || 'Error interno del servidor.';
  if (!res.headersSent) {
    res.status(status).json({ error: message });
  }
});

app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════╗');
  console.log('║      js-to-pptx  |  Interfaz Web     ║');
  console.log('╚══════════════════════════════════════╝');
  console.log(`\n🌐 Abre en tu navegador: http://localhost:${PORT}\n`);
});
