<<<<<<< Updated upstream
import React from "react";
import styled from "@emotion/native";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
=======
import { useEffect } from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import {
  HTMLAllCollection,
  doc,
  getFirestore,
  query,
  setDoc,
  getDocs,
} from "firebase/firestore";
>>>>>>> Stashed changes
import { Header } from "react-native/Libraries/NewAppScreen";

const post = {
  contents: "1111",
  date: "23.01.01",
  title: "배고파",
  username: "닉니엠",
};
export default function Community() {
  useEffect(() => {
    (async () => {
      const list = await getPosts();
    })();
  }, []);

  const getPosts = async () => {
    const collectionRef = collection(getFirestore(), "posts");
    const option = query(collectionRef);
    const documentSnapshot = await getDocs(option);
    const documents = documentSnapshot.docs.map((doc) => doc.data());
  };
  return (
    <SafeAreaView>
      <CommunityTitleContainer>
        <CommunityTitle>좋아요 순</CommunityTitle>
      </CommunityTitleContainer>

      <PostBox>
        <PostItem post={post} />
        <PostTitleWrap>
          <PostTitle>이게맞나 싶다</PostTitle>
        </PostTitleWrap>

        <PostDetailWrap>
          <PostDetail>닉네임</PostDetail>
          <PostDetail>23.01.01</PostDetail>
        </PostDetailWrap>
      </PostBox>
    </SafeAreaView>
  );
}

<<<<<<< Updated upstream
const styles = StyleSheet.create({
  //* 게시글 타이틀
  communityTitleContainer: {
    // backgroundColor: "green",
    marginBottom: 30,
    fontWeight: "bold",
  },
  communityTitle: {
    fontSize: 20,
  },

  //* 게시글 내용 (제목, 닉네임, 날짜)
  postBox: {
    marginLeft: 10,
    marginBottom: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  postTitle: {
    // backgroundColor: "beige",
    marginBottom: 10,
    fontSize: 15,
  },
  postDetailWrap: {
    flexDirection: "row",
  },
  postDetail: {
    fontSize: 12,
    marginRight: 5,
    marginBottom: 5,
  },
});
=======
const CommunityTitleContainer = styled.View`
  margin-bottom: 30px;
  font-weight: bold;
`;

const CommunityTitle = styled.Text`
  font-size: 20px;
`;
const PostBox = styled.View`
  margin-left: 10px;
  margin-bottom: 20px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
`;
const PostTitleWrap = styled.View``;
const PostTitle = styled.Text`
  margin-bottom: 10px;
  font-size: 15px;
`;

const PostDetailWrap = styled.View`
  flex-direction: row;
`;

const PostDetail = styled.Text`
  font-size: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
`;
>>>>>>> Stashed changes
