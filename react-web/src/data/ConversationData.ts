import MongoData, { CompletedMongoData } from "@ptolemy2002/react-mongo-data";
import {
    Dependency, createProxyContext, OnChangePropCallback, OnChangeReinitCallback
} from "@ptolemy2002/react-proxy-context";
import {
    Message, Conversation, MongoConversation,
    MongoMessage, isMongoMessage,
    toMessage, toMongoMessage,
    ZodConversationSchema
} from "shared";
import { zodValidateWithErrors } from "@ptolemy2002/regex-utils";
import getApi from "src/Api";

export type ConversationRequests = {
    queryBot: () => Promise<void>;
    pull: (convoId: string | null) => Promise<void>;
    push: () => Promise<void>;
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
        const result = MongoData._useContextNonNullable<
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
            
            initial: "",
            validate: zodValidateWithErrors(ZodConversationSchema.shape.id)
        });

        this.defineProperty("name", {
            mongoName: "name",
            initial: "Untitled Conversation",
            toMongo: (name) => name,
            fromMongo: (name) => name,

            validate: zodValidateWithErrors(ZodConversationSchema.shape.name)
        });

        this.defineProperty("messages", {
            mongoName: "messages",
            initial: [],
            toMongo: (messages) => messages.map((message) => toMongoMessage(message)),
            fromMongo: (messages) => messages.map((message) => toMessage(message)),
            validate: zodValidateWithErrors(ZodConversationSchema.shape.messages)
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
                signal: ac.signal,
                cache: false
            });

            if (data.ok) {
                this.fromJSON(data.conversation);
            }
        }, {
            undoOnFail: false
        });

        this.defineRequestType("push", async function(this: CompletedConversationData, ac) {
            const api = getApi();
            const difference = this.difference({ type: ["push", "pull", "botQuery"] });
            
            const { data } = await api.post(`/conversation/update/by-id/${this.id}`, { difference }, {
                signal: ac.signal
            });

            // Ensure that the conversation is updated with the latest data.
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

    getLastModified(this: CompletedConversationData) {
        const lastMessage = this.getLastMessage();
        return lastMessage ? lastMessage.date : null;
    }
}