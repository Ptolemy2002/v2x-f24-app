import { FC } from "react";
import { MenuIconProps } from "src/components/icons/MenuIcon";

export type HeaderProps = {
    MenuIcon?: FC<MenuIconProps>;
    onMenuClick?: () => void;
} & React.HTMLAttributes<HTMLElement>;