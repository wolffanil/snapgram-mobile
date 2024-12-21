import { FC, ReactNode } from "react";
import { Text, TouchableOpacityProps, TouchableOpacity } from "react-native";
import cn from "clsx";

interface IButton extends TouchableOpacityProps {
  className?: string;
  children: ReactNode;
  textStyle?: string;
}

const Logo: FC<IButton> = ({ className, children, textStyle, ...rest }) => {
  return (
    <TouchableOpacity
      className={cn("shad-button_primary blue-color", className)}
      activeOpacity={0.6}
      {...rest}
    >
      <Text className={cn("text-light-1", textStyle)}>{children}</Text>
    </TouchableOpacity>
  );
};

export default Logo;
