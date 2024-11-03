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