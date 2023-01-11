import styled from "@emotion/native";
import React, { useState, useEffect, useRef } from "react";
import { Alert, Text } from "react-native";
import { collection, addDoc, updateDoc } from "firebase/firestore";
import { dbService, authService } from "../firebase";
import { postTime } from "../utils";
export default function CommunityEdit({ navigation: { navigate } }) {
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const [qnas, setQnas] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const CurrentUser = authService.currentUser;
  const { dateString } = postTime();
  // const newQna = {
  //   title,
  //   userId: CurrentUser?.email,
  //   nickname: CurrentUser?.displayName,
  //   content,
  //   date: dateString,
  //   category: "community",
  //   mbti: CurrentUser?.photoURL,
  //   likedUserList: [],
  //   isEdit: false,
  // };
  //상황질문 본문 추가하기
  // const addQna = async () => {
  //   await addDoc(collection(dbService, "communityPosts"), newQna);
  //   setTitle("");
  //   setContent("");
  //   navigate("커뮤니티");
  // };
  //상황질문 본문 수정하기
  const setEdit = async (id) => {
    const idx = qnas.findIndex((qna) => qna.id === id);
    await updateDoc(doc(dbService, "communityPosts", id), {
      isEdit: !qnas[idx].isEdit,
    });
  };
  // const editQna = async (id) => {
  //   await updateDoc(doc(dbService, "communityPosts", id), {
  //     title: editTitle,
  //     content: editContent,
  //     isEdit: false,
  //   });
  // };
  const CheckContents = () => {
    // if (!title) {
    //   alert("제목을 입력하세요.");
    //   return;
    // }
    // if (!content) {
    //   alert("내용을 입력하세요.");
    //   return;
    // }
    setEdit();
    //editQna();
    //addQna();
  };
  return (
    <SafeAreaView>
      <TitleAddInput
        ref={titleRef}
        onChangeText={setTitle}
        value={title}
        placeholder="게시글"
        onSubmitEditing={() => {
          contentRef.current.focus();
        }}
      />
      <CommentAddInput
        ref={contentRef}
        textAlignVertical="top"
        onChangeText={setContent}
        value={content}
        placeholder="수정할 내용"
        multiline={true}
        numberOfLines={10}
      />
      <QnaAddBtn onPress={CheckContents}>
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
