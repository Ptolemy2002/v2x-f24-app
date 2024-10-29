import { FC, ForwardRefExoticComponent, RefAttributes, RefObject } from "react";

export type MaybeForwardRefComponent<P> =
    FC<P> | (
        P extends { ref?: RefObject<infer T> } ? (
            ForwardRefExoticComponent<Omit<P, "ref"> & RefAttributes<T>>
        ) : never
    );