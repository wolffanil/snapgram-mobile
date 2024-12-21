import { Button, ButtonLoader, Field, Logo } from "@/components/ui";
import { ResetPasswordValidation } from "@/shared/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useForgot } from "./useForgot";
import { IChangeForm } from "../open-reset-form.interface";
import { Pressable, Text, View } from "react-native";

function ForgotLogin({ setIsChangeForm }: IChangeForm) {
  const { control, reset, handleSubmit, setError } =
    useForm<IResetPasswordForm>({
      resolver: zodResolver(ResetPasswordValidation),
      defaultValues: {
        email: "",
        code: "",
        confirmNewPassword: "",
        newPassword: "",
      },
    });

  const { openIsFormReset, isLoading, onSubmit } = useForgot(
    setIsChangeForm,
    setError,
    reset
  );

  return (
    <View className="max-w-[290px]  flex-center flex-col">
      <Logo />
      <Text className="h3-bold text-main-color mt-[24px]">
        Восстановление доступа
      </Text>

      <Text className="text-light-3 small-medium  mt-[14px] text-center">
        Сброс пароля: восстановление безопасного доступа.
      </Text>

      <View className="flex flex-col w-full mt-[31px] gap-[20px]">
        <Field<IResetPasswordForm>
          name="email"
          label="Email"
          control={control}
        />

        {openIsFormReset && (
          <>
            <Field<IResetPasswordForm>
              name="code"
              control={control}
              label="Код"
            />

            <Field<IResetPasswordForm>
              name="newPassword"
              control={control}
              label="Пароль"
              secureTextEntry
            />

            <Field<IResetPasswordForm>
              name="confirmNewPassword"
              control={control}
              label="Повторить пароль"
              secureTextEntry
            />
          </>
        )}

        <Button
          disabled={isLoading}
          className="mt-[10px]"
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading ? (
            <ButtonLoader />
          ) : openIsFormReset ? (
            "Сбросить пароль"
          ) : (
            "Отправить код"
          )}
        </Button>

        <View className="flex-row mt-[5px] w-[200px] ">
          <Text className="text-main-color text-small-regular text-center">
            Вспомнили пароль?
          </Text>
          <Pressable
            className="ml-1"
            onPress={() => setIsChangeForm(false)}
            disabled={isLoading}
          >
            <Text className="text-blue-color text-small-semibold ">
              Вернуться
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default ForgotLogin;
