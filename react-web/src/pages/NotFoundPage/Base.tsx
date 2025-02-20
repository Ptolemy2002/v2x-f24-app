import clsx from 'clsx';
import { NotFoundPageProps } from './Types';

function NotFoundPageBase({
    className,
    ...props
}: NotFoundPageProps["functional"]) {
    return (
        <div id="not-found-page" className={clsx("col", className)} {...props}>
            <h1>404 Not Found</h1>
            <p>The page you are looking for does not exist. Use the sidebar to navigate to a different page.</p>
        </div>
    );
}

export function applySubComponents<
    T extends typeof NotFoundPageBase
>(C: T) {
    return Object.assign(C, {});
}

export default applySubComponents(NotFoundPageBase);