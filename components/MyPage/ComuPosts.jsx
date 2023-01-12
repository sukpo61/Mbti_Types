import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import { ScrollY } from "react-native";
import { dbService } from "../../firebase";
import {
  docs,
  doc,
  query,
  getDocs,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { getDate } from "../../utils";
import { authService } from "../../firebase";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { AntDesign } from "@expo/vector-icons";
import MbtiColorBtn from "../global/MbtiColorBtn";

export default function ComuPosts({ children }) {
  const { navigate } = useNavigation();
  const [postlist, setPostlist] = useState([]);

  useEffect(() => {
    console.log("ScrollY is ", ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [ScrollY]);

  useEffect(() => {
    getPostlist();
  }, []);

  const getPostlist = () => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("date", "desc") // 해당 collection 내의 docs들을 createdAt 속성을 내림차순 기준으로
    );

    const array = [];
    onSnapshot(q, (snapshot) => {
      // q (쿼리)안에 담긴 collection 내의 변화가 생길 때 마다 매번 실행됨
      snapshot.docs.map((doc) =>
        array.push({
          id: doc.id,
          ...doc.data(), // doc.data() : { text, createdAt, ...  }
        })
      );
      setPostlist(array);
    });
  };

  console.log(postlist)
  return (
    <ScrollView>
      <Wrap>
        {postlist.map(
          (post, index) =>
            authService.currentUser.email === post.userId && (
              <View key={index}>
                <PostBox
                  onPress={() =>
                    navigate("Stack", {
                      screen: post.community === "community" ? "CommunityDetail" : "QnADetail",
                      params: { getPost: post },
                    })
                  }
                >
                  <PostTitleWrap>
                    <PostTitle numberOfLines={1} ellipsizeMode="tail">
                      {post.title}
                    </PostTitle>
                  </PostTitleWrap>

                  <PostDetailWrap>
                    <PostdDetaillname>{post.nickname}</PostdDetaillname>
                    <PostDetail>{getDate(post.date)}</PostDetail>
                    <PostDetaillike>
                      <LikeButton>
                        <AntDesign name="heart" size={15} color="tomato" />

                        <Text>{post.likedUserList?.length}</Text>
                      </LikeButton>
                    </PostDetaillike>
                  </PostDetailWrap>
                  <MbtiColorBtn mbti={post.mbti}></MbtiColorBtn>
                </PostBox>
              </View>
            )
        )}
      </Wrap>
    </ScrollView>
  );
}
const Wrap = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScrollView = styled.ScrollView`
  width: 100%;
`;

const Text = styled.Text`
  margin-left: 5px;
`;

const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  padding: 0 5px;
  align-items: center;
  margin-bottom: 5px;
`;

const PostDetail = styled.Text`
  font-size: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
  color: #3b3b3b;
`;

const PostdDetaillname = styled.Text`
  margin-right: 10px;
  line-height: 17px;
  color: #3b3b3b;
`;
const PostDetaillike = styled.View`
  position: absolute;
  right: 8px;
  bottom: 0.5px;
`;

const View = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const PostBox = styled.TouchableOpacity`
  width: 90%;
  margin-top: 16px;
  padding-bottom: 10px;
  border-bottom-color: #c8c8c8;
  border-bottom-width: 0.2px;
`;
const PostTitleWrap = styled.View``;
const PostTitle = styled.Text`
  width: 85%;
  margin-bottom: 10px;
  font-size: 15px;
`;

const PostDetailWrap = styled.View`
  flex-direction: row;
`;
