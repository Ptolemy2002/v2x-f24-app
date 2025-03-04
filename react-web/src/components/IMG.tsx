import { PropsWithCustomChildren } from "@ptolemy2002/react-utils";
import { Override } from "@ptolemy2002/ts-utils";
import { HTMLProps, ReactNode, useState } from "react";

export type IMGState = "loading" | "failed" | "success";

export type IMGProps = PropsWithCustomChildren<
    Override<
        HTMLProps<HTMLImageElement>,
        {
            srcSet?: Partial<Record<IMGState, string>>;
            altSet?: Partial<Record<IMGState, string>>;
        }
    >,

    Record<IMGState, ReactNode>
>;

export default function IMG({
    srcSet,
    altSet,
    children,

    onLoad,
    onError,

    src,
    alt,
    ...props
}: IMGProps) {
    const [state, setState] = useState<IMGState>("loading");

    const srcLoading = srcSet?.loading ?? src;
    const altLoading = altSet?.loading ?? alt;

    const srcFailed = srcSet?.failed ?? src;
    const altFailed = altSet?.failed ?? alt;

    const srcSuccess = srcSet?.success ?? src;
    const altSuccess = altSet?.success ?? alt;

    return (
        <>
            {state === "loading" && (children?.loading ?? <img src={srcLoading} alt={altLoading} {...props} />)}
            {state === "failed" && (children?.failed ?? <img src={srcFailed} alt={altFailed} {...props} />)}

            <div style={{
                display: state === "success" ? undefined : "none"
            }}>
                <img
                    {...props}
                    src={srcSuccess}
                    alt={altSuccess}

                    onLoad={(e) => {
                        setState("success");
                        onLoad?.(e);
                    }}

                    onError={(e) => {
                        setState("failed");
                        onError?.(e);
                    }}
                />
            </div>
        </>
    );
}