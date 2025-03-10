import { SidebarProps } from "./Types";
import { Col } from "react-bootstrap";
import DefaultSidebarLabel from "./SidebarLabelStyled";
import DefaultChatLink from "./ChatLinkStyled";
import DefaultCreateNewChatLink from "./CreateNewChatLinkStyled";
import clsx from "clsx";
import { SuspenseBoundary, SuspenseBoundaryProps } from "@ptolemy2002/react-suspense";
import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import getApi, { RouteIds } from "src/Api";
import { ErrorBoundary } from "react-error-boundary";
import ConversationInfo from "src/context/ConversationInfo";

function SidebarBase({
    className,
    colSize=1,
    SidebarLabel = DefaultSidebarLabel,
    ChatLink = DefaultChatLink,
    CreateNewChatLink = DefaultCreateNewChatLink,
    onLinkClick,
    ...props
}: SidebarProps["functional"]) {
    const [conversationInfo] = ConversationInfo.useContext();

    return (
        // We need to explicitly set the "col" class here so LESS can recognize it as a column.
        // We also need to set the "as" prop after spreading the others to make sure it doesn't get overridden.
        <Col id="sidebar" xs={colSize} className={clsx("col", className)} {...props} as="ul">
            <ErrorBoundary fallback={
                <SidebarLabel className="error-text" text="Cannot get conversation list" $underline={false} />
            }>
                <SidebarInternalBody
                    fallback={<SidebarLabel text="Loading..." $underline={false} />}
                    renderDeps={[conversationInfo.entries]}
                >
                    <SidebarLabel text="Create New" />
                    <CreateNewChatLink onClick={onLinkClick}>Normal</CreateNewChatLink>
                    {
                        // Needs Implementing
                        //<CreateNewChatLink onClick={onLinkClick}>Anonymous</CreateNewChatLink>
                    }

                    <SidebarLabel text="Conversations" />

                    {conversationInfo.entries.map(({_id, name}) => (
                        <ChatLink key={_id} text={name} name={name} id={_id} onClick={onLinkClick} />
                    ))}
                </SidebarInternalBody>
            </ErrorBoundary>
        </Col>
    );
}

// The SuspenseBoundary must be a separate component so that errors can be caught and displayed.
function SidebarInternalBody(props: Omit<SuspenseBoundaryProps, "init">) {
    const {_try} = useManualErrorHandling();
    const [conversationInfo] = ConversationInfo.useContext();
    const api = getApi();

    return (
        <SuspenseBoundary
            init={() => _try(async () => {
                const { data } = await api.get("/conversation/list-name", {id: RouteIds.conversationListName});

                if (data.ok) {
                    conversationInfo.mergeEntries(data.entries);
                }
            })}
            renderDeps={[conversationInfo.entries]}
            {...props}
        />
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