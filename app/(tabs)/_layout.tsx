import React from "react";
import { Tabs } from "expo-router";
import { BlurView } from "expo-blur";
import TabIcon from "@/components/ui/tabs/TabIcon";
import icons from "@/constants/bottomBarIcons";
import { Topbar } from "@/components/ui";
import SocketProvider from "@/providers/socket/SocketProvider";
import { useTheme } from "@/hooks/useTheme";
import TabIconChat from "@/components/ui/tabs/TabIconChat";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const MainLayout = () => {
  const { isLight } = useTheme();
  return (
    <SocketProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
          <Topbar />
          <Tabs
            screenOptions={{
              tabBarShowLabel: false,
              animation: "fade",

              tabBarStyle: {
                backgroundColor: isLight ? "#E0E0E0" : "#101012",
                height: 70,
                borderColor: isLight ? "#E0E0E0" : "#101012",
                paddingTop: 12,
              },
              headerShown: false,

              tabBarBackground: () => <BlurView tint="light" intensity={20} />,
            }}
          >
            <Tabs.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIcon icon={icons.home} focused={focused} />
                ),
              }}
            />

            <Tabs.Screen
              name="savePosts"
              options={{
                title: "savePosts",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIcon icon={icons.save} focused={focused} />
                ),
              }}
            />

            <Tabs.Screen
              name="explore"
              options={{
                title: "Explore",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIcon icon={icons.explore} focused={focused} />
                ),
              }}
            />
            <Tabs.Screen
              name="createPost"
              options={{
                title: "Create",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIcon icon={icons.create} focused={focused} />
                ),
              }}
            />
            <Tabs.Screen
              name="chats"
              options={{
                title: "Chats",
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                  <TabIconChat icon={icons.chat} focused={focused} />
                ),
              }}
            />

            <Tabs.Screen
              name="chat"
              options={{
                title: "Chat",
                headerShown: false,
                tabBarStyle: { display: "none" },
                href: null,
              }}
            />

            <Tabs.Screen
              name="allUsers"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="editProfile"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="notifications"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="posts/[postId]"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="update-post/[postId]"
              options={{
                href: null,
              }}
            />
            <Tabs.Screen
              name="cameraQr"
              options={{
                href: null,
                tabBarStyle: { display: "none" },
              }}
            />

            <Tabs.Screen
              name="profile/[profileId]"
              options={{
                href: null,
              }}
            />
          </Tabs>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </SocketProvider>
  );
};

export default MainLayout;
