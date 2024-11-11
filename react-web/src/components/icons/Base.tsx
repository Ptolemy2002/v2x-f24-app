import SVG from 'react-inlinesvg';
import { ComponentProps } from 'react';
import HTMLComment from 'react-html-comment';

export type StaticSrcSVGProps = Omit<ComponentProps<typeof SVG>, 'src'>;
export default function StaticSrcSVG(src: string) {
    return Object.assign(
        ({cacheRequests=false, ...props}: StaticSrcSVGProps) => <>
            <HTMLComment text={`[SVG] ${src}`} />
            <SVG cacheRequests={cacheRequests} src={src} {...props} />
        </>,
        { 
            displayName: `${src}(StaticSrcSVG)`
        }
    );
}