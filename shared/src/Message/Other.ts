import { OptionalValueCondition, valueConditionMatches, ValueOf } from "@ptolemy2002/ts-utils";
import { MongoConversation } from "./Zod";

export const MessageOriginEnum = [
    "sender", "recepient"
] as const;

export const MessageTypeEnum = [
    "text", "image", "audio"
] as const;

export const MongoConversationPaths = [
    "_id",
    "name",
    "createdAt",

    "messages",
    "messages.<number>",
    
    "messages.<number>.id",
    "messages.<number>.date",
    "messages.<number>.origin",
    "messages.<number>.type",

    "messages.<number>.text",
    "messages.<number>.src",
    "messages.<number>.alt",

    "files",
    "files.<string>",
    "files.<string>.key",
    "files.<string>.url",
    "files.<string>.alt"
 ] as const;

export function parseConversationPath(
    input: string,
    pathCondition: OptionalValueCondition<ValueOf<typeof MongoConversationPaths>> = null
): boolean {
    const inputWords = input.split(".");
    
    const paths = MongoConversationPaths.filter(p => valueConditionMatches(p, pathCondition));
    for (const path of paths) {
        const pathWords = path.split(".");
        if (inputWords.length !== pathWords.length) continue;

        let match = true;
        for (let i = 0; i < inputWords.length; i++) {
            if (pathWords[i] === "<number>") {
                if (!(/^\d+$/.test(inputWords[i]))) {
                    match = false;
                    break;
                }
            } else if (pathWords[i] === "<string>") {
                if (inputWords[i] === "") {
                    match = false;
                    break;
                }
            } else if (pathWords[i] !== inputWords[i]) {
                match = false;
                break;
            }
        }

        if (match) return true;
    }

    return false;
}