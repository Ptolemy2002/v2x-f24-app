import clsx from "clsx";
import { CreateNewChatLinkProps } from "./Types";
import ConversationInfo from "src/context/ConversationInfo";
import ConversationData from "src/data/ConversationData";
import useAppSearchParamState from "src/SearchParams";
import { useSuspenseController } from "@ptolemy2002/react-suspense";
import getApi, { RouteIds } from "src/Api";

function CreateNewChatLinkBase({
    className, onClick,
    children,
    ...props
}: CreateNewChatLinkProps["functional"]) {
    const [{ suspend }] = useSuspenseController();
    const { setConvo: setConvoParam } = useAppSearchParamState();
    const [conversationInfo] = ConversationInfo.useContext();
    const [, setConversationData] = ConversationData.useContext([]);
    const api = getApi();

    return (
        <li className={clsx("chat-link", className)} {...props}>
            <a onClick={async (e) => {
                const response = await suspend(() => api.post("/conversation/new"));

                if (!response) return;

                if (response.data.ok) {
                    const convo = response.data.conversation;

                    setConvoParam(convo._id);
                    const convoData = setConversationData(convo)!;

                    conversationInfo.setEntries((entries) => {
                        entries.push({
                            _id: convo._id,
                            name: convo.name,
                            createdAt: convo.createdAt,
                            modifiedAt: convoData.getLastModified().toISOString()
                        })
                        return entries;
                    });
                    
                    // The next time we try to get a conversation list, it won't be old data
                    // that doesn't include this new conversation.
                    await api.storage.remove(RouteIds.conversationListName);
                }

                onClick?.(e);
            }}>
                {children}
            </a>
        </li>
    )
}

export function applySubComponents<
    T extends typeof CreateNewChatLinkBase
>(C: T) {
    return Object.assign(C, {});
}

export default applySubComponents(CreateNewChatLinkBase);