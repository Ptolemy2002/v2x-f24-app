import StyledButton, { StyledButtonProps } from "src/components/StyledButton";
import { css } from "styled-components";
import { RequiredCSSProperties } from "@ptolemy2002/react-styled-component-utils";

export type SendButtonProps = Omit<StyledButtonProps["all"], "$variant"> & {
    $padding?: RequiredCSSProperties["padding"];
};

export default function SendButton({
    $padding,
    $css,
    ...props
}: SendButtonProps) {
    return (
        <StyledButton
            id="send-button"
            $variant="send"
            aria-label="Send Message"
            $css={
                css<StyledButtonProps["all"]>`
                    padding: ${$padding};
                    height: fit-content;
                    margin-top: auto;
                    margin-bottom: auto;
                    ${$css}
                `
            }
            {...props}
        />
    );
}
