import { useCallback } from "react";
import { StyleProp, TextStyle } from "react-native";
import Toast from "react-native-toast-message";

interface IToastShow {
  type: "info" | "error" | "success" | "message";
  text1?: string;
  text1Style?: StyleProp<TextStyle>;
  text2?: string;
  text2Style?: StyleProp<TextStyle>;
  props?: IToastMessage;
}

export const useToast = () => {
  const handleShowToast = useCallback(
    ({ type, text1, text2, text1Style, text2Style, props }: IToastShow) => {
      Toast.hide();
      Toast.show({
        type,
        text1: text1 ?? "",
        text2: text2 ? text2 : undefined,
        text1Style: text1Style ? text1Style : null,
        text2Style: text2Style ? text2Style : null,
        props: props ? props : undefined,
      });
    },
    []
  );

  return { handleShowToast };
};
