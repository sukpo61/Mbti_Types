import React from "react";
import styled from "styled-components/native";
import { SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function Community() {
  return (
    <SafeAreaView>
      <CommunityTitleContainer>
        <CommunityTitle>상황문답</CommunityTitle>
      </CommunityTitleContainer>

      <PostBox>
        <PostTitleWrap>
          <PostTitle>상황문답 페이지 타이틀</PostTitle>
        </PostTitleWrap>

        <PostDetailWrap>
          <PostDetail>닉네임</PostDetail>
          <PostDetail>23.01.01</PostDetail>
        </PostDetailWrap>
      </PostBox>
    </SafeAreaView>
  );
}

const CommunityTitleContainer = styled.View`
  margin-bottom: 30px;
  font-weight: bold;
`;

const CommunityTitle = styled.Text`
  font-size: 20px;
`;
const PostBox = styled.View`
  margin-left: 10px;
  margin-bottom: 20px;
  border-bottom-color: gray;
  border-bottom-width: 1px;
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
