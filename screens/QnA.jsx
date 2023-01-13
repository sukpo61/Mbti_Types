import { useCallback, useEffect, useState, useRef } from "react";
import styled from "@emotion/native";
import {
  ActivityIndicator,
  RefreshControl,
  ScrollY,
  Text,
  FlatList,
  TouchableOpacity
} from "react-native";
import { dbService } from "../firebase";
import { AntDesign } from "@expo/vector-icons";
import { authService } from "../firebase";
import { signOut } from "firebase/auth";
import {
  query,
  getDocs,
  collection,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import MBTIFilter from "../components/global/MBTIFilter";
import { getDate } from "../utils";
import MbtiColorBtn from "../components/global/MbtiColorBtn";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
// import { FlatList } from "react-native-gesture-handler";

export default function QnA({ navigation: { setOptions, reset } }) {
  const Text = styled.Text`
    margin-left: 5px;
  `;

  const { navigate } = useNavigation();
  const [postlist, setPostlist] = useState([]);
  const [displayed, setDisplayed] = useState(false);
  const [mbti, setMBTI] = useState("");

  const getPostlist = () => {
    const q = query(
      collection(dbService, "posts"),
      orderBy("date", "desc"),
      where("category", "==", "qna")
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

  const scrollRef = useRef();
  const scrolltoTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
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
        screen: "QnAAdd",
      });
    }
  };

  const logout = () => {
    signOut(authService)
      .then(() => {
        console.log("로그아웃 성공");
        reset({
          index: 0,
          routes: [
            {
              name: "Tabs",
              params: {
                screen: "커뮤니티",
              },
            },
          ],
        });
      })
      .catch((err) => alert(err));
  };

  const Login = () => {
    navigate("Stack", {
      screen: "Login",
    });
  };

  //CommuityHeader
  useFocusEffect(
    // 비로그인 상태에서 마이페이지 접근 시 로그인화면으로 이동하고, 뒤로가기 시 무비탭
    useCallback(() => {
      getPostlist();
      setOptions({
        headerRight: () => {
          return (
            <TouchableOpacity style={{ marginRight: 10 }} onPress={!authService.currentUser ? Login : logout}>
              <LogoutText style={{ color: "#312070" }}>{!authService.currentUser ? "로그인" : "로그아웃"}</LogoutText>
            </TouchableOpacity>
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
            (post, index) =>
              mbticheck(post) && (
                <View key={index}>
                  <PostBox
                    onPress={() =>
                      navigate("Stack", {
                        screen: "QnADetail",
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

const LogoutText = styled.Text``;
const LikeButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-around;
  padding: 0 5px;
  align-items: center;
  margin-bottom: 5px;
`;

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
  line-height: 17px;
  color: #3b3b3b;
`;
const View = styled.View`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
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

const MBTIfilterBTn = styled.TouchableOpacity`
  margin-right: 10px;
  position: absolute;
  right: 20px;
`;

const PostBox = styled.TouchableOpacity`
  width: 90%;
  margin-top: 16px;
  padding-bottom: 10px;
  border-bottom-color: #c8c8c8;
  border-bottom-width: 0.3px;
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

const PostDetail = styled.Text`
  font-size: 12px;
  margin-right: 5px;
  margin-bottom: 5px;
  color: #3b3b3b;
`;

const PostDetaillike = styled.View`
  position: absolute;
  right: 8px;
  bottom: 0.5px;
`;
