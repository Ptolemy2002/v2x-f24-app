import { AppProps } from './Types';
import { router } from 'src/Browser';
import { RouterProvider } from 'react-router-dom';
import ConversationInfo from 'src/context/ConversationInfo';

export default function AppBase({className}: AppProps["functional"]) {
    return (
        <div className={className}>
            <ConversationInfo.Provider value={new ConversationInfo()}>
                <RouterProvider router={router} />
            </ConversationInfo.Provider>
        </div>
    );
}