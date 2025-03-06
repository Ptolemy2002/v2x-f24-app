import multer, { Options } from 'multer';
import fs from 'fs';
import path from 'path';

export const tempUploadsPath = path.join(__dirname, '../../uploads/tmp');

export const defaultMulterOptions: Options = {
    dest: tempUploadsPath
};

export function createMulterOptions(opt: Options = {}) {
    return { ...defaultMulterOptions, ...opt };
}

export function createMulter(opt: Options = {}) {
    const fullOptions = createMulterOptions(opt);
    return multer(fullOptions);
}

export function cleanTempUploads(files: string[] | null = null, opt: Options = {}) {
    const dirPath = createMulterOptions(opt).dest;
    if (dirPath) {
        if (files === null) {
            // Populate the variable with all files in the directory
            fs.readdir(dirPath, (err, _files) => {
                if (err) throw err;
                files = _files;   
            });
        }

        if (!files) return;
        for (const file of files) {
            fs.unlink(path.join(dirPath, file), err => {
                if (err) throw err;
            });
        }
    }
}

console.log('multer loaded');