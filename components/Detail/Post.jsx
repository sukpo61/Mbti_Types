import React, { useEffect, useState } from "react";
import {
  onSnapshot,
  query,
  collection,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { dbService } from "../../firebase";
import { Text, TouchableOpacity, Alert, View } from "react-native";
import styled from "@emotion/native";
import { MaterialIcons } from "@expo/vector-icons";
import MbtiColorBtn from "../global/MbtiColorBtn";
import { getDate } from "../../utils";
import DetailMbtiColorBtn from "../global/DetailMbtiColorBtn";

export default function Post ({getPost}) {

  return (
    <>
      <Wrap>
        <PostContainer>
          <TitleMbtiBox>
            <StyledTitle>{getPost?.title}</StyledTitle>
            <MbtiColorBtn mbti={getPost?.mbti} />
          </TitleMbtiBox>
          <NameDateBox>
            <StyledNickName>{getPost?.nickname}</StyledNickName>
            <StyledDate> {getDate(getPost?.date)}</StyledDate>
          </NameDateBox>
          <StyledContent>{getPost?.content}</StyledContent>
        </PostContainer>
      </Wrap>
    </>
  );
}

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
  font-size: 18px;
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
  font-size: 17px;
`;
