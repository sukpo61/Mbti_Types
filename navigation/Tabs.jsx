import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Community from "../screens/Community";
import MyPage from "../screens/MyPage";
import QnA from "../screens/QnA";
import { TouchableOpacity } from "react-native";
import { GREEN_COLOR, YELLOW_COLOR } from "../colors";
import { useColorScheme } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import CommunityAdd from "../screens/CommunityAdd";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CommunityDetail from "../screens/CommunityDetail";
import CommunityEdit from "../screens/CommunityEdit";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const isDark = useColorScheme() === "dark";
  return (
    <Tab.Navigator
      initialRouteName="커뮤니티"
      sceneContainerStyle={{ backgroundColor: "white" }}
      screenOptions={{
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
        tabBarActiveTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
        tabBarLabelPosition: "below-icon",
        tabBarLabelPosition: "below-icon",
        // headerTitle: "",
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: "#EFE8FA" },
        tabBarStyle: { backgroundColor: "#EFE8FA" },
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    >
      <Tab.Screen
        options={{
          headerTitle: "Qna",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="comment-question-outline"
              size={size}
              color={color}
            />
          ),
        }}
        name="상황문답"
        component={QnA}
      />
      <Tab.Screen
        options={{
          headerTitle: "Community",
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={size} color={color} />
          ),
        }}
        name="커뮤니티"
        component={Community}
      />
      <Tab.Screen
        options={{
          headerTitle: "MyPage",
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
