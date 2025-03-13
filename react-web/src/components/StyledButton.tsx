import { StyledComponentPropsWithCSS } from '@ptolemy2002/react-styled-component-utils';
import { Button, ButtonProps } from 'react-bootstrap';
import { buttonStyles, evaluateButtonStyles } from 'src/lib/Styles';
import styled, { ButtonStyles, ButtonVariant } from 'styled-components';

export type StyledButtonProps = StyledComponentPropsWithCSS<
    ButtonProps,
    ButtonStyles & {
        variant: ButtonVariant;
        defaults?: Partial<ButtonStyles>;
    }
>;

export function StyledButtonBase(props: StyledButtonProps["functional"]) {
    return (
        <Button
            {...props}
            as="button"
        />
    );
}

export default Object.assign(
    styled(StyledButtonBase).attrs<StyledButtonProps["style"]>(
        ({theme, $variant, $defaults, ...props}) => ({
            ...evaluateButtonStyles(theme, props, $variant, $defaults),
            $css: props.$css ?? null,
        })
    )`
        ${(props) => buttonStyles(props)}
        ${({$css}) => $css}
    `,
    {
        displayName: "styled(StyledButton)",
    }
);