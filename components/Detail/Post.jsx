import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "../../firebase";
import { Text, TouchableOpacity, Alert, View } from "react-native";
import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import { getDate } from "../../utils";
import DetailMbtiColorBtn from "../global/DetailMbtiColorBtn";

export default function Post({ getPostId }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getposts();
  }, []);

  // 포스트 불러오기
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

  // 디테일 페이지에 보여 줄 하나의 본문.
  const getone = posts.find((post) => post.id === getPostId);

  // 본문 삭제하기.
  const deletePost = () => {
    Alert.alert("게시물 삭제", "정말 삭제 하시겠습니까?", [
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

  return (
    <>
      <Wrap>
        <PostContainer>
          <TitleMbtiBox>
            <StyledTitle>{getone?.title}</StyledTitle>
          </TitleMbtiBox>
          <NameDateBox>
            <StyledNickName>{getone?.nickname}</StyledNickName>
            <DetailMbtiColorBtn mbti={getone?.mbti} />
            <StyledDate> {getDate(getone?.date)}</StyledDate>
          </NameDateBox>
          <StyledContent>{getone?.content}</StyledContent>
        </PostContainer>
        {/* <TouchableOpacity onPress={deletePost}>
          <StyledDelete>
            <MaterialIcons name="delete" size={24} color="black" />
          </StyledDelete>
        </TouchableOpacity> */}
      </Wrap>
    </>
  );
}

const Wrap = styled.View`
  padding: 20px;
  align-items: center;
`;

const PostContainer = styled.View`
  width: 95%;
  padding-top: 20px;
`;

const TitleMbtiBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const StyledTitle = styled.Text`
  font-weight: 600;
  font-size: 18px;
  margin-right: 10px;
`;

const NameDateBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const StyledDate = styled.Text`
  font-size: 16px;
  color: gray;
`;

const StyledNickName = styled.Text`
  font-weight: 400;
  font-size: 16px;
  margin-right: 5px;
`;

const StyledContent = styled.Text`
  font-size: 17px;
`;
