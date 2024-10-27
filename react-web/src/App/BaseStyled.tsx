import Base from "./Base";
import { AppStyleAttributes } from "./Types";
import styled from 'styled-components';
import { border } from 'polished';

// Object.assign is used to merge the correct displayName with the styled component
export default Object.assign(
    styled(Base).attrs<AppStyleAttributes>(
        (props) => ({
            $padding: props.$padding ?? "10px",
            $borderThickness: props.$borderThickness ?? "1px",
        })
    )`
        display: flex;
        flex-direction: column;
        height: 100%;

        main {
            background-color: ${({theme}) => theme.backgroundColor};
        }

        header, main {
            padding: ${({$padding}) => $padding!};
        }

        main {
            flex-grow: 1;
            
            // The main element should not change size based on its content, they will handle scrolling themselves
            min-height: 0;

            // Direct children that are also columns
            > .col {
                max-height: 100%;
                margin: 0;
                ${({theme}) => border(theme.borderThickness, theme.borderStyle, theme.borderColor)};
            }
        }
    `, 
    {
        displayName: "App"
    }
);