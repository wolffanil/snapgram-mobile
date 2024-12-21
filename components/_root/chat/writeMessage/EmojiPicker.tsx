import { useTheme } from "@/hooks/useTheme";
import { Fragment, useState, type FC } from "react";
import { Image, Pressable } from "react-native";
import EmojiPicker, { EmojiType } from "rn-emoji-keyboard";

interface IEmojiPickerComponent {
  handlePick: (emoji: EmojiType) => void;
}

const EmojiPickerComponent: FC<IEmojiPickerComponent> = ({ handlePick }) => {
  const { isLight } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  return (
    <Fragment>
      <Pressable onPress={handleOpen}>
        <Image
          source={require("@/public/assets/icons/emoji-picker.png")}
          className="w-[20px] h-[20px]"
          style={{
            objectFit: "contain",
          }}
        />
      </Pressable>

      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={handleClose}
        theme={
          !isLight
            ? {
                backdrop: "#16161888",
                knob: "#766dfc",
                container: "#282829",
                header: "#fff",
                skinTonesContainer: "#252427",
                category: {
                  icon: "#766dfc",
                  iconActive: "#fff",
                  container: "#252427",
                  containerActive: "#766dfc",
                },
                customButton: {
                  icon: "#766dfc",
                  iconPressed: "#fff",
                  background: "#252427",
                  backgroundPressed: "#766dfc",
                },
                search: {
                  text: "#fff",
                  placeholder: "#ffffff2c",
                  icon: "#fff",
                  background: "#00000011",
                },
              }
            : {}
        }
      />
    </Fragment>
  );
};

export default EmojiPickerComponent;
