import SVG from 'react-inlinesvg';
import { ComponentProps } from 'react';
import HTMLComment from 'react-html-comment';
import getEnv from 'src/Env';

export type StaticSrcSVGProps = Omit<ComponentProps<typeof SVG>, 'src'>;
export default function StaticSrcSVG(src: string) {
    const env = getEnv();

    return Object.assign(
        ({cacheRequests=env.isProd, ...props}: StaticSrcSVGProps) => <>
            <HTMLComment text={`[SVG] ${src}`} />
            <SVG cacheRequests={cacheRequests} src={src} {...props} />
        </>,
        { 
            displayName: `${src}(SVG)`
        }
    );
}