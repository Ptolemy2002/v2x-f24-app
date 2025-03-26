import clsx from "clsx";
import { MediaAttachListItemProps } from "./Types";
import { ReactNode } from "react";
import ImageEntryDisplay from "src/components/ImageEntryDisplay";
import DefaultAudioPlayer from "src/components/AudioPlayer";
import getEnv from "src/Env";

function MediaAttachListItemBase({
    file, className, AudioPlayer=DefaultAudioPlayer, ...props
}: MediaAttachListItemProps["functional"]) {
    const env = getEnv();
    
    let fileElement: ReactNode = <span className="error-text">Unsupported file type: {file.type}</span>;

    if (file.type === "image") {
        fileElement = <ImageEntryDisplay file={file} />;
    } else if (file.type === "audio") {
        fileElement = (
            <AudioPlayer
                src={file.url.replace("$target", env.apiUrl)}
                alt={file.alt}
            />
        )
    }

    return (
        <li className={clsx("media-attach-list-item", className)} {...props}>
            {file.alt ?? "[No Description Provided]"}
            <br />
            {fileElement}
        </li>
    );
}

export function applySubComponents<
    T extends typeof MediaAttachListItemBase
>(C: T) {
    return Object.assign(C, {
        AudioPlayer: DefaultAudioPlayer
    });
}

export default applySubComponents(MediaAttachListItemBase);