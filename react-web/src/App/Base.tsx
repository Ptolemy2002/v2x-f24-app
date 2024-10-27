import { useCallback, useState, ReactNode } from 'react';
import { Row } from 'react-bootstrap';
import { useBreakpointQuery } from "@ptolemy2002/react-bs-media-queries";
import DefaultSidebar from 'src/components/Sidebar';
import ConversationContainer from 'src/components/ConversationContainer';
import DefaultHeader from 'src/components/Header';
import { AppProps } from './Types';

export default function({className, Header = DefaultHeader, Sidebar = DefaultSidebar}: AppProps) {
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