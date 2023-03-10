import { useState, useEffect, useRef } from "react";
import styled from "@emotion/native";
import { authService } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { emailRegex, pwRegex, SCREEN_WIDTH, SCREEN_HEIGHT } from "../utils";
import { useColorScheme } from "react-native";

const View = styled.View`
  height: ${SCREEN_HEIGHT + "px"};
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  background-color: white;
  padding: 0 32px 96px 32px;
`;

const Text = styled.Text`
  color: ${(props) => props.theme.color.title};
`;

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
const RegisterText = styled(LoginText)``;

const EmailInput = styled.TextInput`
  background-color: grey;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 0.5px solid #c7c7c7;
  background-color: white;
  color: black;
`;
const PwInput = styled(EmailInput)``;

const TitleWrap = styled.View`
  height: 112px;
  width: ${SCREEN_WIDTH + "px"};
  padding: 40px 32px;
  background-color: #efe8fa;
  margin-bottom: 48px;
`;

const TitleText = styled.Text`
  font-size: 24px;

  color: #584164;
`;

export default function Login({
  navigation: { goBack, setOptions, navigate },
}) {
  const emailRef = useRef(null);
  const pwRef = useRef(null);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const isDark = useColorScheme() === "dark";

  const validateInputs = () => {
    if (!email) {
      alert("email??? ??????????????????.");
      emailRef.current.focus();
      return true;
    }
    if (!pw) {
      alert("password??? ??????????????????.");
      pwRef.current.focus();
      return true;
    }
    const matchedEmail = email.match(emailRegex);
    const matchedPw = pw.match(pwRegex);

    if (matchedEmail === null) {
      alert("????????? ????????? ?????? ????????? ?????????.");
      emailRef.current.focus();
      return true;
    }
    if (matchedPw === null) {
      alert("??????????????? 8?????? ?????? ?????????, ??????, ???????????? ??????????????? ?????????.");
      pwRef.current.focus();
      return true;
    }
  };
  const handleLogin = () => {
    // ????????? ??????
    if (validateInputs()) {
      return;
    }
    // ????????? ??????
    signInWithEmailAndPassword(authService, email, pw)
      .then(() => {
        setEmail("");
        setPw("");
        goBack();
        // ????????? ?????? ?????? ???????????? ????????????
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("user-not-found")) {
          alert("????????? ????????????. ??????????????? ?????? ????????? ?????????.");
        }
        if (err.message.includes("wrong-password")) {
          alert("??????????????? ???????????????.");
        }
      });
  };

  const handleRegister = () => {
    // ????????? ??????
    if (validateInputs()) {
      return;
    }

    // ???????????? ??????
    createUserWithEmailAndPassword(authService, email, pw)
      .then(() => {
        setEmail("");
        setPw("");
        goBack();
      })
      .catch((err) => {
        console.log("err.message:", err.message);
        if (err.message.includes("already-in-use")) {
          alert("?????? ???????????? ??????????????????.");
        }
      });
  };

  useEffect(() => {
    setOptions({ headerRight: () => null });
  }, []);

  return (
    <View>
      <TitleWrap>
        <TitleText>Login</TitleText>
      </TitleWrap>
      <EmailInput
        ref={emailRef}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholderTextColor={isDark ? "#547ea7" : "#d2dae2"}
        textContentType="emailAddress"
        placeholder="Enter your email id"
        onSubmitEditing={() => {
          pwRef.current.focus();
        }}
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
        onSubmitEditing={handleLogin}
      />
      <ButtonsWrap>
        <LoginButton
          onPress={() => {
            navigate("SignUp");
          }}
        >
          <LoginText>Sign up</LoginText>
        </LoginButton>
        <RegisterButton onPress={handleLogin}>
          <RegisterText>Submit</RegisterText>
        </RegisterButton>
      </ButtonsWrap>
    </View>
  );
}
