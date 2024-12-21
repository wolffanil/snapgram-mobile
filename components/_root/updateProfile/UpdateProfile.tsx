import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/providers/auth/AuthProvider";
import { ProfileValidation } from "@/shared/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useUpdateProfile } from "./useUpdateProfile";
import { Button, ButtonLoader, Field } from "@/components/ui";
import UpdatePassword from "./updatePassword/UpdatePassword";
import { Image, Text, TextInput, View } from "react-native";
import ProfileUploader from "@/components/ui/form-elements/profileUploader/ProfileUploader";

function UpdateProfile() {
  const { user } = useAuth();
  const { isLight } = useTheme();
  const { setValue, reset, control, handleSubmit } = useForm<IEditUser>({
    resolver: zodResolver(ProfileValidation),
  });
  const { isUpdatingProfile, onSubmit } = useUpdateProfile(setValue, reset);

  return (
    <View className="flex flex-1">
      <View className="common-container">
        <View className="flex-start gap-3 justify-start w-full max-w-full flex-row">
          <Image
            source={require("@/public/assets/icons/edit.png")}
            alt="edit"
            className="w-[32px] h-[32px]"
            style={{
              objectFit: "contain",
            }}
            tintColor={isLight ? "#000" : "#fff"}
          />
          <Text className="h3-bold  text-left w-full text-main-color">
            Редактировать профиль
          </Text>
        </View>

        <View className="flex flex-col gap-7 w-full mt-4 max-w-full items-end">
          <Controller
            control={control}
            name="file"
            render={({ field: { onChange } }) => (
              <View className="mr-auto ">
                <ProfileUploader
                  fieldChange={onChange}
                  mediaUrl={user?.imageUrl || ""}
                  key={user?.imageUrl}
                />
              </View>
            )}
          />

          <Field<IEditUser>
            control={control}
            name="name"
            label="Имя"
            editable={!isUpdatingProfile}
          />

          <Field<IEditUser>
            control={control}
            name="nick"
            label="Ник"
            editable={!isUpdatingProfile}
          />

          <Field<IEditUser>
            control={control}
            name="email"
            label="Email"
            editable={false}
          />

          <Controller
            control={control}
            name="bio"
            render={({
              field: { onChange, onBlur, value },
              formState: { errors },
            }) => (
              <View className={"flex flex-col w-full items-start"}>
                <Text className=" text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-second-color mb-[9px] ">
                  Биография
                </Text>
                <TextInput
                  className="shad-textarea  bg-second-color text-main-color shad-input w-full"
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isUpdatingProfile}
                  value={value?.toString() || ""}
                  textAlignVertical="top"
                  multiline
                />

                {errors.bio && errors.bio.message && (
                  <Text className="shad-form_message mt-[8px]">
                    {errors.bio.message}
                  </Text>
                )}
              </View>
            )}
          />

          <View className="flex gap-4 items-center justify-end">
            <Button
              className=" whitespace-nowrap"
              disabled={isUpdatingProfile}
              onPress={handleSubmit(onSubmit)}
            >
              {isUpdatingProfile ? <ButtonLoader /> : "Обновить"}
            </Button>
          </View>
        </View>
        <UpdatePassword />
      </View>
    </View>
  );
}

export default UpdateProfile;
