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
    toClientJSON: () => MongoConversation
};
export type ConversationModel = Model<MongoDocumentConversation, {}, ConversationInstanceMethods>;

export interface ConversationModelWithStatics extends ConversationModel {
    // Add static methods here
};

const ConversationSchema = new Schema<MongoDocumentConversation, ConversationModel, ConversationInstanceMethods>({
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

ConversationSchema.path("name").validate(zodValidateWithErrors(ZodMongoConversationSchema.shape.messages, true));

const ConversationModel = model<MongoDocumentConversation, ConversationModelWithStatics>('conversations', ConversationSchema);
export default ConversationModel;