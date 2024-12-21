import { FC } from "react";
import { Image } from "react-native";
import images from "@/constants/authImages";
import { useTheme } from "@/hooks/useTheme";

interface ILogo {
  className?: string;
}

const Logo: FC<ILogo> = ({ className }) => {
  const { isLight } = useTheme();

  return (
    <Image
      source={isLight ? images.logoLight : images.logoDark}
      className={className}
      alt="logo"
    />
  );
};

export default Logo;
