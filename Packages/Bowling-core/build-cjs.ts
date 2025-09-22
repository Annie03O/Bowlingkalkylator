
// skapar en CJS-wrapper från ESM-utmatning
const fs = require('fs'); 
const esm = fs.readFileSync('./dist/index.mts', 'utf8');
fs.writeFileSync('./dist/index.cts', esm.replace(/export /g, '').replace(/from /g, 'from '));
