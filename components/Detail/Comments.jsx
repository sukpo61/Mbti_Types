import styled from "@emotion/native";
import { Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 
import { useState } from "react";

export default function Comments () {

    const [toggle, setToggle] = useState(false);

    return (
      <>
        <Wrap contentContainerStyle={{alignItems: "center"}}>
          <Text>본문 들어가는 자리</Text>
          <Line />
          <CommentsContainer>
              <CommentsCount>댓글 3</CommentsCount>
              <CommentBox>
              <NameDateMbtiBox>
                  <MbtiBtn><Mbti>ISFP</Mbti></MbtiBtn>
                  <Name>닉네임</Name>
                  <Date>23/01/04</Date>
                  <ToggleBtn onPress={() => setToggle(!toggle)}>
                      <MaterialCommunityIcons name="dots-vertical" size={22} color="gray" />
                  </ToggleBtn>
                  {toggle &&
                      <ToggleBox>
                          <TouchableOpacity>
                              <ToggleText>수정</ToggleText>
                          </TouchableOpacity>
                          <TouchableOpacity>
                              <ToggleText>삭제</ToggleText>
                          </TouchableOpacity>
                      </ToggleBox>
                  }
                  
              </NameDateMbtiBox>
              <Comment>댓글 내용입니다. 좀 길게 적으면 어떻게 될까요????? 더더더더더더더ㅓ더더더더ㅓㄷ</Comment>
              </CommentBox>
              <CommentBox>
              <NameDateMbtiBox>
                  <MbtiBtn><Mbti>ISFP</Mbti></MbtiBtn>
                  <Name>닉네임</Name>
                  <Date>23/01/04</Date>
                  <ToggleBtn onPress={() => setToggle(!toggle)}>
                      <MaterialCommunityIcons name="dots-vertical" size={22} color="gray" />
                  </ToggleBtn>
                  {toggle &&
                      <ToggleBox>
                          <TouchableOpacity>
                              <ToggleText>수정</ToggleText>
                          </TouchableOpacity>
                          <TouchableOpacity>
                              <ToggleText>삭제</ToggleText>
                          </TouchableOpacity>
                      </ToggleBox>
                  }
              </NameDateMbtiBox>
              <Comment>댓글 내용입니다. 좀 길게 적으면 어떻게 될까요????? 더더더더더더더ㅓ더더더더ㅓㄷ</Comment>
              </CommentBox>
              <CommentBox>
              <NameDateMbtiBox>
                  <MbtiBtn><Mbti>ISFP</Mbti></MbtiBtn>
                  <Name>닉네임</Name>
                  <Date>23/01/04</Date>
              </NameDateMbtiBox>
              <Comment>댓글 내용입니다. 좀 길게 적으면 어떻게 될까요????? 더더더더더더더ㅓ더더더더ㅓㄷ</Comment>
              </CommentBox>
          </CommentsContainer>
        </Wrap>
        <CommentAddContainer>
          {/* <Entypo name="pencil" size={24} color="gray" style={{marginRight: 10}} /> */}
          <CommentInput placeholder="댓글을 입력해주세요.">

            
          </CommentInput>

        </CommentAddContainer>
      </>
    )

};

const Wrap = styled.ScrollView`
  padding: 20px;
`

const Line = styled.View`
  width: 95%;
  height: 1px;
  text-align: center;
  background-color: lightgray;
  margin: 30px 0;
`

const CommentsContainer = styled.View`
  width: 95%;
`

const CommentsCount = styled.Text`
  font-size: 20px;
  margin-bottom: 25px;
`

const CommentBox = styled.View`
  margin-bottom: 20px;
`

const NameDateMbtiBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 5px;
`

const Name = styled.Text`
  font-size: 22px;
  font-weight: bold;
  margin-right: 5px;
`

const Date = styled.Text`
  font-size: 16px;
  color: gray;
  margin-right: 5px;
`

const Comment = styled.Text`
  font-size: 20px;
`

const MbtiBtn = styled.View`
  height: 23PX;
  width: 65px;
  background-color: #FFD772;
  border-radius: 20px;
  margin-right: 5px;
`

const Mbti = styled.Text`
  color: white;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  padding-left: 4px;
`

const ToggleBtn = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`

const ToggleBox = styled.View`
  height: 60px;
  width: 75px;
  /* border: 1px solid lightgray; */
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 7px;
  top: 25px;
  z-index: 1;
  background-color: white;
`

const ToggleText = styled.Text`
  padding: 3px 10px;
  font-size: 19px;
`

const CommentAddContainer = styled.View`
  height: 60px;
  width: 100%;
  /* position: fixed; */
  background-color: #FAFAFA;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CommentInput = styled.TextInput`
  border-radius: 20px;
  height: 40px;
  width: 85%;
  font-size: 20px;
  padding: 0 20px;
  background-color: #f1f3f5;
`
