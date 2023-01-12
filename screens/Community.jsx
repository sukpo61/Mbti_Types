import React, { useCallback, useEffect, useState, useRef } from "react";
import styled from "@emotion/native";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollY,
  Text,
  FlatList,
} from "react-native";
import { dbService } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { authService } from "../firebase";

import {
  query,
  getDocs,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import MBTIFilter from "../components/global/MBTIFilter";
import { getDate } from "../utils";
import MbtiColorBtn from "../components/global/MbtiColorBtn";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { FlatList } from "react-native-gesture-handler";

export default function Community({ navigation: { setOptions, reset } }) {
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
  const [displayed, setDisplayed] = useState(false);
  const [mbti, setMBTI] = useState("");
  const [seeall, setSeeall] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [maxVisibleIndex, setMaxVisibleIndex] = useState(0); // highest visible index currently visible.
  const [minVisibleIndex, setMinVisibleIndex] = useState(0); // lowest visible index currently visible.

  // Scroll Top Btn

  const scrollRef = useRef();
  const scrolltoTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  // 본문 데이터 불러오기.
  const getPostlist = () => {
    const q = query(
      collection(dbService, "communityPosts"),
      orderBy("date", "desc")
    );

    const array = [];
    onSnapshot(q, (snapshot) => {
      snapshot.docs.map((doc) =>
        array.push({
          id: doc.id,
          ...doc.data(),
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

  const handleAddBtn = () => {
    if (!authService.currentUser) {
      navigate("Stack", {
        screen: "Login",
      });
    } else {
      navigate("Stack", {
        screen: "CommunityAdd",
      });
    }
  };
  //CommuityHeader
  useFocusEffect(
    // 비로그인 상태에서 마이페이지 접근 시 로그인화면으로 이동하고, 뒤로가기 시 무비탭
    useCallback(() => {
      getPostlist();

      setOptions({
        headerRight: () => {
          return (
            <>
              <MBTIfilterBTn
                onPress={() => {
                  setDisplayed(!displayed);
                }}
              >
                <AntDesign name="bars" size={25} color="#312070" />
              </MBTIfilterBTn>
            </>
          );
        },
      });
    }, [])
  );
  return (
    <View>
      <CommunityBtnWrap>
        <CommunityAddBtn onPress={handleAddBtn}>
          <AntDesign name="edit" size={20} color="#312070" />
        </CommunityAddBtn>
        <CommunityTopBtn onPress={scrolltoTop}>
          <AntDesign name="up" size={20} color="#312070" />
        </CommunityTopBtn>
      </CommunityBtnWrap>

      <ScrollView ref={scrollRef}>
        <Wrap>
          {postlist.map(
            (post) =>
              mbticheck(post) && (
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
                      <PostTitle numberOfLines={1} ellipsizeMode="tail">
                        {post.title}
                      </PostTitle>
                    </PostTitleWrap>

                    <PostDetailWrap>
                      <PostdDetaillname>{post.nickname}</PostdDetaillname>
                      <PostDetail>{getDate(post.date)}</PostDetail>
                      <PostDetaillike>
                        <Text>♥+999</Text>
                      </PostDetaillike>
                    </PostDetailWrap>
                    <MbtiColorBtn mbti={post.mbti}></MbtiColorBtn>
                  </PostBox>
                </View>
              )
          )}
        </Wrap>
      </ScrollView>

      <MBTIFilter
        SetDisplayed={setDisplayed}
        Displayed={displayed}
        SetMBTI={setMBTI}
      ></MBTIFilter>
    </View>
  );
}

const ScrollView = styled.ScrollView`
  width: 100%;
`;
const Wrap = styled.View`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PostdDetaillname = styled.Text`
  margin-right: 10px;
`;
const View = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
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

const MBTIfilterBTn = styled.TouchableOpacity`
  margin-right: 10px;
  position: absolute;
  right: 20px;
`;

const PostBox = styled.TouchableOpacity`
  width: 90%;
  margin-top: 20px;
  border-bottom-color: #c8c8c8;
  border-bottom-width: 0.3px;
`;
const PostTitleWrap = styled.View``;
const PostTitle = styled.Text`
  width: 85%;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: bold;
`;

const PostDetailWrap = styled.View`
  flex-direction: row;
`;

const PostDetail = styled.Text`
  font-size: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
`;

const PostDetaillike = styled.View`
  position: absolute;
  right: 8px;
`;
