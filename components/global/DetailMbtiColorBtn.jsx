import styled from "@emotion/native";

// props로 mbti 데이터를 넘겨받아야 함.
export default function DetailMbtiColorBtn({ mbti }) {
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
  height: 17px;
  width: 40px;
  background-color: ${(props) => props.mbtiColor};
  border-radius: 20px;
  margin-right: 5px;
  justify-content: center;
  align-items: center;
`;

const Mbti = styled.Text`
  color: white;
  line-height: 17px;
  font-size: 10px;
  font-weight: bold;
  padding-left: 2px;
`;
