import { MediaAttachListItemProps } from "./Types";
import Base, { applySubComponents } from "./MediaAttachListItem";
import styled from "styled-components";
import { WithCSSProp } from "@ptolemy2002/react-styled-component-utils";

export default applySubComponents(Object.assign(
    styled(Base).attrs<WithCSSProp<MediaAttachListItemProps["style"]>>(
        ({ ...props }) => ({
            $css: props.$css ?? null
        })
    )`  
        ${({ $css }) => $css}
    `,
    {
        displayName: "styled(MediaAttachListItem)",
    }
));