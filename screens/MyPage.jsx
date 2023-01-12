import { useState, useEffect, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import styled from "@emotion/native";
import { useFocusEffect } from "@react-navigation/native";
// import { GREEN_COLOR, YELLOW_COLOR } from "../colors";

import { authService, dbService } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ComuPosts from "../components/MyPage/ComuPosts";
import QnAPosts from "../components/MyPage/QnAPosts";
import Back from "../assets/mypageback.png";

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
import { StyleSheet } from "react-native";

export default function My({ navigation: { navigate, reset, setOptions } }) {
  const [postlist, setPostlist] = useState([]);
  const [pagestate, setPagestate] = useState(true);

  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        reset({
          index: 0,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "커뮤니티",
              },
            },
          ],
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
              <LogoutText style={{ color: "#312070" }}>로그아웃</LogoutText>
            </TouchableOpacity>
          );
        },
      });
    }, [])
  );

  const ComuText = styled.Text`
    color: ${pagestate ? "#312070" : ""};
  `;
  const LikeText = styled.Text`
    color: ${pagestate ? "" : "#312070"};
  `;
  return (
    <>
      <ImgandText>
        <BackImage source={require("../assets/mypageback.png")} />

        <MyPageTitleWrap>
          <RowText>
            <Text>{authService.currentUser?.displayName}</Text>
            <Text>님의 MBTI는</Text>
          </RowText>
          <RowText>
            <MBTIText>{authService.currentUser?.photoURL}</MBTIText>
            <Text> 입니다.</Text>
          </RowText>
        </MyPageTitleWrap>
      </ImgandText>
      <PostNav>
        <ComuNav
          onPress={() => {
            setPagestate(true);
          }}
        >
          <ComuText>내가 작성한글</ComuText>
        </ComuNav>
        <LikeNav
          onPress={() => {
            setPagestate(false);
          }}
        >
          <LikeText>내가 좋아요 한 글</LikeText>
        </LikeNav>
      </PostNav>
      {pagestate ? <ComuPosts></ComuPosts> : <QnAPosts></QnAPosts>}
    </>
  );
}

// const backImg = styled.img.attrs({ src: Image })`
//   width: 100px;
//   height: 100px;
//   object-fit: cover;
// `;

const BackImage = styled.Image`
  position: absolute;
  width: 40%;
  height: 100%;
  object-fit: cover;
  top: 0;
  left: -20px;
  z-index: 0;
  opacity: 0.5;
`;

const Text = styled.Text`
  font-size: 20px;
`;
const MBTIText = styled(Text)`
  color: ${(props) => {
    let mbti = props.children;
    if (
      mbti === "ISTP" ||
      mbti === "ISFP" ||
      mbti === "ESTP" ||
      mbti === "ESFP"
    ) {
      return "#523800";
    }
    if (
      mbti === "ISTJ" ||
      mbti === "ISFJ" ||
      mbti === "ESTJ" ||
      mbti === "ESFJ"
    ) {
      return "#004a63";
    }
    if (
      mbti === "INFJ" ||
      mbti === "INFP" ||
      mbti === "ENFJ" ||
      mbti === "ENFP"
    ) {
      return "#005331";
    }
    if (
      mbti === "INTJ" ||
      mbti === "INTP" ||
      mbti === "ENTJ" ||
      mbti === "ENTP"
    ) {
      return "#370050";
    }
  }};
`;

const LogoutText = styled.Text``;

const RowText = styled.View`
  flex-direction: row;
  z-index: 10;
`;
const ImgandText = styled.View`
  background-color: #efe8fa;
`;

const MyPageTitleWrap = styled.View`
  display: flex;
  flex-direction: column;
  height: 112px;
  padding: 20px 32px;
  justify-content: space-around;
  opacity: 1;
`;

const PostNav = styled.View`
  background-color: whitesmoke;
  height: 40px;
  justify-content: center;
  display: flex;
  flex-direction: row;
`;

const ComuNav = styled.TouchableOpacity`
  height: 40px;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const LikeNav = styled.TouchableOpacity`
  height: 40px;
  width: 50%;
  justify-content: center;
  align-items: center;
`;

const LogoutBox = styled.View``;

//마이페이지 start
