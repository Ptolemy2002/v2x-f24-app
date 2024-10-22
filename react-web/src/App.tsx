import { useCallback, useState, ReactNode } from 'react';
import { Row } from 'react-bootstrap';
import { useBreakpointQuery } from "@ptolemy2002/react-bs-media-queries";
import Sidebar from 'src/components/Sidebar';
import ConversationContainer from 'src/components/ConversationContainer';
import Header from 'src/components/Header';

export default function App() {
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
        <>
            <Header onMenuClick={toggleSidebar} />

            <Row as="main">
                {sidebar}
                <ConversationContainer />
            </Row>
        </>
    );
}
