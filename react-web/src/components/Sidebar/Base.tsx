import { SidebarProps } from "./Types";
import { Col } from "react-bootstrap";
import DefaultSidebarLabel from "./SidebarLabelStyled";
import DefaultChatLink from "./ChatLinkStyled";
import clsx from "clsx";
import { SuspenseBoundary } from "@ptolemy2002/react-suspense";
import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import getApi from "src/Api";
import { ErrorBoundary } from "react-error-boundary";
import ConversationInfo from "src/context/ConversationInfo";

function SidebarBase({
    className,
    colSize=1,
    SidebarLabel = DefaultSidebarLabel,
    ChatLink = DefaultChatLink,
    onLinkClick,
    ...props
}: SidebarProps["functional"]) {
    const api = getApi();
    const [conversationInfo] = ConversationInfo.useContext();
    const {_try} = useManualErrorHandling();

    return (
        // We need to explicitly set the "col" class here so LESS can recognize it as a column.
        // We also need to set the "as" prop after spreading the others to make sure it doesn't get overridden.
        <Col id="sidebar" xs={colSize} className={clsx("col", className)} {...props} as="ul">
            <SidebarLabel text="Conversations" />
            <ErrorBoundary fallback={<SidebarLabel text="Cannot get conversation list" $underline={false} />}>
                <SuspenseBoundary
                    fallback={<SidebarLabel text="Loading..." $underline={false} />}
                    init={() => _try(async () => {
                        const { data } = await api.get("/conversation/list-name");

                        if (data.ok) {
                            conversationInfo.setEntries(data.entries);
                        }
                    })}
                    renderDeps={[conversationInfo.entries]}
                >
                    {conversationInfo.entries.map(({_id, name}) => (
                        <ChatLink key={_id} text={name} name={name} id={_id} onClick={onLinkClick} />
                    ))}
                </SuspenseBoundary>
            </ErrorBoundary>
        </Col>
    );
}

export function applySubComponents<
    T extends typeof SidebarBase
>(C: T) {
    return Object.assign(C, {
        SidebarLabel: DefaultSidebarLabel,
        ChatLink: DefaultChatLink
    });
}

export default applySubComponents(SidebarBase);