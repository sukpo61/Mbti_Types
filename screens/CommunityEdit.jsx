import styled from "@emotion/native";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Text } from "react-native";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { dbService } from "../firebase";
export default function CommunityEdit({
  navigation: { reset },
  route: {
    params:  { getPost},
  },
}) {

  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [title, setTitle] = useState(getPost.title);
  const [content, setContent] = useState(getPost.content);
  
  // 본문 수정하기.
  const editPost = async () => {
    await updateDoc(doc(dbService, "communityPosts", getPost.id), {
      title,
      content,
    });
    reset({
      index: 1,
      routes: [
        {
          name: "Tabs",
          params: { screen: "커뮤니티" }
      },
      {
        name: "Stack",
        params: {
          screen: "CommunityDetail",
          params: { getPost: {...getPost, title, content} },
        },
      },
      ],
    });
  };

  return (
    <SafeAreaView>
      <TitleAddInput
        ref={titleRef}
        onChangeText={setTitle}
        defaultValue={getPost.title}
        onSubmitEditing={() => {
          contentRef.current.focus();
        }}
      />
      <CommentAddInput
        ref={contentRef}
        textAlignVertical="top"
        onChangeText={setContent}
        defaultValue={getPost.content}
        multiline={true}
        numberOfLines={10}
      />
      <QnaAddBtn onPress={editPost}>
        <Text>수정하기</Text>
      </QnaAddBtn>
    </SafeAreaView>
  );
}
const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: white;
`;
const TitleAddInput = styled.TextInput`
  height: 80px;
  width: 100%;
  font-size: 19px;
  padding-left: 20px;
  background-color: #efe8fa;
`;
const CommentAddInput = styled.TextInput`
  width: 100%;
  font-size: 19px;
  padding: 20px;
  background-color: white;
  vertical-align: top;
`;
const QnaAddBtn = styled.TouchableOpacity`
  margin: auto 20px 20px 20px;
  padding: 10px;
  border-radius: 20px;
  color: #584164;
  align-items: center;
  justify-content: center;
  background-color: #e7dfea;
`;
