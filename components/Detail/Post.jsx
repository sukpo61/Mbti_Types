import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { Text, TouchableOpacity, Alert, View } from "react-native";
import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import MbtiColorBtnCommunity from "../global/MbtiColorBtnCommunity";
import { getDate } from "../../utils";
import { AntDesign } from "@expo/vector-icons";
import { authService } from "../../firebase";
import { dbService } from "../../firebase";
import { async } from "@firebase/util";

export default function Post({ getPost }) {
  const [post, setPost] = useState(getPost);
  const [state, setState] = useState(false);

  const getpost = () => {
    const q = query(collection(dbService, "posts"));
    onSnapshot(q, (snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        const newState = {
          id: doc.id,
          ...doc.data(),
        };
        return newState;
      });
      const getone = posts.find((post) => post?.id === getPost?.id);
      setPost(getone);
    });
  };

  const currentUid = authService.currentUser?.email.toString();

  const LikeRef = doc(dbService, "posts", getPost?.id);

  const Like_Button = async () => {
    if (post.likedUserList?.includes(currentUid)) {
      let newarray = [...post.likedUserList].filter((e) => e !== currentUid);
      await updateDoc(LikeRef, {
        likedUserList: newarray,
      });
      setState((e) => !e);
    } else {
      let newarray = [...post.likedUserList, currentUid];
      await updateDoc(LikeRef, {
        likedUserList: newarray,
      });
      setState((e) => !e);
    }
  };

  const Likecolor = () => {
    if (post.likedUserList?.includes(currentUid)) {
      return "tomato";
    } else {
      return "#584164";
    }
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
          deleteDoc(doc(dbService, "posts", getone?.id));
        },
      },
    ]);
  };

  useEffect(() => {
    getpost();
  }, [state]);

  return (
    <>
      <Wrap>
        <PostContainer>
          <TitleMbtiBox>
            <StyledTitle>{post?.title}</StyledTitle>
            {getPost.category === "community" ? (
              <MbtiColorBtnCommunity mbti={post?.mbti} />
            ) : (
              <QnaBtn>
                <QnAText>QnA</QnAText>
              </QnaBtn>
            )}
          </TitleMbtiBox>
          <NameDateBox>
            <StyledNickName>{post?.nickname}</StyledNickName>
            <StyledDate> {getDate(post?.date)}</StyledDate>
          </NameDateBox>
          <StyledContent>{post?.content}</StyledContent>
        </PostContainer>
      </Wrap>
      <LikeButtonWrap>
        {!authService.currentUser ? (
          <LikePreview>
            <AntDesign name="heart" size={15} color="tomato" />
            <Text>{post.likedUserList?.length}</Text>
          </LikePreview>
        ) : (
          <LikeButton onPress={Like_Button}>
            <AntDesign name="heart" size={15} color={Likecolor()} />

            <Text>{post.likedUserList?.length}</Text>
          </LikeButton>
        )}
      </LikeButtonWrap>
    </>
  );
}

const QnaBtn = styled.View`
  height: 20px;
  width: 56px;
  background-color: #696969;
  border-radius: 20px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const QnAText = styled.Text`
  color: white;
  font-size: 12px;
  font-weight: bold;
  padding-left: 2px;
`;

const LikeButtonWrap = styled.View`
  width: 100%;
  flex-direction: row;
  padding: 10px 20px;
`;

const LikeButton = styled.TouchableOpacity`
  width: 50px;
  height: 30px;
  border-radius: 25px;
  background-color: whitesmoke;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 5px;
  align-items: center;
`;
const LikePreview = styled.View`
  width: 50px;
  height: 30px;
  border-radius: 25px;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 5px;
  align-items: center;
`;

const Wrap = styled.View`
  padding: 10px 20px;
  align-items: center;
  min-height: 200px;
`;

const PostContainer = styled.View`
  width: 95%;
  padding-top: 20px;
`;

const TitleMbtiBox = styled.View`
  flex-direction: row;
  margin-bottom: 5px;
`;

const StyledTitle = styled.Text`
  width: 80%;
  font-weight: 600;
  font-size: 18px;
  margin-right: 10px;
`;

const NameDateBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 15px;
`;

const StyledDate = styled.Text`
  font-size: 16px;
  color: gray;
`;

const StyledNickName = styled.Text`
  font-weight: 400;
  font-size: 14px;
  margin-right: 5px;
`;

const StyledContent = styled.Text`
  font-size: 14px;
`;
