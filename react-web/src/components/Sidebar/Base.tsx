import { SidebarProps } from "./Types";
import { Col } from "react-bootstrap";
import DefaultSidebarLabel from "./SidebarLabelStyled";
import DefaultChatLink from "./ChatLinkStyled";
import clsx from "clsx";
import { SuspenseBoundary, useSuspenseController } from "@ptolemy2002/react-suspense";
import { useMountEffect } from "@ptolemy2002/react-mount-effects";
import { useState } from "react";
import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import getApi from "src/Api";
import { ErrorBoundary } from "react-error-boundary";

export default function SidebarBase({
    className,
    colSize=1,
    SidebarLabel = DefaultSidebarLabel,
    ChatLink = DefaultChatLink,
    onLinkClick,
    ...props
}: SidebarProps["functional"]) {
    return (
        // We need to explicitly set the "col" class here so LESS can recognize it as a column.
        // We also need to set the "as" prop after spreading the others to make sure it doesn't get overridden.
        <Col id="sidebar" xs={colSize} className={clsx("col", className)} {...props} as="ul">
            <SidebarLabel text="Conversations" />
            <ErrorBoundary fallback={<SidebarLabel text="Cannot get conversation list" $underline={false} />}>
                <SuspenseBoundary fallback={<SidebarLabel text="Loading..." $underline={false} />}>
                    <InternalChatLinks onLinkClick={onLinkClick} ChatLink={ChatLink} />
                </SuspenseBoundary>
            </ErrorBoundary>
        </Col>
    );
}

function InternalChatLinks({onLinkClick, ChatLink=DefaultChatLink}: Pick<SidebarProps["functional"], "onLinkClick" | "ChatLink">) {
    const api = getApi();
    const [{ suspend }] = useSuspenseController();
    const { _try } = useManualErrorHandling();
    const [names, setNames] = useState<{_id: string, name: string}[]>([]);

    useMountEffect(() => {
        _try(() => suspend(async () => {
            const { data } = await api.get("/conversation/list-name");

            if (data.ok) {
                setNames(data.entries);
            }
        }));
    });

    return (
        <>
            {names.map(({_id, name}) => (
                <ChatLink key={_id} text={name} id={_id} onClick={onLinkClick} />
            ))}
        </>
    );
}