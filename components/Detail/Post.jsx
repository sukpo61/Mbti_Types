import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  orderBy,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "../../firebase";
import { Text, TouchableOpacity, Alert, View } from "react-native";
import styled from "@emotion/native";
import { AntDesign } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

const StyledHeader = styled.View`
  position: absolute;
  width: 100%;
  height: 60px;
  background-color: #e7cdf7;
`;
const StyledBackIcon = styled.View`
  position: absolute;
  left: 2.22%;
  right: 93.33%;
  top: 30%;
  bottom: 30%;
`;
const StyledTitle = styled.Text`
  position: absolute;
  width: 64px;
  height: 28px;
  left: 16px;
  top: 92px;

  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 28px;
  /* identical to box height, or 215% */

  display: flex;
  align-items: center;
`;
const StyledMbti = styled.Text`
  position: absolute;
  width: 64px;
  height: 28px;
  left: 60px;
  top: 92px;

  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 28px;
  /* identical to box height, or 215% */

  display: flex;
  align-items: center;
`;
const StyledNickName = styled.Text`
  position: absolute;
  width: 30px;
  height: 28px;
  left: 16px;
  top: 120px;

  font-style: normal;
  font-weight: 400;
  font-size: 8px;
  /* identical to box height, or 350% */

  display: flex;
  align-items: center;
  text-align: center;
`;
const StyledDelete = styled.Text`
  height: 30px;
  width: 37px;
  left: 321px;
  top: 117px;
  border-radius: 0px;
  position: absolute;
`;
const StyledContent = styled.Text`
  position: absolute;
  width: 49px;
  height: 12px;
  left: 16px;
  top: 164px;

  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
`;
const StyledhrTag = styled.View`
  position: absolute;
  width: 306px;
  height: 0px;
  left: 27px;
  top: 223px;
  border: 1px solid black;
`;
const StyledMainTextComment = styled.Text`
  position: absolute;
  width: 28px;
  height: 12px;
  left: 15px;
  top: 248px;

  font-style: normal;
  font-weight: 400;
  font-size: 10px;
  line-height: 12px;
`;
export default function Post() {
  const [posts, setPosts] = useState([]);

  const getposts = () => {
    const q = query(collection(dbService, "communityPosts"));
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        const newState = {
          id: doc.id,
          ...doc.data(),
        };
        return newState;
      });
      setPosts(posts);
    });
  };
  const getone = posts.find((post) => post.id === "GBj0EZLDde5oOeqS4RRB");
  console.log(getone);
  useEffect(() => {
    getposts();
  }, []);
  const deletePost = () => {
    Alert.alert("본문삭제", "정말 삭제 하시겠습니까?", [
      {
        text: "취소",
        style: "cancel",
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          deleteDoc(doc(dbService, "communityPosts", getone.id));
        },
      },
    ]);
  };
  console.log(getone.mbti);
  return (
    <>
      <View>
        <StyledHeader>
          <StyledBackIcon>
            <AntDesign name="left" size={24} color="black" />
          </StyledBackIcon>
        </StyledHeader>
        <StyledTitle>{getone?.title}</StyledTitle>
        <StyledMbti>{getone?.mbti}</StyledMbti>
        <StyledNickName>{getone?.nickname}</StyledNickName>
        <TouchableOpacity onPress={deletePost}>
          <StyledDelete>
            <MaterialIcons name="delete" size={24} color="black" />
          </StyledDelete>
        </TouchableOpacity>
      </View>
      <StyledContent>{getone?.content}</StyledContent>
      <StyledhrTag></StyledhrTag>
      <StyledMainTextComment>댓글</StyledMainTextComment>
    </>
  );
}
