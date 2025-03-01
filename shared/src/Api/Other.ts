import { createAdvancedCondition, ValueCondition, valueConditionMatches } from "@ptolemy2002/ts-utils";
import {extensions} from "mime-types";

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

// This is part of @ptolemy2002/react-file-picker
// but we copy it here since we are not currently using React
// and don't want to add a dependency just for this
// value
export const AllMimeTypes: string[] = Object.keys(extensions) as any;

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

type NonEmptyStringArray = [string, ...string[]];
export const acceptedFileTypes = AllMimeTypes.filter(v => valueConditionMatches(v, acceptedFileTypeCondition)) as NonEmptyStringArray;