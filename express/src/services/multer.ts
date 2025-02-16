import multer, { Options } from 'multer';
import fs from 'fs';

export const defaultMulterOptions: Options = {
    dest: 'uploads/tmp',
};

export function createMulterOptions(opt: Options = {}) {
    return { ...defaultMulterOptions, ...opt };
}

export function createMulter(opt: Options = {}) {
    const fullOptions = createMulterOptions(opt);
    return multer(fullOptions);
}

export function cleanMulterUploads(opt: Options = {}) {
    const path = createMulterOptions(opt).dest;
    if (path) fs.rmdirSync(path, { recursive: true });
}
