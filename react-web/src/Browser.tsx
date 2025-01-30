import { useCallback, useState, ReactNode } from 'react';
import { Row } from 'react-bootstrap';
import { useBreakpointQuery } from "@ptolemy2002/react-bs-media-queries";
import Sidebar from 'src/components/Sidebar';
import Header from 'src/components/Header';
import { Outlet } from 'react-router';
import ConversationContainer from 'src/components/ConversationContainer';
import { createBrowserRouter } from 'react-router-dom';
import NotFoundPage from 'src/pages/NotFoundPage';

export function PageLayout() {
    const [showSidebar, setShowSidebar] = useState(false);
    const isMD = useBreakpointQuery("md", "min");
    const isXXL = useBreakpointQuery("xxl", "min");

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

    return <>
        <Header onMenuClick={toggleSidebar} />

        <Row as="main">
            {sidebar}
            <Outlet />
        </Row>
    </>;
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

        // The reason we don't use errorElement here is because we want to render the NotFoundPage
        // within our classical layout instead of as its own separate component
        {
            path: "*",
            element: <NotFoundPage />
        }
    ]
}]);