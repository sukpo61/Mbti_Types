import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Community from "../screens/Community";
import MyPage from "../screens/MyPage";
import QnA from "../screens/QnA";
import { TouchableOpacity } from "react-native";
import { GREEN_COLOR, YELLOW_COLOR } from "../colors";
import { useColorScheme } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import Add from "../components/Add";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      sceneContainerStyle={{
        backgroundColor: "white",
      }}
      screenOptions={{
        headerTitle: "",
        headerStyle: { backgroundColor: "#EFE8FA" },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => goBack()}
            style={{ paddingLeft: 20 }}
          >
            <AntDesign name="left" color="#584164" />
          </TouchableOpacity>
        ),
        // headerRight: () => {
        //   return (
        //     <TouchableOpacity onPress={handleAuth}>
        //       <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
        //         {authService.currentUser ? "로그아웃" : "로그인"}
        //       </Text>
        //     </TouchableOpacity>
        //   );
        // },
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="local-movies" size={size} color={color} />
          ),
        }}
        name="상황문답"
        component={Add}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
        name="커뮤니티"
        component={Community}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="user" size={size} color={color} />
          ),
        }}
        name="마이페이지"
        component={MyPage}
      />
    </Tab.Navigator>
  );
}
