import SVG from 'react-inlinesvg';
import { ComponentProps, FC } from 'react';
import HTMLComment from 'react-html-comment';
import getEnv from 'src/Env';

export type DefaultLoaderProps = Omit<ComponentProps<typeof SVG>, 'src' | 'cacheRequests'>;
export function DefaultLoader({className, ...props}: DefaultLoaderProps) {
    return <SVG className={`loader ${className}`} src="/icons/hourglass.svg" cacheRequests={true} {...props} />;
}

export type StaticSrcSVGProps = Omit<ComponentProps<typeof SVG>, 'src'>;
export default function StaticSrcSVG(src: string, Loader: FC<DefaultLoaderProps> = DefaultLoader) {
    return Object.assign(
        (_props: StaticSrcSVGProps) => {
            const env = getEnv();
            const {className, cacheRequests=env.isProd, ...props} = _props;
            
            return <>
                <HTMLComment text={`[SVG] ${src}`} />
                <SVG
                    className={className}
                    cacheRequests={cacheRequests}
                    src={src}
                    loader={<Loader className={className} {...props} />}
                    {...props}
                />
            </>
        },
        { 
            displayName: `${src}(SVG)`
        }
    );
}