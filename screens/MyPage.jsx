import { useState, useEffect, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import { useFocusEffect } from "@react-navigation/native";
// import { GREEN_COLOR, YELLOW_COLOR } from "../colors";

import { authService } from "../firebase";

// import {
//   collection,
//   doc,
//   getDocs,
//   onSnapshot,
//   orderBy,
//   query,
//   where,
// } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function My({ navigation: { navigate, reset, setOptions } }) {
  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        navigate({
          name: "Tabs",
          params: {
            screen: "커뮤니티",
          },
        });
      })
      .catch((err) => alert(err));
  };

  useFocusEffect(
    useCallback(() => {
      if (!authService.currentUser) {
        // 비로그인 상태에서 마이페이지 접근 시 로그인화면으로 이동하고, 뒤로가기 시 무비탭
        reset({
          index: 1,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "커뮤니티",
              },
            },
            {
              name: "Stack",
              params: {
                screen: "Login",
              },
            },
          ],
        });
        return;
      }

      setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={logout}>
              <Text style={{ color: "#312070" }}>로그아웃</Text>
            </TouchableOpacity>
          );
        },
      });
    }, [])
  );
  return <Text>마이페이지</Text>;
}
