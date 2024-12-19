import { AppProps } from './Types';
import { router } from 'src/Browser';
import { RouterProvider } from 'react-router-dom';

export default function AppBase({className}: AppProps["functional"]) {
    return (
        <div className={className}>
            <RouterProvider router={router} />
        </div>
    );
}