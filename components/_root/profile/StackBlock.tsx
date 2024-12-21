import { Text, View } from "react-native";

interface StabBlockPorps {
  value: string | number;
  label: string;
}

function StatBlock({ value, label }: StabBlockPorps) {
  return (
    <View className="flex-center gap-2 flex-col items-center ">
      <Text className="small-semibold  text-blue-color text-[14px]">
        {value}
      </Text>
      <Text className="small-medium text-main-color text-[14px]">{label}</Text>
    </View>
  );
}

export default StatBlock;
