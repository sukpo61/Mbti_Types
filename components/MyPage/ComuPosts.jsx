import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import {
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  TouchableOpacity,
  ScrollView,
  ScrollY,
} from "react-native";
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

export default function ComuPosts({ children }) {
  const Text = styled.Text``;
  const MBTI = styled.TouchableOpacity`
    height: 32px;
    display: flex;
    flex-direction: row;
    width: 100%;
    align-items: center;
    ${Text} {
      font-size: 14px;
      color: #584164;
    }
  `;
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
      collection(dbService, "communityPosts"),
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

  return (
    <ScrollView>
      {postlist.map(
        (post) =>
          authService.currentUser.email === post.userId && (
            <View key={post.id}>
              <PostBox
                onPress={() =>
                  navigate("Stack", {
                    screen: "CommunityDetail",
                    params: { getPost: post },
                  })
                }
              >
                <PostTitleWrap>
                  <PostTitle>{post.title}</PostTitle>
                </PostTitleWrap>

                <PostDetailWrap>
                  <PostDetail>{getDate(post.date)}</PostDetail>
                  <PostDetail>{post.mbti}</PostDetail>
                  <PostDetaillike>
                    <Text>♥+999</Text>
                  </PostDetaillike>
                </PostDetailWrap>
              </PostBox>
            </View>
          )
      )}
    </ScrollView>
  );
}
const View = styled.View``;

const CommunityBtnWrap = styled.View`
  position: absolute;
  margin-right: 20px;
  margin-bottom: 20px;
  bottom: 0;
  right: 0;
`;
const CommunityTopBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #efe8fa;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const CommunityAddBtn = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  background-color: #efe8fa;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const CommunityTitleContainer = styled.View`
  margin-bottom: 30px;
  font-weight: bold;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MBTIfilterBTn = styled.TouchableOpacity`
  margin-right: 10px;
`;

const CommunityTitle = styled.Text`
  margin-top: 10px;
  margin-left: 10px;
  font-size: 20px;
`;
const PostBox = styled.TouchableOpacity`
  width: 90%;
  margin-left: 10px;
  margin-top: 20px;
  border-bottom-color: #c8c8c8;
  border-bottom-width: 0.2px;
`;
const PostTitleWrap = styled.View``;
const PostTitle = styled.Text`
  margin-bottom: 10px;
  font-size: 15px;
`;

const PostDetailWrap = styled.View`
  flex-direction: row;
`;

const PostDetail = styled.Text`
  font-size: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const PostDetaillike = styled.View``;
