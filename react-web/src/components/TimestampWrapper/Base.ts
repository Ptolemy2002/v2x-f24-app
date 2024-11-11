import {formatDistanceToNow, isAfter, secondsToMilliseconds} from "date-fns";
import {useRef, useEffect, useCallback} from "react";
import useForceRerender from "@ptolemy2002/react-force-rerender";
import {TimestampWrapperProps} from "./Types";

export default function TimestampWrapper({render, updateInterval, date, relative = true}: TimestampWrapperProps) {
    const forceRerender = useForceRerender();
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const clearIntervalIfExist = useCallback(() => {
        if (intervalRef.current !== null) clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        clearIntervalIfExist();

        if (updateInterval) {
            intervalRef.current = setInterval(forceRerender, secondsToMilliseconds(updateInterval));
        }
        
        // On unmount
        return clearIntervalIfExist;
    }, [forceRerender, updateInterval, clearIntervalIfExist]);

    if (relative) {
        const suffix = isAfter(date, new Date()) ? "from now" : "ago";
        return render(formatDistanceToNow(date) + " " + suffix);
    } else {
        return render(date.toLocaleTimeString());
    }
}