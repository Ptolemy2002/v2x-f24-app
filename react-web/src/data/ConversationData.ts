import MongoData, { CompletedMongoData } from "@ptolemy2002/react-mongo-data";
import {
    Dependency, createProxyContext, OnChangePropCallback, OnChangeReinitCallback
} from "@ptolemy2002/react-proxy-context";
import {
    Message, Conversation, MongoConversation,
    UniqueMessageArraySchema,
    BotQueryResponseBody,
    MongoMessage, isMongoMessage,
    toMessage, toMongoMessage
} from "shared";
import { zodValidateWithErrors } from "@ptolemy2002/regex-utils";
import getApi from "src/Api";

export type DefaultResponseData = {
    type: string;
    triggers?: string[];
    text?: string;
    src?: string;
    alt?: string;
};

export type ConversationRequests = {
    queryBot: () => Promise<void>;
};

export type CompletedConversationData = ConversationData & CompletedMongoData<
    Conversation,
    MongoConversation,
    ConversationRequests
>;

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
        onChangeProp?: OnChangePropCallback<CompletedConversationData | null>,
        onChangeReinit?: OnChangeReinitCallback<CompletedConversationData | null>
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
            toMongo: (messages) => messages.map((message) => toMongoMessage(message)),
            fromMongo: (messages) => messages.map((message) => toMessage(message)),
            validate: zodValidateWithErrors(UniqueMessageArraySchema)
        });

        this.defineRequestType("queryBot", async function(this: CompletedConversationData) {
            const api = getApi();
            const { status, data } = await api.post<BotQueryResponseBody>("/bot/query", {
                conversation: this.toJSON()
            });

            if (data.ok) {
                this.addMessage(data.newMessage);
            } else {
                console.error("Failed to query bot with status", status, "and data", data);
            }
        });
    }

    addMessage(this: CompletedConversationData, message: Message | MongoMessage) {
        // updateProp ensures we create a new object so that the proxy recognizes the change.
        // It is not necessary for primitive values, but it is necessary for objects and arrays.
        return this.updateProp("messages", (messages) => {
            if (isMongoMessage(message)) message = toMessage(message);
            messages.push(message);
        });
    }

    getLastMessage(this: CompletedConversationData) {
        if (this.messages.length === 0) return null;
        return this.messages[this.messages.length - 1];
    }
}