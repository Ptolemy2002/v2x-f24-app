import useAppSearchParamState from "src/SearchParams";
import {ChatLinkProps} from "./Types";
import clsx from "clsx";
import { useNavigate } from "react-router";
import DefaultPencilIcon from "src/components/icons/PencilIcon";
import StyledButton from "src/components/StyledButton";
import { css } from "styled-components";

function ChatLinkBase({
    text, id, className, onClick,
    PencilIcon=DefaultPencilIcon,
    ...props
}: ChatLinkProps["functional"]) {
    const {convo} = useAppSearchParamState();
    const navigate = useNavigate();

    return (
        // clsx is just a utility that lets us combine class names. Falsy values do not get added to the class list,
        // which is why "active" is only added when the active prop is true.
        <li className={clsx("chat-link", convo === id && "active", className)} {...props}>
            <a onClick={(e) => {
                navigate("/?convo=" + id);
                onClick?.(e);
            }}>{text}</a>
            
            <StyledButton
                $variant="conversationTitleEdit"
                className="conversation-title-edit-button"
                onClick={() => {
                    navigate("/conversation-settings?convo=" + id);
                }}

                $css={css`
                    padding: 0;

                    > svg {
                        width: 100%;
                        height: 100%;
                    }
                `}
            >
                <PencilIcon />
            </StyledButton>
        </li>
    );
}

export function applySubComponents<
    T extends typeof ChatLinkBase
>(C: T) {
    return Object.assign(C, {
        PencilIcon: DefaultPencilIcon
    });
}

export default applySubComponents(ChatLinkBase);