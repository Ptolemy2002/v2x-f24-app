import { ConversationFileEntry } from "shared";
import { Override } from "@ptolemy2002/ts-utils";
import IMG, { IMGProps } from "./IMG";
import getEnv from "src/Env";

export type ImageEntryDisplayProps = Override<IMGProps, {
    file: ConversationFileEntry
}>;

export default function ImageEntryDisplay({ file, srcSet={}, altSet={}, ...props }: ImageEntryDisplayProps) {
    const env = getEnv();

    if (file.type !== "image") {
        throw new Error(`Unable to render image entry with non-image file type: ${file.type}`);
    }

    return (
        <IMG
            srcSet={{
                loading: "/loading.gif",
                ...srcSet,
                success: file.url.replace("$target", env.apiUrl)
            }}

            altSet={{
                loading: "Loading image...",
                ...altSet,
                success: altSet?.success ?? file.alt
            }}

            {...props}
        />
    )
}