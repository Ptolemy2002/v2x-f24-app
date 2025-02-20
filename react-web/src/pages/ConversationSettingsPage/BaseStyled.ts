import styled from "styled-components";
import { ConversationSettingsPageProps } from "./Types";
import Base, {applySubComponents} from "./Base";

export default applySubComponents(Object.assign(
    styled(Base).attrs<ConversationSettingsPageProps["style"]>(
        (props) => ({
            $padding: props.$padding ?? "10px",
            $css: props.$css ?? null,
        })
    )`
        display: flex;
        flex-direction: column;
        padding: ${({$padding}) => $padding};

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(ConversationSettingsPage)",
    }
));