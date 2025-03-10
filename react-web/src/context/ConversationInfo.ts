import { createProxyContext, createProxyContextProvider, Dependency, OnChangePropCallback, OnChangeReinitCallback, useProxyContext } from '@ptolemy2002/react-proxy-context';
import { MaybeTransformer } from '@ptolemy2002/ts-utils';
import isCallable from 'is-callable';
import { ConversationListName200ResponseBody } from 'shared';

type EntryList = ConversationListName200ResponseBody["entries"];
type Entry = EntryList[number];
type PartialEntryList = Partial<Entry>[];

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
        return this;
    }

    setEntries(entries: MaybeTransformer<EntryList, [EntryList]>, sort = true) {
        if (isCallable(entries)) entries = entries(this.entries);
        this.entries = [...entries];
        if (sort) this.sortEntries();
        return this;
    }

    updateEntry(
        match: string,
        value: MaybeTransformer<Partial<Entry>, [Entry]>,
        key: "name" | "_id" = "_id",
        sort = true
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
        }), sort);

        return {
            found,
            entries: this.entries
        }
    }

    mergeEntries(
        entries: MaybeTransformer<PartialEntryList, [EntryList]>,
        key: "name" | "_id" = "_id",
        sort = true
    ) {
        if (isCallable(entries)) entries = entries(this.entries);

        const found: EntryList = [];
        let missing: PartialEntryList = entries;

        // Update existing entries with new data.
        this.setEntries((currentEntries) => currentEntries.map((e) => {
            const match = entries.find((entry) => entry[key] === e[key]);
            if (match) {
                found.push(e);
                missing = missing.filter((m) => m[key] !== e[key]);

                return {
                    ...e,
                    ...match
                };
            }

            return e;
        }), sort);

        // Add any missing entries to the end of the list.
        this.setEntries((currentEntries) => {
            for (const m of missing) {
                currentEntries.push({
                    // Defaults, just in case some fields are missing.
                    _id: "",
                    name: "Untitled Conversation",
                    createdAt: new Date().toISOString(),
                    modifiedAt: new Date().toISOString(),
                    ...m
                });
            }

            return currentEntries;
        }, sort);

        return {
            found,
            missing,
            entries: this.entries
        }
    }
}