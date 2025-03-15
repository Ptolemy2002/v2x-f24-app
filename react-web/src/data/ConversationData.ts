import MongoData, { CompletedMongoData } from "@ptolemy2002/react-mongo-data";
import {
    Dependency, createProxyContext, OnChangePropCallback, OnChangeReinitCallback
} from "@ptolemy2002/react-proxy-context";
import {
    Message, Conversation, MongoConversation,
    MongoMessage, isMongoMessage,
    toMessage, toMongoMessage,
    ZodConversationSchema,
    isAnonymousID
} from "shared";
import { zodValidateWithErrors } from "@ptolemy2002/regex-utils";
import { omit } from "@ptolemy2002/ts-utils";
import getApi, { RouteIds } from "src/Api";

export type ConversationRequests = {
    queryBot: () => Promise<void>;
    pull: () => Promise<void>;
    push: () => Promise<void>;
    delete: () => Promise<void>;
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
    static defaultDependencies: Dependency<CompletedConversationData | null>[] = [
        ...MongoData._defaultDependencies,
        "messages",
        "createdAt"
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
        deps: Dependency<CompletedConversationData | null>[] = ConversationData.defaultDependencies,
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
        deps: Dependency<CompletedConversationData | null>[] = ConversationData.defaultDependencies,
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

        this.defineProperty("createdAt", {
            mongoName: "createdAt",
            initial: new Date(),
            toMongo: (createdAt) => createdAt.toISOString(),
            fromMongo: (createdAt) => new Date(createdAt),

            validate: zodValidateWithErrors(ZodConversationSchema.shape.createdAt),
            readOnly: true
        });

        this.defineProperty("files", {
            mongoName: "files",
            initial: {},
            toMongo: (files) => files,
            fromMongo: (files) => files,

            validate: zodValidateWithErrors(ZodConversationSchema.shape.files)
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

        this.defineRequestType("pull", async function(this: CompletedConversationData, ac) {
            if (this.id.length === 0) throw new Error("Cannot pull conversation without an ID");

            let data;
            if (this.isAnonymous()) {
                data = (await getApi().post("/conversation/new", null, {
                    params: { a: "y" },
                    signal: ac.signal
                })).data;
            } else {
                const api = getApi();
                data = (await api.get(`/conversation/get/${this.id}`, {
                    signal: ac.signal,
                    cache: false
                })).data;
            }

            if (data.ok) {
                if (this.isAnonymous()) {
                    // We omit the _id field so it is not overwritten, since it will be a new ID.
                    this.fromJSON(omit(data.conversation, "_id"));
                } else {
                    this.fromJSON(data.conversation);
                }
            }
        }, {
            undoOnFail: false
        });

        this.defineRequestType("push", async function(this: CompletedConversationData, ac) {
            if (this.id.length === 0) throw new Error("Cannot push conversation without an ID");
            if (this.isAnonymous()) throw new Error("Cannot push anonymous conversation");

            const api = getApi();
            const difference = this.difference({ type: ["push", "pull", "botQuery"] });
            
            const { data } = await api.post(`/conversation/update/${this.id}`, { difference }, {
                signal: ac.signal,
                id: RouteIds.conversationUpdate
            });

            // Ensure that the conversation is updated with the latest data.
            if (data.ok) {
                this.fromJSON(data.conversation);
            }
        }, {
            undoOnFail: false
        });

        this.defineRequestType("delete", async function(this: CompletedConversationData, ac) {
            if (this.id.length === 0) throw new Error("Cannot delete conversation without an ID");
            if (this.isAnonymous()) throw new Error("Cannot delete anonymous conversation");

            const api = getApi();
            await api.delete(`/conversation/delete/${this.id}`, {
                signal: ac.signal,
                id: RouteIds.conversationDelete
            });
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
        return lastMessage ? lastMessage.date : this.createdAt;
    }

    isAnonymous(this: CompletedConversationData) {
        return isAnonymousID(this.id);
    }
}