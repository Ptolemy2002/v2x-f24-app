import { MongoConversation, ZodMongoConversationSchema } from "shared";
import { HydratedDocumentFromSchema, Model, Schema, Types, model } from "mongoose";
import { zodValidateWithErrors } from "@ptolemy2002/regex-utils";

export type MongoDocumentConversation =
    // Here we're manually defining the _id field an ObjectId
    // instance, as that's what mongoose has in the object
    // itself. However, whenever we respond to the client, we
    // will convert it to match the string format.
    Omit<MongoConversation, "_id" | "createdAt"> & { 
        _id: Types.ObjectId,
        createdAt: Date,

        // This is the version key that
        // mongoose uses. It's not relevant
        // in most caseswe're using here.
        __v?: number
    }
;

export type ConversationInstanceMethods = {
    toClientJSON: () => MongoConversation,
    makeNameUnique: () => Promise<void>,
    removeUnsetFields: () => void
};
export type ConversationModel = Model<MongoDocumentConversation, {}, ConversationInstanceMethods>;

export interface ConversationModelWithStatics extends ConversationModel {
    getUniqueName: (name: string) => Promise<string>,
    createWithUniqueName:
        (name: string, conversation: Omit<MongoConversation, "name" | "_id" | "createdAt">) => Promise<
            HydratedDocumentFromSchema<typeof ConversationSchema>
        >,
    getPaths(): string[];
};

const ConversationSchema = new Schema<MongoDocumentConversation, ConversationModel, ConversationInstanceMethods>({
    name: {
        type: String,
        required: true,
        trim: true
    },

    messages: {
        type: [Object]
    }
}, {
    timestamps: {
        createdAt: "createdAt",
        updatedAt: false
    }
});

ConversationSchema.method("toClientJSON", function() {
    const {_id, ...conversation} = this.toJSON();
    delete conversation.__v;
    return {
        _id: _id.toString(),
        ...conversation
    };
});

ConversationSchema.static("getUniqueName", async function(name: string) {
    // See if the name is unique
    const existingNames = await ConversationModel.distinct("name");
    const originalName = name.replace(/\s*\([0-9]+\)$/, "");

    // Find the first available name
    let i = 1;
    while(existingNames.includes(name)) {
        name = `${originalName} (${i})`;
        i++;
    }

    return name;
});

ConversationSchema.static("createWithUniqueName", async function(
    name: string, conversation: Omit<MongoConversation, "name" | "_id">
) {
    const uniqueName = await ConversationModel.getUniqueName(name);
    return ConversationModel.create({
        ...conversation,
        name: uniqueName
    });
});

ConversationSchema.static("getPaths", function() {
    return Object.keys(this.schema.paths);
});

ConversationSchema.method("makeNameUnique", async function() {
    const name = await ConversationModel.getUniqueName(this.get("name"));
    this.set("name", name);
});

ConversationSchema.method("removeUnsetFields", function() {
    // Remove nulls from lists that should not have nullable items
    this.set("messages", this.get("messages").filter(x => x !== null));
});

ConversationSchema.path("messages").validate(zodValidateWithErrors(ZodMongoConversationSchema.shape.messages, {_throw: true, prefix: "messages" }));

const ConversationModel = model<MongoDocumentConversation, ConversationModelWithStatics>('conversations', ConversationSchema);
export default ConversationModel;