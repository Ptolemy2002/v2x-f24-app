import clsx from 'clsx';
import { ConversationSettingsPageProps } from './Types';
import { SuspenseBoundary } from '@ptolemy2002/react-suspense';
import useAppSearchParamState from 'src/SearchParams';
import ConversationData from 'src/data/ConversationData';

export default function ConversationSettingsPageBase({
    className,
    ...props
}: ConversationSettingsPageProps["functional"]) {
    const { convo: convoId } = useAppSearchParamState();
    
    if (convoId === null) {
        return (
            <div id="conversation-settings-page" className={clsx("col", "not-selected", className)}>
                No conversation selected.
            </div>
        );
    }
    
    return (
        <ConversationData.Provider
            key={convoId}
            value={{_id: convoId}}
            renderDeps={[className, ...Object.values(props)]}
        >
            <div id="conversation-settings-page" className={clsx("col", className)}>
                <h1>Conversation Settings</h1>
                <SuspenseBoundary fallback={<p>Loading...</p>}>
                    <p>Settings will go here.</p>
                </SuspenseBoundary>
            </div>
        </ConversationData.Provider>
    );
}