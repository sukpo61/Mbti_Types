import styled from "@emotion/native";
import { ActivityIndicator, RefreshControl, Text, TouchableOpacity, Alert } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { authService, dbService } from "../../firebase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query, deleteDoc, doc } from "firebase/firestore";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { postTime } from "../../utils";
import { useNavigation } from "@react-navigation/native";

export default function CommentsList () {

    const queryClient = useQueryClient();
    const { navigate } = useNavigation();
    const user = authService.currentUser;

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [content, setContent] = useState("");
    const [isRefreshing, setIsRefreshing] = useState(false);
    const { dateString } = postTime();

    useEffect(() => {
        getComments();
    }, []);

    // 댓글 데이터 불러오기.
    const getComments = async () => {
      const q = query(
        collection(dbService, "communityComments"),
        orderBy("date", "desc")
      );

      const array = [];
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => array.push({
        id: doc.id,
        ...doc.data()
      }))
      return array;
    };

    const { data: comments, isLoading }  = useQuery("communityComments", getComments)

    // 댓글 추가할 때 새로운 댓글 객체.
    const newCommnet = {
      postId: "1",
      userId: user?.email,
      nickname: user?.displayName,
      date: dateString,
      content,
      mbti: user?.photoURL
    };

    // 로그인하지 않고 댓글 입력창 클릭할 때
    const addCommentHandler = () => {
      if (!user) {
        alert("댓글 작성은 로그인 후에 가능합니다.")
        navigate("Stack", {
          screen: "Login"
        })
      } else {
        addMutate()
      }
    }

    // 댓글 추가하기.
    const addComment = async () => {
        await addDoc(collection(dbService, "communityComments"), newCommnet);
        setContent("");
    };

    // 댓글 추가하기.
    const { mutate: addMutate } = useMutation(addComment, {
      onSuccess: () => {
        queryClient.invalidateQueries("communityComments");
      }
    });

    // 새로고침하기.
    const onRefresh = async () => {
      setIsRefreshing(true);
      await queryClient.refetchQueries("communityComments");
      setIsRefreshing(false);
    };

    if (isLoading || isRefreshing) {
      return (
        <Loader>
          <ActivityIndicator size="large" />
        </Loader>
      )
    }

    return (
      <>
        <Wrap 
          contentContainerStyle={{alignItems: "center"}} 
          refreshControl={
            <RefreshControl 
              refreshing={isRefreshing} 
              onRefresh={onRefresh}
            />
          }    
        >
          <Text>본문 들어가는 자리</Text>
          <Line />
          <CommentsContainer>
              <CommentsCount>댓글 {comments.filter((co) => co.postId === "1").length}</CommentsCount>
              {comments.map((co) => (
                <Comment key={co.id} comment={co} />
              ))}
          </CommentsContainer>
        </Wrap>
        <CommentAddContainer>
          <CommentInput value={content} onChangeText={setContent} onSubmitEditing={addCommentHandler} placeholder="댓글을 입력해주세요." />
        </CommentAddContainer>
      </>
    )

};

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Wrap = styled.ScrollView`
  padding: 20px;
`

const Line = styled.View`
  width: 95%;
  height: 1px;
  text-align: center;
  background-color: lightgray;
  margin: 30px 0;
`

const CommentsContainer = styled.View`
  width: 95%;
  margin-bottom: 30px;
`

const CommentsCount = styled.Text`
  font-size: 20px;
  margin-bottom: 25px;
`

const CommentAddContainer = styled.View`
  height: 60px;
  width: 100%;
  /* position: fixed; */
  background-color: #FAFAFA;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CommentInput = styled.TextInput`
  border-radius: 20px;
  height: 40px;
  width: 85%;
  font-size: 19px;
  padding: 5px 20px;
  background-color: #f1f3f5;
`
