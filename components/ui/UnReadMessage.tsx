import { Text, View } from "react-native";

interface IUnReadMessageProps {
  className?: string;
  count: number;
  classNameText?: string;
}

function UnReadMessage({
  className,
  count,
  classNameText,
}: IUnReadMessageProps) {
  const number = count > 99 ? "99+" : count;

  return (
    <View
      className={`flex justify-center items-center main-color rounded-full w-[22px] h-[22px] flex-row ${
        className ?? ""
      }`}
    >
      <Text
        className={`text-white font-semibold  text-[10px] ${classNameText}`}
      >
        {number}
      </Text>
    </View>
  );
}

export default UnReadMessage;
