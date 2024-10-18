import { Row } from 'react-bootstrap';
import Sidebar from 'src/components/Sidebar';
import ConversationContainer from 'src/components/ConversationContainer';

export default function App() {
    return (
        <>
            {
                // The "as" prop allows you to specify the HTML element that the Row component should render as.
            }
            <Row as="header">
                <h1>App Layout Prototype</h1>
            </Row>

            <Row as="main">
                <Sidebar />
                <ConversationContainer />
            </Row>
        </>
    );
}