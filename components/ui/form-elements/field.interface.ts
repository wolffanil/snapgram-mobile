import { Control, FieldPath, FieldValues } from "react-hook-form";
import { TextInputProps } from "react-native";

export interface IField<T extends FieldValues>
  extends Omit<TextInputProps, "onChange" | "onChangeText" | "value"> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
}
