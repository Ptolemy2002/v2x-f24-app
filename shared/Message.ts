import { nanoid } from "nanoid";

// The message can only originate from the sender or the recipient.
export type MessageOrigin = "sender" | "recepient";

// Define the base separately to reduce repetition.
export type MessageBase<T extends string, Mongo extends boolean = false> = {
    id: string,
    origin: MessageOrigin;
    type: T;
    date: Mongo extends true ? string : Date;
};

export type TextMessage<Mongo extends boolean = false> = {
    text: string;
} & MessageBase<"text", Mongo>;

export type ImageMessage<Mongo extends boolean = false> = {
    src: string;
    alt?: string;
} & MessageBase<"image", Mongo>;

export type AudioMessage<Mongo extends boolean = false> = {
    src: string;
} & MessageBase<"audio", Mongo>;

// Combined type for any speech bubble message.
export type Message = TextMessage | ImageMessage | AudioMessage;
export type MongoMessage = TextMessage<true> | ImageMessage<true> | AudioMessage<true>;

// Combined type for all different types options for speech bubble messages.
export type MessageType = Message["type"];

// Get the message object of the specified type where the type is just a string.
export type MessageOfType<
    T extends MessageType,
    Mongo extends boolean = false
> = Extract<
    Mongo extends true ? MongoMessage : Message,
    { type: T }
>;

// Get the properties that are exclusive to the speech bubble of specified type
// (i.e. included in the specified speech bubble type but not in the base type).
export type MessageExclusiveProps<T extends MessageType, Mongo extends boolean = false> =
    Omit<MessageOfType<T, Mongo>, keyof MessageBase<T, Mongo>>;

export function createMessage<T extends MessageType, Mongo extends boolean = false>(
    type: T,
    origin: MessageOrigin,
    constructMessage: () => MessageExclusiveProps<T>,
    mongo?: Mongo,
    id?: string
) {
    return ({
        ...constructMessage(),
        id: id ?? nanoid(),
        origin,
        type,
        date: mongo ? new Date().toISOString() : new Date()
    } as MessageOfType<T, Mongo>);
}