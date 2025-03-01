import { valueConditionMatches } from "@ptolemy2002/ts-utils";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { acceptedFileTypes } from "../Other";

export const ZodFileMimeTypeSchema = swaggerRegistry.register(
    "FileMimeType",
    z.enum(
        acceptedFileTypes,
        {
            message: "Invalid or unsupported file type"
        }
    )
);

export type FileMimeType = z.infer<typeof ZodFileMimeTypeSchema>;