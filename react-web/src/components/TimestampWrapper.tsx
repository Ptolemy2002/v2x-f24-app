import useForceRerender from '@ptolemy2002/react-force-rerender';
import { secondsToMilliseconds, formatDistanceToNow, isAfter } from 'date-fns';
import { ReactNode, useRef, useEffect, useCallback } from 'react';

export type TimestampProps = {
    date: Date;
    updateInterval: number | null;
    render: (text: string) => ReactNode;
    relative?: boolean;
}

export default function TimestampWrapper({render, updateInterval, date, relative = true}: TimestampProps) {
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
    }, [forceRerender, updateInterval]);

    if (relative) {
        const suffix = isAfter(date, new Date()) ? "from now" : "ago";
        return render(formatDistanceToNow(date) + " " + suffix);
    } else {
        return render(date.toISOString());
    }
}