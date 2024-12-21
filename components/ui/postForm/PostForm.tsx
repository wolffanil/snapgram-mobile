import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { usePost } from "./usePost";
import Field from "../form-elements/Field";
import Button from "../Button";
import { useFocusEffect, useRouter } from "expo-router";
import { PostValidation } from "@/shared/validation";
import { Text, View } from "react-native";
import FileUploader from "../form-elements/FileUploader";
import { useEffect } from "react";

interface IPostForm {
  action: "Create" | "Update";
  post?: IPost;
}

function PostForm({ post, action }: IPostForm) {
  const router = useRouter();

  const { control, handleSubmit, reset, setError, setValue } =
    useForm<IEditPost>({
      resolver: zodResolver(PostValidation),
      defaultValues: {
        caption: post ? post?.caption : "",
        file: [],
        location: post ? post?.location : "",
        tags: post ? post?.tags.join(",") : "",
        imageUrl: post ? post?.imageUrl : "",
      },
      mode: "onSubmit",
    });

  useEffect(() => {
    setValue("caption", post?.caption ?? "");
    setValue("location", post?.location ?? "");
    setValue("tags", post?.tags.join(",") ?? "");
    setValue("imageUrl", post?.imageUrl ?? "");
  }, [post]);

  const { onSubmit, isLoading } = usePost(action, reset, setError, post?._id);

  return (
    <View className="flex flex-col gap-9 w-full max-w-full ">
      <Field<IEditPost>
        control={control}
        name="caption"
        label="Заголовок"
        placeholder="Путешествия"
      />

      <Controller
        control={control}
        name="file"
        render={({ field: { onChange }, formState: { errors } }) => (
          <>
            <FileUploader
              fieldChange={onChange}
              mediaUrl={post?.imageUrl || ""}
              key={post?.imageUrl + (post?._id || "")}
            />
            {errors?.file && errors.file?.message && (
              <Text className="shad-form_message mt-[-20px]">
                {errors.file.message}
              </Text>
            )}
          </>
        )}
      />

      <Field<IEditPost>
        control={control}
        name="location"
        label="Добавить местоположение"
        placeholder="Россия"
      />

      <Field<IEditPost>
        control={control}
        name="tags"
        label="Тэги"
        placeholder="круто, весело"
      />

      <View className="flex gap-4 items-center justify-end flex-row">
        <Button
          disabled={isLoading}
          onPress={() => {
            reset();
            router.back();
          }}
        >
          Отмена
        </Button>

        <Button
          className="whitespace-nowrap"
          disabled={isLoading}
          onPress={handleSubmit(onSubmit)}
        >
          {isLoading
            ? "Загрузка..."
            : `${action === "Create" ? "Создать" : "Обновить"} Пост`}
        </Button>
      </View>
    </View>
  );
}

export default PostForm;
