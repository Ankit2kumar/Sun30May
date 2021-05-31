import fs from 'fs-extra';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { readJSON, writeJSON } = fs;

const currentFilePath = fileURLToPath(import.meta.url);
const currentFolderPath = dirname(currentFilePath);
const productJSONPath = join(currentFolderPath, '../data/products.json');

export const getProducts = async () => {
	return await readJSON(productJSONPath);
};

export const writeProduct = async (content) => {
	return await writeJSON(productJSONPath, content);
};
