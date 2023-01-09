import styled from "@emotion/native";
import { ActivityIndicator, RefreshControl, Text, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import { addDoc, collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import Comment from "./Comment";
import { useQuery, useQueryClient } from "react-query";
import { postTime } from "../../utils";

export default function CommentsList () {

    const queryClient = useQueryClient();
    // const [comments, setComments] = useState(["hello"]);
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
      // setComments(array)
      return array;

      // const array = [];
      // await onSnapshot(q, (snapshot) => {
      //   snapshot.docs.map((doc) => (
      //     array.push({
      //     id: doc.id,
      //     ...doc.data()
      //   })))
      //   setComments(array)
      // })
      // return array;
    };

    const { data: comments, isLoading }  = useQuery("communityComments", getComments)
    // console.log("data",comments)

    // 새로고침하기
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

    // 댓글 추가하기.
    const addComment = async () => {
      const newCommnet = {
        postId: "1",
        userId: "test@naver.com",
        nickname: "겨울",
        date: dateString,
        content,
        mbti: "ISFP"
      }

        await addDoc(collection(dbService, "communityComments"), newCommnet);
        setContent("");
    };

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
          <CommentInput value={content} onChangeText={setContent} onSubmitEditing={addComment} placeholder="댓글을 입력해주세요." />
          {/* <Entypo name="pencil" size={24} color="gray" style={{marginRight: 10}} /> */}
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
