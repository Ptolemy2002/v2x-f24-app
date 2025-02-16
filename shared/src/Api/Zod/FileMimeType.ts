import { valueConditionMatches } from "@ptolemy2002/ts-utils";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { acceptedFileTypeCondition } from "../Other";

export const ZodFileMimeTypeSchema = swaggerRegistry.register(
    "FileMimeType",
    z.string().refine((v) => valueConditionMatches(v, acceptedFileTypeCondition), {
        message: "Invalid or unsupported file type"
    }).openapi({
        description: "The MIME type of a file",
        example: "image/png"
    })
);

export type FileMimeType = z.infer<typeof ZodFileMimeTypeSchema>;