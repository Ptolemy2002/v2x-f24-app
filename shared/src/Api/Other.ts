import { createAdvancedCondition, ValueCondition } from "@ptolemy2002/ts-utils";

export const ErrorCodeEnum = [
    "UNKNOWN",
    "BAD_INPUT",
    "BAD_URL",
    "BAD_QUERY",
    "BAD_BODY",
    "INTERNAL",
    "NOT_FOUND",
    "NOT_IMPLEMENTED",
    "VALIDATION"
] as const;

// Match the mime types of supported files
export const acceptedFileTypeCondition: ValueCondition<string> = [
    // Images except for GIF, BMP, and TIFF
    createAdvancedCondition({
        include: (v) => v.startsWith("image/"),
        exclude: (v) => {
            const [, subtype] = v.split("/");
            const excludedSubtypes = ["gif", "bmp", "tiff"];
            return excludedSubtypes.includes(subtype);
        }
    }),

    // Audio except for MIDI
    createAdvancedCondition({
        include: (v) => v.startsWith("audio/"),
        exclude: (v) => {
            const [, subtype] = v.split("/");
            const excludedSubtypes = ["midi", "x-midi"];
            return excludedSubtypes.includes(subtype);
        }
    }),
];