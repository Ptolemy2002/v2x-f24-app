import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";
import { PropsWithCustomChildren } from "@ptolemy2002/react-utils";
import { Override } from "@ptolemy2002/ts-utils";
import clsx from "clsx";
import { HTMLProps, ReactNode, useState } from "react";

export type IMGState = "loading" | "failed" | "success";

export type IMGProps = PropsWithCustomChildren<
    Override<
        HTMLProps<HTMLImageElement>,
        {
            srcSet?: Partial<Record<IMGState, string>>;
            altSet?: Partial<Record<IMGState, string>>;
            loadingClassName?: string;
            failedClassName?: string;
            successClassName?: string;
            throwErrors?: boolean
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
    className,
    loadingClassName="loading-image",
    failedClassName="failed-image",
    successClassName="success-image",
    throwErrors=false,
    ...props
}: IMGProps) {
    const [state, setState] = useState<IMGState>("loading");
    const { _throw } = useManualErrorHandling();

    const srcLoading = srcSet?.loading ?? src;
    const altLoading = altSet?.loading ?? alt;
    const loadingClass = clsx(className, loadingClassName);

    const srcFailed = srcSet?.failed ?? src;
    const altFailed = altSet?.failed ?? alt;
    const failedClass = clsx(className, failedClassName);

    const srcSuccess = srcSet?.success ?? src;
    const altSuccess = altSet?.success ?? alt;
    const successClass = clsx(className, successClassName);

    return (
        <>
            {state === "loading" && (children?.loading ?? <img className={loadingClass} src={srcLoading} alt={altLoading} {...props} />)}
            {state === "failed" && (children?.failed ?? <img className={failedClass} src={srcFailed} alt={altFailed} {...props} />)}

            <div style={{
                display: state === "success" ? undefined : "none"
            }}>
                {children?.success ?? 
                    <img
                        {...props}
                        className={successClass}
                        src={srcSuccess}
                        alt={altSuccess}

                        onLoad={(e) => {
                            setState("success");
                            onLoad?.(e);
                        }}

                        onError={(e) => {
                            setState("failed");
                            onError?.(e);
                            if (throwErrors) _throw(e);
                        }}
                    />
                }
            </div>
        </>
    );
}