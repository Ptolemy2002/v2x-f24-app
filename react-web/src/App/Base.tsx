import { AppProps } from './Types';
import { EnvProvider } from 'src/Env';
import { ErrorBoundary } from 'react-error-boundary';
import { router } from 'src/Browser';
import { RouterProvider } from 'react-router-dom';

export default function AppBase({className}: AppProps) {

    return (
        // ErrorBoundary will catch any errors that occur in the children of this component and display the fallback
        // if they happen. ErrorBoundaries can be defined below this one, causing them to catch errors in their children
        // instead of this one at the top level.
        <ErrorBoundary fallback={<p>Fatal Error</p>}>
            <div className={className}>
                <EnvProvider>
                    <RouterProvider router={router} />
                </EnvProvider>
            </div>
        </ErrorBoundary>
    );
}