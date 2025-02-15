import path from 'path';
import { fileURLToPath } from 'url';
import flatlib from '../app-utils/flat-lib.js';
import swe from './swe.js'; // Assuming 'swe.js' is the equivalent of the Python 'swe' module

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set default swefile path
swe.setPath(path.join(flatlib.PATH_RES, 'swefiles'));

// Configure swefile path
export function setPath(customPath) {
    swe.setPath(customPath);
}