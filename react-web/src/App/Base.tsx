import { AppProps } from './Types';
import { router } from 'src/Browser';
import { RouterProvider } from 'react-router-dom';
import ConversationInfo from 'src/context/ConversationInfo';

function AppBase({className}: AppProps["functional"]) {
    return (
        <div className={className}>
            <ConversationInfo.Provider value={new ConversationInfo()}>
                <RouterProvider router={router} />
            </ConversationInfo.Provider>
        </div>
    );
}

export function applySubComponents<
    T extends typeof AppBase
>(C: T) {
    return Object.assign(C, {});
}

export default applySubComponents(AppBase);