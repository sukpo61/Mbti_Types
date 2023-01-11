import React, { useEffect, useState } from "react";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../utils";
import {
  // Modal,
  // Text,
  // View,
  // StyleSheet,
  // SafeAreaView,
  // Button,
  // TouchableOpacity,
  ScrollView,
  ScrollY,
} from "react-native";
import { dbService } from "../firebase";
import { AntDesign } from "@expo/vector-icons";

import {
  docs,
  doc,
  query,
  getDocs,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import MBTIFilter from "../components/global/MBTIFilter";
import { getDate } from "../utils";
import MbtiColorBtn from "../components/global/MbtiColorBtn";

export default function Community({
  navigation: { setOptions, navigate, reset },
}) {
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

  const [postlist, setPostlist] = useState([]);
  const [displayed, setDisplayed] = useState(false);
  const [mbti, setMBTI] = useState("");
  const [seeall, setSeeall] = useState(true);

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

  const mbticheck = (post) => {
    if (mbti === "") {
      return true;
    } else {
      return post.mbti === mbti;
    }
  };

  return (
    <View>
      <CommunityBtnWrap>
        <CommunityAddBtn
          onPress={() => {
            navigate("Stack", {
              screen: "CommunityAdd",
            });
          }}
        >
          <AntDesign name="edit" size={20} color="#312070" />
        </CommunityAddBtn>

        <CommunityTopBtn>
          <AntDesign name="up" size={20} color="#312070" />
        </CommunityTopBtn>
      </CommunityBtnWrap>
      <ScrollView>
        <CommunityTitleContainer>
          <CommunityTitle>커뮤니티</CommunityTitle>
          <MBTIfilterBTn
            onPress={() => {
              setDisplayed(!displayed);
            }}
          >
            <Text>MBTIFilter</Text>
          </MBTIfilterBTn>
        </CommunityTitleContainer>

        {postlist.map(
          (post) =>
            mbticheck(post) && (
              <>
                <PostBox>
                  <PostTitleWrap>
                    <PostTitle>{post.title}</PostTitle>
                  </PostTitleWrap>

                  <PostDetailWrap>
                    <PostDetail>{getDate(post.date)}</PostDetail>
                    <MbtiColorBtn mbti={post.mbti}></MbtiColorBtn>
                    <PostDetaillike>
                      <Text>♥+999</Text>
                    </PostDetaillike>
                  </PostDetailWrap>
                </PostBox>
              </>
            )
        )}
      </ScrollView>
      <MBTIFilter
        SetDisplayed={setDisplayed}
        Displayed={displayed}
        SetMBTI={setMBTI}
      ></MBTIFilter>
    </View>
  );
}

const View = styled.View`
  flex: 1;
`;
const CommunityBtnWrap = styled.View`
  position: absolute;
  margin-right: 20px;
  margin-bottom: 20px;
  bottom: 0;
  right: 0;
  z-index: 2;
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
  margin-bottom: 10px;
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
const PostBox = styled.View`
  width: 90%;
  margin-left: 10px;
  margin-bottom: 20px;
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
