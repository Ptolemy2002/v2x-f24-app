import { useCallback, useState, ReactNode, CSSProperties } from 'react';
import { Row } from 'react-bootstrap';
import { useBreakpointQuery } from "@ptolemy2002/react-bs-media-queries";
import Sidebar from 'src/components/Sidebar';
import ConversationContainer from 'src/components/ConversationContainer';
import Header from 'src/components/Header';
import styled from 'styled-components';
import { border } from 'polished';

function _App({className}: {className?: string}) {
    const [showSidebar, setShowSidebar] = useState(false);
    const isMD = useBreakpointQuery("md", "min");
    const isXXL = useBreakpointQuery("xxl", "min");

    const toggleSidebar = useCallback(() => {
        setShowSidebar((v) => !v);
    }, []);

    // If sidebar remains null, it will not be rendered
    let sidebar: ReactNode | null = null;
    if (isXXL) {
        sidebar = <Sidebar colSize={1} />;
    } else if (showSidebar) {
        sidebar = <Sidebar colSize={isMD ? 3 : 12} />;
    }

    return (
        <div className={className}>
            <Header onMenuClick={toggleSidebar} />

            <Row as="main">
                {sidebar}
                <ConversationContainer />
            </Row>
        </div>
    );
}

export type AppStyleAttributes = {
    $padding?: CSSProperties["padding"];
    $borderThickness?: CSSProperties["borderWidth"];
}

const App = styled(_App).attrs<AppStyleAttributes>(
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
`;
App.displayName = "App";

export default App;