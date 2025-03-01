import { valueConditionMatches } from "@ptolemy2002/ts-utils";
import { swaggerRegistry } from "src/Swagger";
import { z } from "zod";
import { acceptedFileTypeCondition, AllMimeTypes } from "../Other";

type NonEmptyStringArray = [string, ...string[]];

export const ZodFileMimeTypeSchema = swaggerRegistry.register(
    "FileMimeType",
    z.enum(
        AllMimeTypes.filter(v => valueConditionMatches(v, acceptedFileTypeCondition)) as NonEmptyStringArray,
        {
            message: "Invalid or unsupported file type"
        }
    )
);

export type FileMimeType = z.infer<typeof ZodFileMimeTypeSchema>;