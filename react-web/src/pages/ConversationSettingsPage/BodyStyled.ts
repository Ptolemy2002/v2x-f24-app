import styled from "styled-components";
import { ConversationSettingsPageBodyProps } from "./Types";
import Base, {applySubComponents} from "./Body";

export default applySubComponents(Object.assign(
    styled(Base).attrs<ConversationSettingsPageBodyProps["style"]>(
        (props) => ({
            $marginBottom: props.$marginBottom ?? "1rem",
            $formGroupGap: props.$formGroupGap ?? "1rem",
            $css: props.$css ?? null,
        })
    )`
        > .form-group {
            margin-bottom: ${({$marginBottom}) => $marginBottom};

            display: flex;
            flex-direction: row;
            gap: ${({$formGroupGap}) => $formGroupGap};

            > label {
                margin: 0;
            }

            > input {
                flex-grow: 1;
            }
        }

        ${({$css}) => $css}
    `,
    {
        displayName: "styled(ConversationSettingsPage.Body)",
    }
));