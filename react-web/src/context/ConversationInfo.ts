import { createProxyContext, createProxyContextProvider, Dependency, OnChangePropCallback, OnChangeReinitCallback, useProxyContext } from '@ptolemy2002/react-proxy-context';
import { MaybeTransformer } from '@ptolemy2002/ts-utils';
import isCallable from 'is-callable';
import { ConversationListName200ResponseBody } from 'shared';

type EntryList = ConversationListName200ResponseBody["entries"];

export default class ConversationInfo {
    static Context = createProxyContext<ConversationInfo>('ConversationListContext');
    static Provider = createProxyContextProvider(ConversationInfo.Context);
    static defaultDependencies: Dependency<ConversationInfo>[] = ["entries"];

    static useContext(
        deps: Dependency<ConversationInfo>[] | null = ConversationInfo.defaultDependencies,
        onChangeProp?: OnChangePropCallback<ConversationInfo>,
        onChangeReinit?: OnChangeReinitCallback<ConversationInfo>,
        listenReinit=true
    ) {
        // This is detected as a class method, but it's actually just a function.
        // eslint-disable-next-line react-hooks/rules-of-hooks
        return useProxyContext(
            ConversationInfo.Context, deps,
            onChangeProp, onChangeReinit, listenReinit
        );
    }

    entries: EntryList = [];

    sortEntries() {
        this.entries.sort((a, b) => {
            const aModified = new Date(a.modifiedAt).getTime();
            const bModified = new Date(b.modifiedAt).getTime();
            return bModified - aModified;
        });
    }

    setEntries(entries: MaybeTransformer<EntryList, [EntryList]>) {
        if (isCallable(entries)) entries = entries(this.entries);
        this.entries = [...entries];
    }

    updateEntry(
        match: string,
        value: MaybeTransformer<Partial<EntryList[number]>, [EntryList[number]]>,
        key: "name" | "_id" = "_id"
    ) {
        let found = false;
        this.setEntries((entries) => entries.map((e) => {
            if (found) return e;

            let newValue;
            if (e[key] === match) {
                found = true;
                if (isCallable(value)) {
                    newValue = value(e);
                } else {
                    newValue = value;
                }

                return {
                    ...e,
                    ...newValue
                };
            }

            return e;
        }));
    }
}