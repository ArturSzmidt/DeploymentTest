import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), '../data');

export const getBooks = () => readJSON(join(dataFolderPath, 'books.json'));
