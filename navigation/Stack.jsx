import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, useColorScheme } from "react-native";
// import { GREEN_COLOR, YELLOW_COLOR } from "../colors";
// import { authService } from "../firebase";
// import { signOut } from "firebase/auth";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import CommunityAdd from "../screens/CommunityAdd";
import CommunityDetail from "../screens/CommunityDetail";
import CommunityEdit from "../screens/CommunityEdit";
import QnAAdd from "../screens/QnAAdd";
import QnADetail from "../screens/QnADetail";
import QnAEdit from "../screens/QnAEdit";

const NativeStack = createNativeStackNavigator();

export default function Stack({
  navigation: { goBack, navigate, setOptions },
}) {
  const isDark = useColorScheme() === "dark";

  const handleAuth = () => {
    if (!!authService.currentUser?.uid) {
      // 로그아웃 요청
      signOut(authService)
        .then(() => {
          console.log("로그아웃 성공");
          setOptions({ headerRight: null });
        })
        .catch((err) => alert(err));
    } else {
      // 로그인 화면으로
      navigate("Login");
    }
  };
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerLeft: () => (
          <TouchableOpacity onPress={() => goBack()}>
            <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
              뒤로
            </Text>
          </TouchableOpacity>
        ),
        headerRight: () => {
          return (
            <TouchableOpacity onPress={handleAuth}>
              <Text style={{ color: isDark ? YELLOW_COLOR : GREEN_COLOR }}>
                {authService.currentUser ? "로그아웃" : "로그인"}
              </Text>
            </TouchableOpacity>
          );
        },
        headerTintColor: isDark ? YELLOW_COLOR : GREEN_COLOR,
      }}
    >
      <NativeStack.Screen name="Login" component={Login} />
      <NativeStack.Screen name="SignUp" component={SignUp} />
      <NativeStack.Screen name="CommunityAdd" component={CommunityAdd} />
      <NativeStack.Screen name="CommunityDetail" component={CommunityDetail} />
      <NativeStack.Screen name="CommunityEdit" component={CommunityEdit} />
      <NativeStack.Screen name="QnAAdd" component={QnAAdd} />
      <NativeStack.Screen name="QnADetail" component={QnADetail} />
      <NativeStack.Screen name="QnAEdit" component={QnAEdit} />
    </NativeStack.Navigator>
  );
}
