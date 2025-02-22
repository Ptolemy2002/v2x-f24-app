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

export function cleanTempUploads(opt: Options = {}) {
    const dirPath = createMulterOptions(opt).dest;
    if (dirPath) {
        fs.readdir(dirPath, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(dirPath, file), err => {
                    if (err) throw err;
                });
            }
        });
    }
}

console.log('multer loaded');