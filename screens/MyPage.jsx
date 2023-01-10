import React from "react";
import styled from "styled-components/native";

export default function MyPage() {
  return (
    <>
      <MyPageTitleWrap>
        <Text>닉네임님의 MBTI는</Text>
        <Text>INFP입니다.</Text>
      </MyPageTitleWrap>
      <LogoutBox>
        <Text>로그아웃</Text>
      </LogoutBox>
    </>
  );
}

const MyPageTitleWrap = styled.View`
  background-color: #efe8fa;
  height: 112px;
  padding: 40px 32px;
  justify-content: center;
`;

const Text = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

const LogoutBox = styled.View``;
