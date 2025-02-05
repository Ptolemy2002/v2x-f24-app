import { PausePlayButtonProps } from "./Types";
import DefaultRestartIcon from 'src/components/icons/RestartIcon';
import DefaultPlayIcon from 'src/components/icons/PlayIcon';
import DefaultPauseIcon from 'src/components/icons/PauseIcon';
import { Button } from 'react-bootstrap';

export default function PausePlayButtonBase({
    isPaused,
    isEnded,
    RestartIcon = DefaultRestartIcon,
    PlayIcon = DefaultPlayIcon,
    PauseIcon = DefaultPauseIcon,
    ...props
}: PausePlayButtonProps["functional"]) {
    return (
        <Button
            {...props}
        >
            {
                isPaused ? (
                    isEnded ? <RestartIcon /> : <PlayIcon />
                ) : <PauseIcon />
            }
        </Button>
    );
}