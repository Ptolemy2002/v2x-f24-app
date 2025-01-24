import { MongoConversation, ZodMongoConversationSchema } from "shared";
import { Model, Schema, Types, model } from "mongoose";
import { zodValidateWithErrors } from "@ptolemy2002/regex-utils";

export type MongoDocumentConversation =
    // Here we're manually defining the _id field an ObjectId
    // instance, as that's what mongoose has in the object
    // itself. However, whenever we respond to the client, we
    // will convert it to match the string format.
    Omit<MongoConversation, "_id"> & { 
        _id: Types.ObjectId

        // This is the version key that
        // mongoose uses. It's not relevant
        // in most caseswe're using here.
        __v?: number
    }
;

export type ConversationInstanceMethods = {
    toClientJSON: () => MongoConversation,
    makeNameUnique: () => Promise<void>
};
export type ConversationModel = Model<MongoDocumentConversation, {}, ConversationInstanceMethods>;

export interface ConversationModelWithStatics extends ConversationModel {
    // Add static methods here
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
});

ConversationSchema.method("toClientJSON", function() {
    const {_id, ...conversation} = this.toJSON();
    delete conversation.__v;
    return {
        _id: _id.toString(),
        ...conversation
    };
});

ConversationSchema.method("makeNameUnique", async function() {
    // See if the name is unique
    const existingNames = await ConversationModel.distinct("name");

    let name = this.get("name").replace(/\([0-9]+\)$/, "").trim();
    const originalName = name;

    // Find the first available name
    let i = 1;
    while(existingNames.includes(name)) {
        name = `${originalName} (${i})`;
        i++;
    }

    this.set("name", name);
});

ConversationSchema.path("messages").validate(zodValidateWithErrors(ZodMongoConversationSchema.shape.messages, true));

const ConversationModel = model<MongoDocumentConversation, ConversationModelWithStatics>('conversations', ConversationSchema);
export default ConversationModel;