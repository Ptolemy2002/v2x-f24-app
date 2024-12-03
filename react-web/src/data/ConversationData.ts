import MongoData, { CompletedMongoData } from "@ptolemy2002/react-mongo-data";
import {
    Dependency, createProxyContext, OnChangePropCallback, OnChangeReinitCallback
} from "@ptolemy2002/react-proxy-context";
import {
    Message, Conversation, MongoConversation,
    UniqueMessageArraySchema,
    BotQueryResponseBody,
    MongoMessage, isMongoMessage,
    toMessage, toMongoMessage,
    createMessage
} from "shared";
import { zodValidateWithErrors } from "@ptolemy2002/regex-utils";
import getApi from "src/Api";
import { AdvancedCondition } from "@ptolemy2002/ts-utils";

export type DefaultResponseData = {
    type: string;
    triggers?: string[];
    text?: string;
    src?: string;
    alt?: string;
};

export type ConversationRequests = {
    queryBot: () => Promise<void>;
    pull: (convoId: string | null) => Promise<void>;
};

export type CompletedConversationData = ConversationData & CompletedMongoData<
    Conversation,
    MongoConversation,
    ConversationRequests
>;

export class ConversationRequestAdvancedCondition extends AdvancedCondition<keyof ConversationRequests> {}

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

        this.defineProperty("id", {
            mongoName: "_id",
            toMongo: (id) => id,
            fromMongo: (id) => id,
            
            initial: ""
        });

        this.defineProperty("messages", {
            mongoName: "messages",
            initial: [],
            toMongo: (messages) => messages.map((message) => toMongoMessage(message)),
            fromMongo: (messages) => messages.map((message) => toMessage(message)),
            validate: zodValidateWithErrors(UniqueMessageArraySchema)
        });

        this.defineRequestType("queryBot", async function(this: CompletedConversationData, ac) {
            const api = getApi();
            const { data } = await api.post<BotQueryResponseBody>("/bot/query", {
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

        // This will be handled client-side for now, but will be moved to the server in the future.
        this.defineRequestType("pull", async function(this: CompletedConversationData, _, convoId) {
            // Wait between 1 and 5 seconds to simulate a real API call.
            await new Promise(r => setTimeout(r, Math.random() * 4000 + 1000));

            if (convoId === "demo") {
                this.fromJSON({
                    messages: [
                        createMessage("text", "recepient", () => ({
                            text: "Hello! How can I assist you today?"
                        }), true)
                    ]
                });
                return;
            }

            // Empty if not found.
            this.messages = [];
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