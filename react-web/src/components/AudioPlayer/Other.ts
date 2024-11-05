import { Duration } from "date-fns";

export function formatDuration(duration: Duration) {
    const hours = (duration.hours ?? 0).toString()
    const minutes = (duration.minutes ?? 0).toString();
    const seconds = (duration.seconds ?? 0).toString();

    const result = minutes.padStart(2, "0") + ":" + seconds.padStart(2, "0");
    if (hours !== "0") {
        return hours + ":" + result;
    } else {
        return result;
    }
}

export function handleSeekDesktop(e: MouseEvent, target: HTMLProgressElement, onSeek: (x: number) => void) {
    // Get the left position of the progress bar
    const rect = target.getBoundingClientRect();

    // If the mouse is to the left, return 0
    if (e.clientX < rect.left) {
        onSeek(0);
        return;
    }

    // If the mouse is to the right, return 1
    if (e.clientX > rect.right) {
        onSeek(1);
        return;
    }

    // Calculate the progress
    const x = e.clientX - rect.left;
    onSeek(x / rect.width);
}