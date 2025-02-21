import multer, { Options } from 'multer';
import fs from 'fs';

export const tempUploadsPath = 'uploads/tmp';

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
    const path = createMulterOptions(opt).dest;
    if (path) fs.rmSync(path, { recursive: true });
}
