import { ReactNode } from 'react';

export type TimestampWrapperProps = {
    date: Date;
    updateInterval: number | null;
    render: (text: string) => ReactNode;
    relative?: boolean;
}