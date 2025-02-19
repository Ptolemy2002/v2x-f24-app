import { PropsWithCustomChildren } from "@ptolemy2002/react-utils";
import { ReactNode } from "react";
import { Alert, AlertProps } from "react-bootstrap";

export type SuccessAlertProps = PropsWithCustomChildren<
    Omit<AlertProps, "variant" | "children">,
    {
        head: ReactNode;
        body: ReactNode;
    }
>;

function SuccessAlert({
    children: { head, body } = {},
    ...props
}: SuccessAlertProps) {
    return (
        <Alert variant="success" {...props}>
            {head && <Alert.Heading>
                {head}
            </Alert.Heading>}

            {body}
        </Alert>
    );
}

export default Object.assign(SuccessAlert, {
    Heading: Alert.Heading,
    Link: Alert.Link
});