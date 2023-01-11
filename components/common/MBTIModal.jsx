import React from "react";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../../utils";
import { Modal } from "react-native";

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
const MBTIScrollWrap = styled.ScrollView`
  height: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: #efe8fa;
`;
const Gesture = styled.View`
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 100%;
`;
const Swipebar = styled.View`
  width: 32px;
  height: 4px;
  background: #79747e;
  border-radius: 2px;
`;
export default function MBTIModal({ SetDisplayed, Displayed, SetMBTI }) {
  function MBTIContainer({ children }) {
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
      <MBTI
        onPress={() => {
          SetDisplayed(!Displayed);
          if (children === "전체 선택") {
            SetMBTI("");
          } else {
            SetMBTI(children);
          }
        }}
      >
        <Text>{children}</Text>
      </MBTI>
    );
  }
  return (
    <Modal visible={Displayed} animationType={"slide"} transparent={true}>
      <BackBlur>
        <MBTIWrap>
          <Gesture>
            <Swipebar></Swipebar>
          </Gesture>
          <MBTIScrollWrap>
            <MBTIContainer>전체 선택</MBTIContainer>
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
  );
}
