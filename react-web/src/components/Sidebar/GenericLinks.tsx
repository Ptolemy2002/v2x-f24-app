import { GenericLinksProps } from "./Types";
import DefaultTimeLabel from "./TimeLabelStyled";
import DefaultChatLink from "./ChatLinkStyled";

export default function GenericLinks({
    timeLabel, count=10, start=0,
    TimeLabel = DefaultTimeLabel,
    ChatLink = DefaultChatLink
}: GenericLinksProps) {
    return (
        // This is a fragment, which is a way to return multiple elements without adding an extra div to the DOM.
        <>
            <TimeLabel text={timeLabel} />
            {
                new Array(count).fill(null).map((_, i) => (
                    <ChatLink key={i} text={`Chat ${i + 1 + start}`} href={`#chat-${i + 1 + start}`} />
                ))
            }
        </>
    )
}