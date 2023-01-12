import CommentsList from "../components/Detail/CommentsList";
import Post from "../components/Detail/Post";
import CommentAddInput from "../components/Detail/CommnetAddInput";
import styled from "@emotion/native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { authService } from "../firebase";
import { MaterialIcons } from "@expo/vector-icons";

export default function CommunityDetail({
  navigation: { setOptions, reset },
  route: {
    params: { getPost, setState },
  },
}) {
  useFocusEffect(
    // 비로그인 상태에서 마이페이지 접근 시 로그인화면으로 이동하고, 뒤로가기 시 무비탭
    useCallback(() => {
      setOptions({
        headerRight: () => {
          return (
            <>
              <TouchableOpacity>
                <MaterialIcons name="delete" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons name="edit" size={24} color="black" />
              </TouchableOpacity>
            </>
          );
        },
      });
    }, [])
  );
  return (
    <>
      <ScrollView>
        <Post getPost={getPost} setState={setState} />
        <CommentsList getPostId={getPost.id} />
      </ScrollView>
      <CommentAddInput getPostId={getPost.id} />
    </>
  );
}

const TouchableOpacity = styled.TouchableOpacity``;
const Text = styled.Text``;
const ScrollView = styled.ScrollView`
  background-color: white;
`;
