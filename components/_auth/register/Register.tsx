import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "./useRegister";
import { SignupValidation } from "@/shared/validation";
import { Button, ButtonLoader, Field, ResetCode } from "@/components/ui";
import { Text, View } from "react-native";
import { Link } from "expo-router";

function Register() {
  const { control, handleSubmit, reset, watch } = useForm<IRegister>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      email: "",
      name: "",
      password: "",
    },
  });

  const { onRegister, isRegisterLoading, openIsFormCode } = useRegister(reset);

  const dataUser = watch(["email", "password"]);

  return (
    <View>
      <View className=" max-w-full flex-center flex-col">
        <Text className="h3-bold text-main-color">Создать новый аккаунт </Text>

        <Text className="text-light-3 small-medium text-center">
          Чтобы использовать Snapgram, введите свои данные
        </Text>

        <View className="flex flex-col w-full mt-[31px] gap-[25px]">
          <Field<IRegister>
            name="name"
            label="Имя"
            control={control}
            editable={!isRegisterLoading}
            placeholder="ivan"
          />

          <Field<IRegister>
            name="email"
            label="Email"
            control={control}
            keyboardType="email-address"
            placeholder="example@mail.ru"
            editable={!isRegisterLoading}
          />

          <Field<IRegister>
            name="password"
            label="Пароль"
            control={control}
            secureTextEntry
            editable={!isRegisterLoading}
            placeholder="********"
          />

          {openIsFormCode && (
            <ResetCode
              control={control}
              name="code"
              label="Код"
              dataUser={{
                email: dataUser[0],
                password: dataUser[1],
              }}
            />
          )}

          <Button
            onPress={handleSubmit(onRegister)}
            disabled={isRegisterLoading}
            className="mt-[5px]"
          >
            {isRegisterLoading ? <ButtonLoader /> : "Зарегистрироваться"}
          </Button>

          <Text className="text-small-regular text- text-center mt-[10px] text-main-color">
            Есть аккаунт?
            <Link
              href="/(auth)/signin"
              className="text-blue-color text-small-semibold ml-1"
            >
              Войти
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
}

export default Register;
