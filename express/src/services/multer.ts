import multer, { Options } from 'multer';
import { Request } from 'express';

export const defaultMulterOptions: Options = {
    dest: '../uploads/tmp',
};

export function createMulter(opt: Options = {}) {
    const fullOptions = { ...defaultMulterOptions, ...opt };
    return multer(fullOptions);
}