import styled from "@emotion/native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation, useQueryClient } from "react-query";
import { authService, dbService } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import { postTime } from "../../utils";

export default function CommentAddInput ({getPost}) {
    const [content, setContent] = useState("");
    const { navigate } = useNavigation();
    const queryClient = useQueryClient();
    const user = authService.currentUser;
    const { dateString } = postTime();

    // 댓글 추가할 때 새로운 댓글 객체.
    const newCommnet = {
      postId: getPost.id,
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


    return (
        <CommentAddContainer>
          <CommentInput value={content} onChangeText={setContent} onSubmitEditing={addCommentHandler} placeholder="댓글을 입력해주세요." />
        </CommentAddContainer>
    )
};

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