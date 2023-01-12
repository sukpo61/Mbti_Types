import styled from "@emotion/native";
import {
  ActivityIndicator,
  RefreshControl,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { authService, dbService } from "../../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
  doc,
} from "firebase/firestore";
import QnAComment from "./QnAComment";
import { useMutation, useQuery, useQueryClient } from "react-query";

export default function QnACommentsList({ getPost }) {
  const queryClient = useQueryClient();
  const user = authService.currentUser;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getComments();
  }, []);

  // 댓글 데이터 불러오기.
  const getComments = async () => {
    const q = query(
      collection(dbService, "qnaComments"),
      orderBy("date", "desc")
    );

    const array = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) =>
      array.push({
        id: doc.id,
        ...doc.data(),
      })
    );
    return array;
  };

  const { data: comments, isLoading } = useQuery(
    "qnaComments",
    getComments
  );
  const postComments = comments?.filter((co) => co.postId === getPost.id);

  // 새로고침하기.
  const onRefresh = async () => {
    setIsRefreshing(true);
    await queryClient.refetchQueries("qnaComments");
    setIsRefreshing(false);
  };

  if (isLoading || isRefreshing) {
    return (
      <Loader>
        <ActivityIndicator size="large" />
      </Loader>
    );
  }

  return (
    <>
      <Wrap
        contentContainerStyle={{ alignItems: "center" }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Line />
        <CommentsContainer>
          <CommentsCount>댓글 {postComments.length}</CommentsCount>
          {postComments.map((co) => (
            <QnAComment key={co.id} comment={co} />
          ))}
        </CommentsContainer>
      </Wrap>
    </>
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Wrap = styled.ScrollView`
  padding: 0 20px 0px 20px;
`;

const Line = styled.View`
  width: 95%;
  height: 1px;
  text-align: center;
  background-color: lightgray;
  margin-top: 10px;
`;

const CommentsContainer = styled.View`
  width: 95%;
  margin-bottom: 30px;
`;

const CommentsCount = styled.Text`
  font-size: 15px;
  margin-bottom: 25px;
  margin-top: 30px;
`;
