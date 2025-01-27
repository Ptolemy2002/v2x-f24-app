import MongoData, { CompletedMongoData } from "@ptolemy2002/react-mongo-data";
import {
    Dependency, createProxyContext, OnChangePropCallback, OnChangeReinitCallback
} from "@ptolemy2002/react-proxy-context";
import {
    Message, Conversation, MongoConversation,
    ZodUniqueMessageArraySchema,
    MongoMessage, isMongoMessage,
    toMessage, toMongoMessage
} from "shared";
import { zodValidateWithErrors } from "@ptolemy2002/regex-utils";
import getApi from "src/Api";
import { Override } from "@ptolemy2002/ts-utils";

export type ConversationRequests = {
    queryBot: () => Promise<void>;
    pull: (convoId: string | null) => Promise<void>;
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
        const result = MongoData._useContext<
            Conversation, MongoConversation, ConversationRequests, CompletedConversationData
        >(
            ConversationData.Context,
            ConversationData as unknown as new () => CompletedConversationData,
            deps,
            onChangeProp,
            onChangeReinit
        );

        return result;
    }

    static useContextNonNullable(
        deps: Dependency<CompletedConversationData>[] = ConversationData.defaultDependencies,
        onChangeProp?: OnChangePropCallback<CompletedConversationData | null>,
        onChangeReinit?: OnChangeReinitCallback<CompletedConversationData | null>
    ) {
        // This is registered as a hook to be used in a class component.
        // However, that's not what we're doing here, so we disable the rule.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const result = ConversationData.useContext(deps, onChangeProp, onChangeReinit);

        if (result === null) throw new Error("Expected ConversationData to be provided, but it was not.");
        return result as Override<typeof result, {
            data: Exclude<typeof result["data"], null>;
            0: Exclude<typeof result[0], null>;
        }>;
    }

    // We use this create method instead of a constructor to allow for
    // adding the properties and request types in a fluent way.
    // constructors don't allow for different return types.
    static create() {
        return new ConversationData() as CompletedConversationData;
    }

    constructor() {
        super();

        this.defineProperty("id", {
            mongoName: "_id",
            toMongo: (id) => id,
            fromMongo: (id) => id,
            
            initial: ""
        });

        this.defineProperty("name", {
            mongoName: "name",
            initial: "Untitled Conversation",
            toMongo: (name) => name,
            fromMongo: (name) => name
        });

        this.defineProperty("messages", {
            mongoName: "messages",
            initial: [],
            toMongo: (messages) => messages.map((message) => toMongoMessage(message)),
            fromMongo: (messages) => messages.map((message) => toMessage(message)),
            validate: zodValidateWithErrors(ZodUniqueMessageArraySchema)
        });

        this.defineRequestType("queryBot", async function(this: CompletedConversationData, ac) {
            const api = getApi();
            const { data } = await api.post("/bot/query", {
                conversation: this.toJSON()
            }, {
                signal: ac.signal
            });

            if (data.ok) {
                this.addMessage(data.newMessage);
            }
        }, {
            undoOnFail: false
        });

        this.defineRequestType("pull", async function(this: CompletedConversationData, ac, convoId) {
            const api = getApi();
            const { data } = await api.get(`/conversation/get/${convoId}`, {
                signal: ac.signal
            });

            if (data.ok) {
                this.fromJSON(data.conversation);
            }
        }, {
            undoOnFail: false
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