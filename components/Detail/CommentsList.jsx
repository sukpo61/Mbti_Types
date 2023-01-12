import styled from "@emotion/native";
import { ActivityIndicator, RefreshControl } from "react-native";
import { useState } from "react";
import { authService, dbService } from "../../firebase";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import Comment from "./Comment";
import { useQuery, useQueryClient } from "react-query";
import { useEffect } from "react";

export default function CommentsList ({getPost}) {

    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);

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
    // 특정 본문의 댓글만 필터링하기.
    const postComments = comments?.filter((co) => co.postId === getPost.id)

    // 새로고침하기.
    const onRefresh = async () => {
      setIsRefreshing(true);
      await queryClient.refetchQueries("communityComments");
      setIsRefreshing(false);
    };

    // 로딩 중일 때 로딩 이미지.
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
          <Line />
          <CommentsContainer>
              <CommentsCount>댓글 {postComments.length}</CommentsCount>
              {postComments.map((co) => (
                <Comment key={co.id} comment={co} />
              ))}
          </CommentsContainer>
        </Wrap>
      </>
    )

};

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Wrap = styled.ScrollView`
 padding: 0 20px 0px 20px;
`

const Line = styled.View`
  width: 95%;
  height: 1px;
  text-align: center;
  background-color: lightgray;
  margin-top: 10px;
`

const CommentsContainer = styled.View`
  width: 95%;
  margin-bottom: 30px;
`

const CommentsCount = styled.Text`
  font-size: 20px;
  margin-bottom: 25px;
  margin-top: 30px;
`