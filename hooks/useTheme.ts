import { useColorScheme } from "nativewind";

export const useTheme = () => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  const isLight = colorScheme === "light";

  return {
    isLight,
    toggleColorScheme,
  };
};
