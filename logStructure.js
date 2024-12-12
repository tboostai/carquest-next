import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname manually
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define folders or files to ignore
const ignoreList = ['node_modules', '.git', 'dist', '.DS_Store'];

function logFolderStructure(dir, indent = '') {
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        if (ignoreList.includes(file)) {
            return; // Skip ignored folders/files
        }

        const fullPath = path.join(dir, file);
        const isDirectory = fs.lstatSync(fullPath).isDirectory();

        console.log(`${indent}${isDirectory ? '📁' : '📄'} ${file}`);
        if (isDirectory) {
            logFolderStructure(fullPath, indent + '  ');
        }
    });
}

// Start logging from the current directory
const projectRoot = __dirname;
console.log('Project Folder Structure (excluding ignored folders/files):');
logFolderStructure(projectRoot);
