import MongoData, { CompletedMongoData } from "@ptolemy2002/react-mongo-data";
import {
    Dependency, createProxyContext, OnChangePropCallback, OnChangeReinitCallback
} from "@ptolemy2002/react-proxy-context";
import { nanoid } from "nanoid";
import defaultResponses from "src/data/default-responses.json";

// The message can only originate from the sender or the recipient.
export type SpeechBubbleMessageOrigin = "sender" | "recepient";

// Define the base separately to reduce repetition.
export type SpeechBubbleMessageBase<T extends string, Mongo extends boolean = false> = {
    id: string,
    origin: SpeechBubbleMessageOrigin;
    type: T;
    date: Mongo extends true ? string : Date;
};

// SpeechBubbleText will take a message object as well as the default properties for a speech bubble.
export type SpeechBubbleTextMessage<Mongo extends boolean = false> = {
    text: string;
} & SpeechBubbleMessageBase<"text", Mongo>;

// SpeechBubbleImage will take a src and alt attribute as well as the default properties for a speech bubble.
export type SpeechBubbleImageMessage<Mongo extends boolean = false> = {
    src: string;
    alt?: string;
} & SpeechBubbleMessageBase<"image", Mongo>;

// SpeechBubbleAudio will take a src attribute as well as the default properties for a speech bubble.
export type SpeechBubbleAudioMessage<Mongo extends boolean = false> = {
    src: string;
} & SpeechBubbleMessageBase<"audio", Mongo>;

// Combined type for any speech bubble message.
export type SpeechBubbleMessage = SpeechBubbleTextMessage | SpeechBubbleImageMessage | SpeechBubbleAudioMessage;
export type MongoSpeechBubbleMessage = SpeechBubbleTextMessage<true> | SpeechBubbleImageMessage<true> | SpeechBubbleAudioMessage<true>;

// Combined type for all different types options for speech bubble messages.
export type SpeechBubbleMessageType = SpeechBubbleMessage["type"];

// Get the message object of the specified type where the type is just a string.
export type SpeechBubbleMessageOfType<
    T extends SpeechBubbleMessageType,
    Mongo extends boolean = false
> = Extract<
    Mongo extends true ? MongoSpeechBubbleMessage : SpeechBubbleMessage,
    { type: T }
>;

// Get the properties that are exclusive to the speech bubble of specified type
// (i.e. included in the specified speech bubble type but not in the base type).
export type SpeechBubbleMessageExclusiveProps<T extends SpeechBubbleMessageType, Mongo extends boolean = false> =
    Omit<SpeechBubbleMessageOfType<T, Mongo>, keyof SpeechBubbleMessageBase<T, Mongo>>;

export type DefaultResponseData = {
    type: string;
    triggers?: string[];
    text?: string;
    src?: string;
    alt?: string;
};

export type Conversation = {
    messages: SpeechBubbleMessage[];
};

export type MongoConversation = {
    messages: MongoSpeechBubbleMessage[];
};

export type ConversationRequests = {
    queryBot: () => Promise<void>;
};

export type CompletedConversationData = ConversationData & CompletedMongoData<
    Conversation,
    MongoConversation,
    ConversationRequests
>;

function cleanText(text: string): string {
    // Convert to lowercase
    text = text.toLowerCase();
    // Replace non-alphanumeric characters with spaces
    text = text.replace(/[^a-z0-9]/g, " ");
    // Replace multiple spaces with a single space
    text = text.replace(/\s+/g, " ");
    // Remove leading and trailing whitespace
    text = text.trim();
    return text;
}

function findMatchingResponse(text: string): DefaultResponseData | null {
    text = cleanText(text);
    for (const response of defaultResponses.other) {
        for (const trigger of (response.triggers ?? [])) {
            if (text === cleanText(trigger)) {
                return response;
            }
        }
    }

    return null;
}

export function createMessage<T extends SpeechBubbleMessageType, Mongo extends boolean = false>(
    type: T,
    origin: SpeechBubbleMessageOrigin,
    constructMessage: () => SpeechBubbleMessageExclusiveProps<T>,
    mongo?: Mongo,
    id?: string
) {
    return ({
                ...constructMessage(),
                id: id ?? nanoid(),
                origin,
                type,
                date: mongo ? new Date().toISOString() : new Date()
            } as SpeechBubbleMessageOfType<T, Mongo>
    );
}

