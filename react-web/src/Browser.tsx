import { useCallback, useState, ReactNode } from 'react';
import { Row } from 'react-bootstrap';
import { useBreakpointQuery } from "@ptolemy2002/react-bs-media-queries";
import Sidebar from 'src/components/Sidebar';
import Header from 'src/components/Header';
import { Outlet } from 'react-router';
import ConversationContainer from 'src/components/ConversationContainer';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from 'src/pages/NotFoundPage';
import ConversationSettingsPage from 'src/pages/ConversationSettingsPage';
import ConversationData from 'src/data/ConversationData';
import useAppSearchParamState from 'src/SearchParams';

export function PageLayout() {
    const [showSidebar, setShowSidebar] = useState(false);
    const isMD = useBreakpointQuery("md", "min");
    const isXXL = useBreakpointQuery("xxl", "min");

    const { convo: convoId } = useAppSearchParamState();

    const toggleSidebar = useCallback(() => {
        setShowSidebar((v) => !v);
    }, []);

    // If sidebar remains null, it will not be rendered
    let sidebar: ReactNode | null = null;
    if (isXXL) {
        sidebar = <Sidebar colSize={2} />;
    } else if (showSidebar) {
        if (!isMD) {
            sidebar = <Sidebar colSize={12} onLinkClick={() => setShowSidebar(false)} />;
        } else {
            sidebar = <Sidebar colSize={3}/>;
        }
    }

    return (
        // When the key changes, the element is re-created. This will allow the instance to be reset
        // so that the data for the new conversation is fetched.
        <ConversationData.Provider
            value={convoId ? {_id: convoId} : null}

            // This is necessary so that the children are re-evaluated when any values affecting
            // them change. The memo function prevents React's default behavior to handle this,
            // as it causes unnecessary re-renders.
            renderDeps={[toggleSidebar, showSidebar, isMD, isXXL]}
        >
            <Header onMenuClick={toggleSidebar} />

            <Row as="main">
                {sidebar}
                <Outlet />
            </Row>
        </ConversationData.Provider>
    );
}

export const router = createBrowserRouter([{
    path: "/",
    element: <PageLayout />,
    errorElement: <p id="fatal-error">Fatal Error</p>,
    
    // These children will be rendered inside the Outlet in the PageLayout component
    children: [
        {
            path: "/",
            element: <ConversationContainer />
        },

        {
            path: "/conversation-settings",
            element: <ConversationSettingsPage />
        },

        // The reason we don't use errorElement here is because we want to render the NotFoundPage
        // within our classical layout instead of as its own separate component
        {
            path: "*",
            element: <NotFoundPage />
        }
    ]
}]);