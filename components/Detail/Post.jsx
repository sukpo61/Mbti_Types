import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  deleteDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";
import { Text, TouchableOpacity, Alert, View } from "react-native";
import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import MbtiColorBtn from "../global/MbtiColorBtn";
import { getDate } from "../../utils";
import { AntDesign } from "@expo/vector-icons";
import { authService } from "../../firebase";
import { dbService } from "../../firebase";

export default function Post({ getPost }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getposts();
  }, []);

  const getposts = () => {
    const q = query(collection(dbService, "communityPosts"));
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

  console.log(posts);

  const getone = getPost;

  const currentUid = authService.currentUser?.email.toString();

  const [likedUserList, setlikedUserList] = useState(getone.likedUserList);

  const LikeRef = doc(dbService, "communityPosts", getone.id);

  const Like_Button = () => {
    if (likedUserList.includes(currentUid)) {
      setlikedUserList(likedUserList.filter((e) => e !== currentUid));
      updateDoc(LikeRef, {
        likedUserList: likedUserList,
      });
    } else {
      let newarray = [...likedUserList, currentUid];
      setlikedUserList(newarray);
      updateDoc(LikeRef, {
        likedUserList: likedUserList,
      });
    }
  };

  const Likecolor = () => {
    if (likedUserList.includes(currentUid)) {
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
          deleteDoc(doc(dbService, "communityPosts", getone.id));
        },
      },
    ]);
  };

  return (
    <>
      <Wrap>
        <PostContainer>
          <TitleMbtiBox>
            <StyledTitle>{getone?.title}</StyledTitle>
            <MbtiColorBtn mbti={getone?.mbti} />
          </TitleMbtiBox>
          <NameDateBox>
            <StyledNickName>{getone?.nickname}</StyledNickName>
            <StyledDate> {getDate(getone?.date)}</StyledDate>
          </NameDateBox>
          <StyledContent>{getone?.content}</StyledContent>
        </PostContainer>
        {/* <TouchableOpacity onPress={deletePost}>
          <StyledDelete>
            <MaterialIcons name="delete" size={24} color="black" />
          </StyledDelete>
        </TouchableOpacity> */}
        <LikeButton onPress={Like_Button}>
          <AntDesign name="heart" size={15} color={Likecolor()} />

          <Text>{likedUserList.length}</Text>
        </LikeButton>
      </Wrap>
    </>
  );
}

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

const Wrap = styled.View`
  padding: 20px;
  align-items: center;
`;

const PostContainer = styled.View`
  width: 95%;
  padding-top: 20px;
`;

const TitleMbtiBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 5px;
`;

const StyledTitle = styled.Text`
  font-weight: 600;
  font-size: 23px;
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
  font-size: 16px;
  margin-right: 5px;
`;

const StyledContent = styled.Text`
  font-size: 19px;
`;
