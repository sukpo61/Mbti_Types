import React from "react";
import styled from "@emotion/native";
import { SCREEN_HEIGHT } from "../../utils";
import { Modal } from "react-native";
<<<<<<< HEAD:components/Common/MBTIModal.jsx

=======
>>>>>>> 279139bcfc708045b634c5c4327b9de074fe4dd8:components/Common/AuthModal.jsx
const BackBlur = styled.TouchableOpacity`
  width: 100%;
  height: ${SCREEN_HEIGHT + "px"};
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  left: 0;
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
  z-index: 2;
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
<<<<<<< HEAD:components/Common/MBTIModal.jsx

export default function MBTIModal({ SetDisplayed, Displayed, SetMBTI }) {
=======
export default function AuthModal({ SetDisplayed, Displayed, SetMBTI }) {
>>>>>>> 279139bcfc708045b634c5c4327b9de074fe4dd8:components/Common/AuthModal.jsx
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
          SetMBTI(children);
        }}
      >
        <Text>{children}</Text>
      </MBTI>
    );
  }

  return (
<<<<<<< HEAD:components/Common/MBTIModal.jsx
    <Modal
      visible={Displayed}
      animationType={"slide"}
      transparent={true}
      onRequestClose={() => {
        SetDisplayed(false);
      }}
    >
      <MBTIWrap>
        <Gesture>
          <Swipebar></Swipebar>
        </Gesture>
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
      <BackBlur
        onPress={() => {
          SetDisplayed(!Displayed);
        }}
      ></BackBlur>
=======
    <Modal visible={Displayed} animationType={"slide"} transparent={true}>
      <BackBlur
        onPress={() => {
          SetDisplayed(false);
        }}
      >
        <MBTIWrap>
          <Gesture>
            <Swipebar></Swipebar>
          </Gesture>
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
>>>>>>> 279139bcfc708045b634c5c4327b9de074fe4dd8:components/Common/AuthModal.jsx
    </Modal>
  );
}
