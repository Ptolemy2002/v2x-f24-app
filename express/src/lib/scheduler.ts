import { MaybePromise } from "@ptolemy2002/ts-utils";
import ms from "ms";

const ScheduledTimeouts: Record<string, number> = {};

export function schedule(key: string, timeout: number, fn: () => MaybePromise<number | null>, e: (e: unknown) => MaybePromise<number | null>) {
    if (isScheduled(key)) throw new Error(`Key ${key} is already scheduled`);
    
    setTimeout(async () => {
        try {
            console.log(`Running scheduled task ${key}`);
            unschedule(key);

            const newTimeout = await fn();
            if (newTimeout !== null) {
                console.log(`Rescheduling task ${key} for ${ms(newTimeout)} from now`);
                schedule(key, newTimeout, fn, e);
            } else {
                console.log(`Task ${key} is complete and will not be rescheduled`);
            }
        } catch (error) {
            console.error(`Error running scheduled task ${key}. Running error handler.`);
            if (isScheduled(key)) unschedule(key);

            const newTimeout = await e(error);
            if (newTimeout !== null) {
                console.log(`Rescheduling task ${key} for ${ms(newTimeout)} from now`);
                schedule(key, newTimeout, fn, e);
            } else {
                console.error(`Task ${key} failed and will not be rescheduled`);
            }
        }
    }, timeout);
}

export function unschedule(key: string) {
    if (isScheduled(key)) {
        console.log(`Unscheduling task ${key}`);
        clearTimeout(ScheduledTimeouts[key]);
        delete ScheduledTimeouts[key];
    }
}

export function isScheduled(key: string) {
    return key in ScheduledTimeouts;
}