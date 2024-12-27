import {
    OpenAPIRegistry,
    extendZodWithOpenApi
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);
export const swaggerRegistry = new OpenAPIRegistry();