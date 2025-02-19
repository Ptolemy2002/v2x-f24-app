import { PropsWithCustomChildren } from "@ptolemy2002/react-utils";
import { ReactNode } from "react";
import { Alert, AlertProps } from "react-bootstrap";

export type ErrorAlertProps = PropsWithCustomChildren<
    Omit<AlertProps, "variant" | "children">,
    {
        head: ReactNode;
        body: ReactNode;
    }
>;

function ErrorAlert({
    children: { head, body } = {},
    ...props
}: ErrorAlertProps) {
    return (
        <Alert variant="danger" {...props}>
            {head && <Alert.Heading>
                {head}
            </Alert.Heading>}

            {body}
        </Alert>
    );
}

export default Object.assign(ErrorAlert, {
    Heading: Alert.Heading,
    Link: Alert.Link
});