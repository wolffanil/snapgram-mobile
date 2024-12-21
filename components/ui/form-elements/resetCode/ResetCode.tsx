import { Pressable, Text, View } from "react-native";
import Field from "../Field";
import { IField } from "../field.interface";
import { useResetCode } from "./useResetCode";
import { useEffect, useState } from "react";

const ResetCode = <T extends Record<string, any>>({
  control,
  name,
  label,
  className,
  dataUser,
  ...rest
}: IField<T> & { dataUser: IResetCode }): JSX.Element => {
  const [counter, setCounter] = useState(30);
  const { resetCode, isPending } = useResetCode(dataUser);
  const handleReset = () => {
    resetCode();
    setCounter(30);
  };

  useEffect(() => {
    let interval = null;
    if (counter > 0) {
      interval = setInterval(() => {
        setCounter((c) => c - 1);
      }, 1000);
    } else if (counter === 0) {
      if (!interval) return;
      clearInterval(interval);
    }
    return () => {
      if (!interval) return;

      clearInterval(interval);
    };
  }, [counter]);

  return (
    <View className="flex flex-col gap-y-[10px] items-start">
      <Field<T>
        control={control}
        label={label}
        name={name}
        className={className}
        {...rest}
      />
      {counter > 0 ? (
        <Text className="text-sm font-medium leading-none peer-disabled:opacity-70 text-second-color mb-[9px] ">
          Отправить код через - {counter} сек
        </Text>
      ) : (
        <Pressable onPress={handleReset} disabled={isPending}>
          <Text className="text-sm font-medium leading-none text-second-color mb-[9px] underline">
            отправить код
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default ResetCode;
