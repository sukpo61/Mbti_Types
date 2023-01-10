import React from "react";
import styled from "styled-components/native";
import { Dimensions } from "react-native";

export default function MyPage({ children }) {
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

  return (
    <>
      <Text>닉네임님의 MBTI는</Text>
      <Text>INFP입니다.</Text>

      <MBTI
        onPress={() => {
          setDisplayed(!displayed);
          setMBTI(children);
        }}
      >
        <Text>{children}</Text>
      </MBTI>
      <Modal visible={displayed} animationType={"slide"} transparent={true}>
        <BackBlur>
          <MBTIWrap>
            <MBTIScrollWrap>
              <MBTIContainer>INTJ</MBTIContainer>
              <MBTIContainer>INTP</MBTIContainer>
              <MBTIContainer>ENTJ</MBTIContainer>
              <MBTIContainer>ENTP</MBTIContainer>
              <MBTIContainer>INFJ</MBTIContainer>
              <MBTIContainer>INFP</MBTIContainer>
              <MBTIContainer>ENFJ</MBTIContainer>
              <MBTIContainer>ENFP</MBTIContainer>
              <MBTIContainer>ISTJ</MBTIContainer>
              <MBTIContainer>ISFJ</MBTIContainer>
              <MBTIContainer>ESTJ</MBTIContainer>
              <MBTIContainer>ESFJ</MBTIContainer>
              <MBTIContainer>ISTP</MBTIContainer>
              <MBTIContainer>ISFP</MBTIContainer>
              <MBTIContainer>ESTP</MBTIContainer>
              <MBTIContainer>ESFP</MBTIContainer>
            </MBTIScrollWrap>
          </MBTIWrap>
        </BackBlur>
      </Modal>
    </>
  );
}
const Text = styled.Text`
  font-size: 12px;
`;
const TitleWrap = styled.View`
  height: 112px;
  width: ${SCREEN_WIDTH + "px"};
  padding: 40px 32px;
  background-color: #efe8fa;
  margin-bottom: 48px;
`;
const MBTIScrollWrap = styled.ScrollView`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #efe8fa;
  margin-top: 32px;
`;

const BackBlur = styled.View`
  width: 100%;
  height: ${SCREEN_HEIGHT + "px"};
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
  z-index: 2;
`;

const MBTIWrap = styled.View`
  height: ${SCREEN_HEIGHT / 2.0 + "px"};
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: #efe8fa;
  padding: 0 32px 0 32px;
  position: absolute;
  bottom: 0;
  border-radius: 28px 28px 0px 0px;
`;
