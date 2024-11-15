import express from 'express';
import {
    MongoMessage, MongoConversation
} from 'shared';
const router = express.Router();

router.post<
    // Path
    "/query",
    // Parameters
    {},
    // Response body
    {newMessage: MongoMessage},
    // Request body
    {conversation: MongoConversation},
    // Query Parameters
    {}
>("/query", (req, res) => {
    /*
        #swagger.start
        #swagger.path = '/api/v1/bot/query'
        #swagger.method = 'post'`
        #swagger.description = 'Query the bot for a response.'
        #swagger.parameters['conversation'] = {
            in: 'body',
            description: 'Conversation object',
            required: true,
            schema: {
                conversation: {
                    $ref: '#/definitions/Conversation'
                }
            }
        }
        #swagger.responses[200] = {
            description: "Response from the bot.",
            schema: {
                newMessage: {$ref: '#/definitions/Message'}
            }
        }
    */
    res.send({newMessage: {id: "123", origin: "recepient", type: "text", text: "Hello, world!", date: new Date().toISOString()}});
});

const botRouter = router;
export default botRouter;