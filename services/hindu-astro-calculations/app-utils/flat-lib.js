import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Version
const version = '0.2.3';

// Library and resource paths
const PATH_LIB = __dirname + path.sep;
const PATH_RES = PATH_LIB + 'resources' + path.sep;

export default {PATH_RES, version};
