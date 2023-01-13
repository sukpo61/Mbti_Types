import QnACommentsList from "../components/QnADetail/QnACommentsList";
import Post from "../components/Detail/Post";
import QnACommentAddInput from "../components/QnADetail/QnACommentAddInput";
import styled from "@emotion/native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { authService } from "../firebase";
import { Feather } from "@expo/vector-icons";
import { Alert } from "react-native";
import {
  onSnapshot,
  query,
  collection,
  doc,
  deleteDoc,
  where,
} from "firebase/firestore";
import { dbService } from "../firebase";

export default function QnADetail({
  navigation: { setOptions, reset, goBack },
  route: {
    params: { getPost },
  },
}) {
  const user = authService.currentUser;
  const [posts, setPosts] = useState([]);
  const { navigate } = useNavigation();

  useEffect(() => {
    getposts();
  }, []);

  // 포스트 불러오기
  const getposts = () => {
    const q = query(
      collection(dbService, "posts"),
      where("category", "==", "qna")
    );
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
          deleteDoc(doc(dbService, "posts", getPost?.id));
          reset({
            index: 0,
            routes: [
              {
                name: "Tabs",
                params: {
                  screen: "상황문답",
                },
              },
            ],
          });
        },
      },
    ]);
  };

  // 헤더에 수정 아이콘 클릭 시 수정 페이지로 이동.
  const goToEdit = () => {
    navigate("Stack", {
      screen: "QnAEdit",
      params: { getPost },
    });
  };

  // 로그인 여부에 따라 헤더 우측에 본문 수정, 삭제 아이콘 띄움.
  useFocusEffect(
    useCallback(() => {
      setOptions({
        headerRight: () => {
          return (
            <>
              {user?.email == getPost?.userId ? (
                <>
                  <TouchableOpacity onPress={goToEdit}>
                    <Feather name="edit" size={22} color="black" />
                  </TouchableOpacity>
                  <DeleteBtn onPress={deletePost}>
                    <Feather name="trash-2" size={23} color="black" />
                  </DeleteBtn>
                </>
              ) : null}
            </>
          );
        },
      });
    }, [])
  );
  return (
    <>
      <ScrollView>
        <Post getPost={getPost} posts={posts} />
        <QnACommentsList getPost={getPost} />
      </ScrollView>
      <QnACommentAddInput getPost={getPost} />
    </>
  );
}

const TouchableOpacity = styled.TouchableOpacity`
  margin-left: 10px;
`;
const Text = styled.Text``;
const ScrollView = styled.ScrollView`
  background-color: white;
`;

const DeleteBtn = styled.TouchableOpacity`
  margin-left: 15px;
  margin-right: 5px;
`;
