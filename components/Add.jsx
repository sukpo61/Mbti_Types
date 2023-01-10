import styled from "@emotion/native";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text } from "react-native";
import {
  onSnapshot,
  query,
  collection,
  //doc,
  orderBy,
  addDoc,
  //getDoc,
  //getDocs,
  //updateDoc,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { dbService } from "../firebase";

export default function Add() {
  const [qnas, setQnas] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const newQna = {
    title,
    userId: "test@test.com",
    nickname: "글로리",
    content,
    date: new Date(),
    category: "상황문답",
  };

  //상황질문 본문 추가하기
  const addQna = async () => {
    await addDoc(collection(dbService, "q&aadd"), newQna);
    setTitle("");
    setContent("");
  };

  const handleAdding = () => {
    addQna();
  };

  useEffect(() => {
    const q = query(
      collection(dbService, "q&aadd"),
      orderBy("createdAt", "desc")
    );

    onSnapshot(q, (snapshot) => {
      const newQnas = snapshot.docs.map((doc) => {
        const newQna = {
          id: doc.id,
          ...doc.data(),
        };
        return newQna;
      });
      setQnas(newQnas);
    });
  });

  return (
    <SafeAreaView>
      <TitleAddInput
        onSubmitEditing={addQna}
        onChangeText={setTitle}
        value={title}
        placeholder="제목"
      />
      <CommentAddInput
        textAlignVertical="top"
        onSubmitEditing={addQna}
        onChangeText={setContent}
        value={content}
        placeholder="내용을 입력하세요"
        multiline={true}
        numberOfLines={10}
      />
      <QnaAddBtn onPress={handleAdding}>
        <Text>작성하기</Text>
      </QnaAddBtn>
    </SafeAreaView>
  );
}

const TitleAddInput = styled.TextInput`
  height: 80px;
  width: 100%;
  font-size: 19px;
  padding: 5px 20px;
`;

const CommentAddInput = styled.TextInput`
  height: 73%;
  width: 100%;
  font-size: 19px;
  padding: 20px;
  background-color: white;
  vertical-align: top;
`;

const QnaAddBtn = styled.TouchableOpacity`
  margin: 20px;
  padding: 10px;
  border-radius: 20px;
  border-width: 1px;
  align-items: center;
  background-color: #33a9f2;
`;
