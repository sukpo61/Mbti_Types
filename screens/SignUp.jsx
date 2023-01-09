import { useState, useEffect, useRef } from "react";
import styled from "@emotion/native";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { emailRegex, pwRegex, SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils";
import { useColorScheme, Modal } from "react-native";

const View = styled.View`
  height: ${SCREEN_HEIGHT + "px"};
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: white;
  padding: 0 32px 96px 32px;
`;

const Text = styled.Text``;

const LoginButton = styled.TouchableOpacity`
  width: 96px;
  border: 1px solid #584164;
  border-radius: 48px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`;
const RegisterButton = styled.TouchableOpacity`
  width: 96px;
  border: none;
  border-radius: 48px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  background-color: #e7dfea;
`;

const ButtonsWrap = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-top: auto;
`;

const LoginText = styled.Text`
  color: #584164;
  font-size: 14px;
`;

const MBTIText = styled.Text`
  color: #584164;
  font-size: 14px;
`;
const RegisterText = styled(LoginText)``;

const EmailInput = styled.TextInput`
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 0.5px solid #c7c7c7;
  background-color: white;
  color: black;
`;
const PwInput = styled(EmailInput)``;

const NickInput = styled(EmailInput)``;

const MBTIInput = styled.TouchableOpacity`
  width: 100%;
  padding: 15px 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 0.5px solid #c7c7c7;
  background-color: white;
  color: black;
`;

const TitleWrap = styled.View`
  height: 112px;
  width: ${SCREEN_WIDTH + "px"};
  padding: 40px 32px;
  background-color: #efe8fa;
  margin-bottom: 48px;
`;

const TitleText = styled.Text`
  font-size: 24px;
  line-height: 33px;
  color: #584164;
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
  top: -80px;
  left: 0;
  z-index: 2;
`;

export default function SignUp({
  navigation: { goBack, setOptions, navigate, reset },
}) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const NickRef = useRef(null);
  const MBTIRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [nick, setNick] = useState("");
  const [mbti, setMBTI] = useState("select your MBTI");
  const [displayed, setDisplayed] = useState(false);
  const isDark = useColorScheme() === "dark";

  const auth = getAuth();

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
          setDisplayed(!displayed);
          setMBTI(children);
        }}
      >
        <Text>{children}</Text>
      </MBTI>
    );
  }

  const validateInputs = () => {
    if (!email) {
      alert("email을 입력해주세요.");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      alert("password를 입력해주세요.");
      pwRef.current.focus();
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = pw.match(pwRegex);

    if (matchedEmail === null) {
      alert("이메일 형식에 맞게 입력해 주세요.");
      emailRef.current.focus();
      return true;
    }
    if (matchedPw === null) {
      alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
      pwRef.current.focus();
      return true;
    }

    if (nick === "") {
      alert("닉네임을 입력해 주세요.");
      return true;
    }

    if (mbti === "") {
      alert("닉네임을 입력해 주세요.");
      return true;
    }
  };

  const handleRegister = () => {
    // 유효성 검사
    if (validateInputs()) {
      return;
    }

    // 회원가입 요청
    createUserWithEmailAndPassword(authService, email, pw)
      .then(() => {
        console.log("2");
        updateProfile(authService.currentUser, {
          displayName: nick,
          photoURL: mbti,
        })
          .then(() => {
            console.log(authService.currentUser.displayName);
            console.log(authService.currentUser.photoURL);
            setEmail("");
            setPw("");
            setNick("");
            reset({
              index: 0,
              routes: [
                {
                  name: "Tabs",
                  params: {
                    screen: "커뮤니티",
                  },
                },
              ],
            });
          })
          .catch((error) => {});
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("already-in-use")) {
          alert("이미 사용중인 아이디입니다.");
        }
      });
  };

  useEffect(() => {
    setOptions({ headerRight: () => null });
  }, []);

  return (
    <>
      <View>
        <TitleWrap>
          <TitleText>Sign up</TitleText>
        </TitleWrap>
        <EmailInput
          ref={emailRef}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={isDark ? "#547ea7" : "#d2dae2"}
          textContentType="emailAddress"
          placeholder="Enter your email id"
        />
        <PwInput
          ref={pwRef}
          value={pw}
          onChangeText={(text) => setPw(text)}
          placeholderTextColor={isDark ? "#547ea7" : "#d2dae2"}
          textContentType="password"
          returnKeyType="send"
          secureTextEntry={true}
          placeholder="Enter your password"
        />
        <NickInput
          ref={NickRef}
          value={nick}
          onChangeText={(text) => setNick(text)}
          placeholderTextColor={isDark ? "#547ea7" : "#d2dae2"}
          textContentType="text"
          returnKeyType="send"
          placeholder="Enter your Nickname"
        />
        <MBTIInput
          ref={MBTIRef}
          // value={pw}
          onPress={() => setDisplayed(!displayed)}
          placeholderTextColor={isDark ? "#547ea7" : "#d2dae2"}
        >
          <MBTIText>{mbti}</MBTIText>
        </MBTIInput>

        <ButtonsWrap>
          <LoginButton
            onPress={() => {
              navigate("Login");
            }}
          >
            <LoginText>Login</LoginText>
          </LoginButton>
          <RegisterButton onPress={handleRegister}>
            <RegisterText>Submmit</RegisterText>
          </RegisterButton>
        </ButtonsWrap>
      </View>
      {displayed && (
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
      )}
    </>
  );
}
