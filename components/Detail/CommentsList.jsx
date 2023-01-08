import styled from "@emotion/native";
import { Text, TouchableOpacity } from "react-native";
import { Entypo } from '@expo/vector-icons'; 
import { useEffect, useState } from "react";
import { dbService } from "../../firebase";
import { addDoc, collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Comment from "./Comment";

export default function CommentsList () {

    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        getComments();
    }, []);

    const getComments = async () => {
        const q = query(
            collection(dbService, "communityComments"),
            orderBy("date", "desc")
        );

        onSnapshot(q, (snapshot) => {
            const newComments = snapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setComments(newComments)
        })
    };

    const addComment = async () => {
        const newCommnet = {
            postId: "1",
            userId: "test@naver.com",
            nickname: "겨울",
            date: new Date(),
            content,
            mbti: "ISFP"
        }

        await addDoc(collection(dbService, "communityComments"), newCommnet);
        setContent("");
    };

    return (
      <>
        <Wrap contentContainerStyle={{alignItems: "center"}}>
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
          {/* <Entypo name="pencil" size={24} color="gray" style={{marginRight: 10}} /> */}
          <CommentInput value={content} onChangeText={setContent} onSubmitEditing={addComment} placeholder="댓글을 입력해주세요." />
        </CommentAddContainer>
      </>
    )

};

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
