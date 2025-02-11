import { ValueCondition, createAdvancedCondition, valueConditionMatches } from '@ptolemy2002/ts-utils';
import { extensions } from "mime-types";

const allMimeTypes = Object.keys(extensions);

// Match the mime types of supported files
export const fileMimeTypeCondition: ValueCondition<string> = [
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

export const acceptedMimeTypes = allMimeTypes.filter((v) => valueConditionMatches(v, fileMimeTypeCondition));