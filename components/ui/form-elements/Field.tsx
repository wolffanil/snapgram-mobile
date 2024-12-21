import { Controller } from "react-hook-form";
import { IField } from "./field.interface";
import cn from "clsx";
import { Text, TextInput, View } from "react-native";

const Field = <T extends Record<string, any>>({
  control,
  name,
  label,
  className,
  ...rest
}: IField<T>): JSX.Element => {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { error },
      }) => (
        <>
          <View className={cn("flex flex-col w-full items-start", className)}>
            <Text className=" text-sm font-medium leading-none  text-second-color mb-[9px] ">
              {label}
            </Text>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              autoCapitalize={"none"}
              value={(value || "").toString()}
              cursorColor="#877EFF"
              className="shad-input bg-second-color text-main-color"
              {...rest}
            />
            {error && (
              <Text className="shad-form_message mt-[8px]">
                {error.message}
              </Text>
            )}
          </View>
        </>
      )}
    />
  );
};

export default Field;
