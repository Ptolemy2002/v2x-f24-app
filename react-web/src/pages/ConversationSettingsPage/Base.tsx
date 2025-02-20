import clsx from 'clsx';
import { ConversationSettingsPageProps } from './Types';
import useAppSearchParamState from 'src/SearchParams';
import ConversationData from 'src/data/ConversationData';
import { useNavigate } from 'react-router';
import { useMountEffect } from '@ptolemy2002/react-mount-effects';
import DefaultBody from './BodyStyled';

function ConversationSettingsPageBase({
    className,
    Body=DefaultBody,
    ...props
}: ConversationSettingsPageProps["functional"]) {
    const { convo: convoId } = useAppSearchParamState();
    const navigate = useNavigate();
    
    useMountEffect(() => {
        // Redirect to the main page if there is no conversation ID
        if (convoId === null) {
            navigate("/", {replace: true});
        }
    });
    
    if (convoId === null) return <div id="conversation-settings-page" className={clsx("col", className)} {...props} />;
    return (
        <ConversationData.Provider
            key={convoId}
            value={{_id: convoId}}
            renderDeps={[className, ...Object.values(props)]}
        >
            <div id="conversation-settings-page" className={clsx("col", className)} {...props}>
                <h1>Conversation Settings</h1>
                <p>ID: {convoId}</p>
                <Body />
            </div>
        </ConversationData.Provider>
    );
}

export function applySubComponents<
    T extends typeof ConversationSettingsPageBase
>(C: T) {
    return Object.assign(C, {
        Body: DefaultBody,
    });
}

export default applySubComponents(ConversationSettingsPageBase);