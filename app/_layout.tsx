import Provider from "@/providers/Provider";
import { Stack } from "expo-router";
import { StatusBarComponent } from "@/components/ui";
import "../global.css";

const RootLayout = () => {
  return (
    <Provider>
      <StatusBarComponent />
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
