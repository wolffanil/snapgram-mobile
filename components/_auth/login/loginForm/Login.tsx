import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { SigninValidation } from "@/shared/validation";
import { Button, ButtonLoader, Field, Logo, ResetCode } from "@/components/ui";
import { useLogin } from "./useLogin";
import { Pressable, Text, View } from "react-native";
import { IChangeForm } from "../open-reset-form.interface";

function Login({ setIsChangeForm }: IChangeForm) {
  const { control, handleSubmit, reset, watch } = useForm<ILogin>({
    resolver: zodResolver(SigninValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dataUser = watch(["email", "password"]);

  const { isLoginLoading, onLogin, openIsFormCode } = useLogin(reset);

  return (
    <View className="max-w-full flex-center flex-col ">
      <Logo />
      <Text className="h3-bold text-main-color mt-[24px]">
        Войдите в свой аккаунт
      </Text>

      <Text className="text-light-3 small-medium  mt-[14px] text-center">
        Добро пожаловать! Пожалуйста, введите свои данные.
      </Text>

      <View className="flex flex-col w-full mt-[31px] gap-[20px]">
        <Field<ILogin>
          name="email"
          label="Email"
          control={control}
          keyboardType="email-address"
          editable={!isLoginLoading}
          placeholder="example@mail.ru"
        />

        <Field<ILogin>
          name="password"
          label="Пароль"
          control={control}
          secureTextEntry
          editable={!isLoginLoading}
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
          onPress={handleSubmit(onLogin)}
          disabled={isLoginLoading}
          className="mt-[10px]"
        >
          {isLoginLoading ? <ButtonLoader /> : "Войти"}
        </Button>

        <Pressable
          onPress={() => setIsChangeForm(true)}
          disabled={isLoginLoading}
          className="mb-[9px]"
        >
          <Text className="text-sm font-medium leading-none text-second-color">
            Забыли пароль?
          </Text>
        </Pressable>

        <Text className="text-small-regular text-center mt-[5px] text-main-color">
          У вас нет учетной записи?
          <Link
            href="/(auth)/signup"
            className="text-blue-color text-small-semibold ml-1"
          >
            <Text>Зарегистрироваться</Text>
          </Link>
        </Text>
      </View>
    </View>
  );
}

export default Login;
