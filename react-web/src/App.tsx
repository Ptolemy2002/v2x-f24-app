import { useCallback, useState } from 'react';
import { Row } from 'react-bootstrap';
import { BSMediaQuery, useBreakpointQuery } from "@ptolemy2002/react-bs-media-queries";
import Sidebar from 'src/components/Sidebar';
import ConversationContainer from 'src/components/ConversationContainer';
import Header from 'src/components/Header';

export default function App() {
    const [showSidebar, setShowSidebar] = useState(false);
    const breakpointQuery = useBreakpointQuery("md", "min");

    const toggleSidebar = useCallback(() => {
        setShowSidebar((v) => !v);
    }, []);

    return (
        <>
            <Header onMenuClick={toggleSidebar} />

            <Row as="main">
                <BSMediaQuery breakpoint='xxl' comparison='min'>
                    <Sidebar colSize={1} />
                </BSMediaQuery>
                
                <BSMediaQuery breakpoint='xl' comparison='max'>
                    {showSidebar && <Sidebar colSize={breakpointQuery ? 3 : 12} />}
                </BSMediaQuery>

                <ConversationContainer />
            </Row>
        </>
    );
}
