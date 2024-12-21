import { UpdatePasswordValidation } from "@/shared/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdatePassword } from "./useUpdatePassword";
import { Fragment } from "react";
import { Button, ButtonLoader, Field } from "@/components/ui";
import { Text, View } from "react-native";

function UpdatePassword() {
  const { control, reset, handleSubmit } = useForm<IUpdatePassword>({
    resolver: zodResolver(UpdatePasswordValidation),
    defaultValues: {
      passwordCurrent: "",
      newPassword: "",
    },
  });

  const { onSubmit, isUpdatingPassword } = useUpdatePassword(reset);

  return (
    <Fragment>
      <Text className="h3-bold  text-left w-full text-main-color">
        Обновить пароль
      </Text>

      <View className="flex flex-col gap-7 w-full max-w-full ">
        <Field<IUpdatePassword>
          control={control}
          name="passwordCurrent"
          label="пароль"
          placeholder="********"
          secureTextEntry
        />

        <Field<IUpdatePassword>
          control={control}
          name="newPassword"
          label="новый пароль"
          secureTextEntry
          placeholder="********"
        />

        <View className="flex gap-4 items-center justify-end flex-row">
          <Button
            className=" whitespace-nowrap"
            disabled={isUpdatingPassword}
            onPress={handleSubmit(onSubmit)}
          >
            {isUpdatingPassword ? <ButtonLoader /> : "Обновить"}
          </Button>
        </View>
      </View>
    </Fragment>
  );
}

export default UpdatePassword;
