1. Client sends request to create conversation with no data or get an existing conversation with its id.
2. Server creates new database entry with default conversation data or retrieves existing conversation data.
    * If the conversation is anonymous, the database does not record this conversation.
    ```json
        {
            "_id": "abc123",
            "messages": [
                {
                    "id": "1",
                    "origin": "recepient",
                    "type": "text",
                    "date": "2023-10-01T12:00:00Z",
                    "text": "Hello, how can I help you?"
                }
            ]
        }
    ```
3. Server responds with full conversation data.
    * Client performs small transformatons on reception, such as converting string dates to `Date` objects. This is converted back whenever sending data to the server.
4. Client displays conversation data in the UI.
5. User sends a new message.
6. Client sends request to server with full conversation data (so that anonymous conversations can be queried as well).
    ```json
        {
            "_id": "abc123",
            "messages": [
                {
                    "id": "1",
                    "origin": "recepient",
                    "type": "text",
                    "date": "2023-10-01T12:00:00Z",
                    "text": "Hello, how can I help you?"
                },
                {
                    "id": "2",
                    "origin": "sender",
                    "type": "text",
                    "date": "2023-10-01T12:01:00Z",
                    "text": "I need help with my order."
                }
            ]
        }
    ```
7. Server passes full context to LLM for response.
8. Server updates database with the context the client sent plus the new message.
    * If the conversation is anonymous, this step is skipped.
9. Server sends the new message data to the client.
    ```json
        {
            "id": "3",
            "origin": "recepient",
            "type": "text",
            "date": "2023-10-01T12:02:00Z",
            "text": "Sure, what do you need help with?"
        }
    ```
10. Client updates the local conversation data with the new message. User can now see this and send another if desired.