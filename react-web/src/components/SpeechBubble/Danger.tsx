import { SpeechBubbleDangerProps } from "./Types";
import DefaultTimestampWrapper from "src/components/TimestampWrapper";
import DefaultSpeechBubbleTimestamp from "./TimestampStyled";
import DefaultScreenReaderText from "./DangerScreenReaderText";
import DefaultRetryLink from "./RetryLinkStyled";
import DefaultIcon from "src/components/icons/DangerIcon";
import clsx from "clsx";

export default function SpeechBubbleDangerBase({
    origin,
    date,
    className,
    iconWidth = "50px",
    iconHeight = "auto",
    TimestampWrapper = DefaultTimestampWrapper,
    SpeechBubbleTimestamp = DefaultSpeechBubbleTimestamp,
    ScreenReaderText = DefaultScreenReaderText,
    RetryLink = DefaultRetryLink,
    Icon = DefaultIcon,
    ...props
}: SpeechBubbleDangerProps["functional"]) {
    return (
        <div className={clsx("speech-bubble-danger", origin, className)} {...props}>
            <TimestampWrapper date={date} updateInterval={10} render={(text) => <SpeechBubbleTimestamp text={text} />} />
            <div className={`speech-bubble-content ${origin}`}>
                <ScreenReaderText text="failed" origin={origin} />
                <RetryLink>
                    <Icon
                        $width={iconWidth}
                        $height={iconHeight}
                    />
                </RetryLink>
                <p>Click the icon to try again.</p>
            </div>
        </div>
    );
}