import clsx from 'clsx';
import { ConversationSettingsPageProps } from './Types';

export default function NotFoundPageBase({className}: ConversationSettingsPageProps["functional"]) {
    return (
        <div id="conversation-settings-page" className={clsx("col", className)}>
            <h1>Conversation Settings</h1>
            <p>Test</p>
        </div>
    );
}