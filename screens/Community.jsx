import React, { useCallback, useEffect, useState } from "react";
import styled from "@emotion/native";
import {
  ActivityIndicator, 
  RefreshControl,
  ScrollView,
  ScrollY,
  Text
} from "react-native";
import { dbService } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { authService } from "../firebase";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import MBTIFilter from "../components/global/MBTIFilter";
import { getDate } from "../utils";
import MbtiColorBtn from "../components/global/MbtiColorBtn";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

export default function Community({ navigation: { setOptions, reset } }) {

  const { navigate } = useNavigation();
  const [postlist, setPostlist] = useState([]);
  const [displayed, setDisplayed] = useState(false);
  const [mbti, setMBTI] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const user = authService.currentUser;

  useEffect(() => {
    console.log("ScrollY is ", ScrollY); // ScrollY가 변화할때마다 값을 콘솔에 출력
  }, [ScrollY]);

  useEffect(() => {
    // getPostlist();
    console.log("useEffect")
  }, []);

  useFocusEffect(useCallback(() => {
    console.log("useFocusEffect")
    getPostlist()
  }, []))

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

  // 새로고침하기.
  // const onRefresh = async () => {
  //   setIsRefreshing(true);
  //   await getPostlist();
  //   setIsRefreshing(false);
  // };

  if (isRefreshing) {
    return (
      <Loader>
        <ActivityIndicator size="large" />
      </Loader>
    )
  }

  // mbti 카테고리 필터링
  const mbticheck = (post) => {
    if (mbti === "") {
      return true;
    } else {
      return post.mbti === mbti;
    }
  };

  // 헤더에 글 작성 아이콘 클릭 시 로그인 여부에 따라 페이지 이동.
  const handleAddBtn = () => {
    if (!user) {
      navigate("Stack", {
        screen: "Login",
      });
    } else {
      navigate("Stack", {
        screen: "CommunityAdd",
      });
    }
  };

  return (
    <Wrap
    // refreshControl={
    //   <RefreshControl 
    //     refreshing={isRefreshing} 
    //     onRefresh={onRefresh}
    //   />}  
      >
      <CommunityBtnWrap>
        <CommunityAddBtn onPress={handleAddBtn}>
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
                    <MbtiColorBtn mbti={post.mbti}></MbtiColorBtn>
                    <PostDetaillike>
                      <Text>♥+999</Text>
                    </PostDetaillike>
                  </PostDetailWrap>
                </PostBox>
              </View>
            )
        )}
      </ScrollView>
      <MBTIFilter
        SetDisplayed={setDisplayed}
        Displayed={displayed}
        SetMBTI={setMBTI}
      ></MBTIFilter>
    </Wrap>
  );
}

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const Wrap = styled.View`
  flex: 1;
`;
const View = styled.View``;
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
const PostBox = styled.TouchableOpacity`
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
