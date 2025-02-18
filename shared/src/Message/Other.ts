import { MongoConversation } from "./Zod";

export const MessageOriginEnum = [
    "sender", "recepient"
] as const;

export const MessageTypeEnum = [
    "text", "image", "audio"
] as const;

// 0 indicates the key can have a number as one of its key values
export const MongoConversationChildPathLookup: Readonly<Record<keyof MongoConversation, (0 | string)[]>> = {
    _id: [],
    name: [],
    createdAt: [],
    messages: [0],
    files: [],
} as const;

export function parseConversationPath(
    path: string,
    allowed?: {
        key: keyof MongoConversation,
        allowDirect?: boolean,
        allowNested?: boolean
    }[]
): boolean {
    if (!allowed) allowed = Object.keys(MongoConversationChildPathLookup).map(key => ({key: key as keyof MongoConversation}));

    const pattern = `^(${
        allowed.map(({key}) => key).join("|")
    })(\.([^\.]+))?`;
    const regex = new RegExp(pattern);

    const match = path.match(regex);
    if (!match) return false;

    const [, key,, value] = match;
    const {
        allowDirect: allowedDirect = true,
        allowNested: allowedNested = true
    } = allowed.find(({key: k}) => k === key) ?? {};

    if (value === undefined) return allowedDirect;

    const lookup = MongoConversationChildPathLookup[key as keyof MongoConversation];
    if (lookup === undefined) return false;

    if (allowedNested && lookup.includes(0)) {
        try {
            parseInt(value);
            return true;
        } catch {
            return lookup.includes(value);
        }
    }

    return allowedNested && lookup.includes(value);
}