import styled from "@emotion/native";

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

  return (
    <MbtiBtn mbtiColor={mbtiColor}>
      <Mbti>{mbti}</Mbti>
    </MbtiBtn>
  );
}

const MbtiBtn = styled.View`
  height: 18px;
  width: 50px;
  background-color: ${(props) => props.mbtiColor};
  border-radius: 20px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
`;

const Mbti = styled.Text`
  color: white;
  line-height: 15px;
  font-size: 12px;
  font-weight: bold;
  padding-left: 2px;
`;