export default class ConversationData extends MongoData<
    Conversation,
    MongoConversation,
    ConversationRequests
> {
    static defaultDependencies: Dependency<CompletedConversationData>[] = [
        ...MongoData._defaultDependencies,
        "messages"
    ];

    static Context = createProxyContext<CompletedConversationData | null>("ConversationContext");
    static Provider = MongoData.createProvider<
        Conversation,
        MongoConversation,
        ConversationRequests,
        CompletedConversationData
    >(
        ConversationData.Context,
        ConversationData as unknown as new () => CompletedConversationData
    );

    static useContext(
        deps: Dependency<CompletedConversationData>[] = ConversationData.defaultDependencies,
        onChangeProp?: OnChangePropCallback<CompletedConversationData>,
        onChangeReinit?: OnChangeReinitCallback<CompletedConversationData>
    ) {
        return MongoData._useContext<
            Conversation, MongoConversation, ConversationRequests, CompletedConversationData
        >(
            ConversationData.Context,
            ConversationData as unknown as new () => CompletedConversationData,
            deps,
            onChangeProp,
            onChangeReinit
        );
    }

    // We use this create method instead of a constructor to allow for
    // adding the properties and request types in a fluent way.
    // constructors don't allow for different return types.
    static create() {
        return new ConversationData() as CompletedConversationData;
    }

    constructor() {
        super();

        this.defineProperty("messages", {
            mongoName: "messages",
            initial: [],
            toMongo: (messages) => messages.map((message) => ({
                ...message,
                date: message.date.toISOString()
            })),

            fromMongo: (messages) => messages.map((message) => ({
                ...message,
                date: new Date(message.date)
            })),

            validate: (messages) => {
                // Ensure there are no messages with the same ID.
                const ids = new Set<string>();
                for (const message of messages) {
                    if (ids.has(message.id)) {
                        return "Duplicate message IDs found.";
                    }
                    ids.add(message.id);
                }
                return true;
            }
        });

        this.defineRequestType("queryBot", async function(this: CompletedConversationData) {
            // CompletedConversationData is all just to simulate an API call. The actual implementation
            // would be much less code.
            await new Promise((resolve) => setTimeout(resolve, Math.random() * 4000 + 1000));
            
            const lastMessage = this.getLastMessage();

            if (!lastMessage) {
                // This is the first message, so we'll just greet the user.
                this.addMessage(createMessage("text", "recepient", () => ({
                    text: "Greetings! How can I help you today?"
                })));
                return;
            }
            
            let response: DefaultResponseData = defaultResponses["[default]"];
            if (lastMessage.type === "image") {
                response = defaultResponses["[image]"];
            } else if (lastMessage.type === "audio") {
                response = defaultResponses["[audio]"];
            } else {
                const matchingResponse = findMatchingResponse(lastMessage.text);
                if (matchingResponse) {
                    response = matchingResponse;
                }
            }

            if (response.type === "text") {
                this.addMessage(createMessage("text", "recepient", () => ({
                    text: response.text ?? "[No text provided]"
                })));
                return;
            } else if (response.type === "image") {
                if (!response.src) {
                    this.addMessage(createMessage("text", "recepient", () => ({
                        text: "I'm sorry, I had trouble sending an image."
                    })));
                    return;
                } else {
                    this.addMessage(createMessage("image", "recepient", () => ({
                        src: response.src!,
                        alt: response.alt ?? "[No alt text provided]"
                    })));
                    return;
                }
            } else if (response.type === "audio") {
                if (!response.src) {
                    this.addMessage(createMessage("text", "recepient", () => ({
                        text: "I'm sorry, I had trouble sending an audio message."
                    })));
                    return;
                } else {
                    this.addMessage(createMessage("audio", "recepient", () => ({
                        src: response.src!
                    })));
                    return;
                }
            }
        });
    }

    addMessage(this: CompletedConversationData, message: SpeechBubbleMessage) {
        // updateProp ensures we create a new object so that the proxy recognizes the change.
        // It is not necessary for primitive values, but it is necessary for objects and arrays.
        return this.updateProp("messages", (messages) => {
            messages.push(message);
        });
    }

    getLastMessage(this: CompletedConversationData) {
        if (this.messages.length === 0) return null;
        return this.messages[this.messages.length - 1];
    }
}