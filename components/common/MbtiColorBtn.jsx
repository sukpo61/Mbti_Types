import styled from "@emotion/native";
import { useState } from "react";

// props로 mbti 데이터를 넘겨받아야 함.
export default function MbtiColorBtn({ mbti }) {
  let mbtiColor = "";
  if (
    mbti === "ISTP" ||
    mbti === "ISFP" ||
    mbti === "ESTP" ||
    mbti === "ESFP"
  ) {
    mbtiColor = "#f0b83f";
  }
  if (
    mbti === "ISTJ" ||
    mbti === "ISFJ" ||
    mbti === "ESTJ" ||
    mbti === "ESFJ"
  ) {
    mbtiColor = "#4298B4";
  }
  if (
    mbti === "INFJ" ||
    mbti === "INFP" ||
    mbti === "ENFJ" ||
    mbti === "ENFP"
  ) {
    mbtiColor = "#33A474";
  }
  if (
    mbti === "INTJ" ||
    mbti === "INTP" ||
    mbti === "ENTJ" ||
    mbti === "ENTP"
  ) {
    mbtiColor = "#88619A";
  }

  // const [mbtiColor, setMbtiColor] = useState("")
  // if (mbti === "ISTP" || mbti === "ISFP" || mbti === "ESTP" || mbti === "ESFP") { setMbtiColor("#f0b83f") }
  // if (mbti === "ISTJ" || mbti === "ISFJ" || mbti === "ESTJ" || mbti === "ESFJ") { setMbtiColor("#4298B4") }
  // if (mbti === "INFJ" || mbti === "INFP" || mbti === "ENFJ" || mbti === "ENFP") { setMbtiColor("#33A474") }
  // if (mbti === "INTJ" || mbti === "INTP" || mbti === "ENTJ" || mbti === "ENTP") { setMbtiColor("#88619A") }

  return (
    <MbtiBtn mbtiColor={mbtiColor}>
      <Mbti>{mbti}</Mbti>
    </MbtiBtn>
  );
}

const MbtiBtn = styled.View`
  height: 23px;
  width: 65px;
  background-color: ${(props) => props.mbtiColor};
  border-radius: 20px;
  margin-right: 5px;
`;

const Mbti = styled.Text`
  color: white;
  text-align: center;
  font-size: 15px;
  font-weight: bold;
  padding-left: 4px;
`;
