import { AppProps } from './Types';
import { router } from 'src/Browser';
import { RouterProvider } from 'react-router-dom';

export default function AppBase({className}: AppProps) {

    return (
        <div className={className}>
            <RouterProvider router={router} />
        </div>
    );
}