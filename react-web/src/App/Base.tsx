import { useCallback, useState, ReactNode } from 'react';
import { Row } from 'react-bootstrap';
import { useBreakpointQuery } from "@ptolemy2002/react-bs-media-queries";
import DefaultSidebar from 'src/components/Sidebar';
import ConversationContainer from 'src/components/ConversationContainer';
import DefaultHeader from 'src/components/Header';
import { AppProps } from './Types';
import { EnvProvider } from 'src/Env';
import { ErrorBoundary } from 'react-error-boundary';

export default function App({className, Header = DefaultHeader, Sidebar = DefaultSidebar}: AppProps) {
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
        // ErrorBoundary will catch any errors that occur in the children of this component and display the fallback
        // if they happen. ErrorBoundaries can be defined below this one, causing them to catch errors in their children
        // instead of this one at the top level.
        <ErrorBoundary fallback={<p>Fatal Error</p>}>
            <div className={className}>
                <EnvProvider>
                    <Header onMenuClick={toggleSidebar} />

                    <Row as="main">
                        {sidebar}
                        <ConversationContainer />
                    </Row>
                </EnvProvider>
            </div>
        </ErrorBoundary>
    );
}