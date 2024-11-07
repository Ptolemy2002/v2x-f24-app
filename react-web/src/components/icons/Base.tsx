import SVG from 'react-inlinesvg';
import { ComponentProps } from 'react';

export type StaticSrcSVGProps = Omit<ComponentProps<typeof SVG>, 'src'>;
export default function StaticSrcSVG(src: string) {
    return Object.assign(
        (props: StaticSrcSVGProps) => <SVG src={src} {...props} />,
        { 
            displayName: `${src}(StaticSrcSVG)`
        }
    );
}