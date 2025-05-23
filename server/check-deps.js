import { readFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');

const dependencies = [
  'express',
  'bcrypt',
  'body-parser',
  'cloudinary',
  'cookie-parser',
  'cors',
  'dotenv',
  'joi',
  'jsonwebtoken',
  'mongoose',
  'multer'
];

dependencies.forEach(dep => {
  try {
    const pkgPath = join(__dirname, 'node_modules', dep, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    console.log(`${dep}: type = ${pkg.type || 'not specified'}`);
  } catch (error) {
    console.log(`${dep}: Error reading package.json`);
  }
}); 