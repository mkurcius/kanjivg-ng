import * as fs from 'fs';
import * as path from 'path';

const PACKAGE_JSON = path.join(__dirname, 'package.json');
const DIST_PACKAGE_JSON = path.join(__dirname, 'dist/kanjivg-ng/package.json');

const packageJson = require(PACKAGE_JSON);
const distPackageJson = require(DIST_PACKAGE_JSON);

distPackageJson.version = packageJson.version;
fs.writeFileSync(DIST_PACKAGE_JSON, JSON.stringify(distPackageJson, null, 2));
