import styled from "@emotion/native";
import { Alert, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRef, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { dbService } from "../../firebase";

export default function Comment ({comment}) {

  const [toggle, setToggle] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState("");
  const editInputRef = useRef();

  const setEdit = () => {
    setIsEdit(!isEdit); 
    setToggle(!toggle);
    //FIXME: 왜 안됨??
    // editInputRef.current.focus();
  };

  const editComment = async (id) => {
    await updateDoc(doc(dbService, "communityComments", id), {
      content: editContent
    });
    setIsEdit(false); 
  };

  const deleteComment = async (id) => {
    Alert.alert("댓글 삭제", "댓글을 정말 삭제하시겠습니다?", [
      {text: "취소",
      style: "cancel"},
      {text: "삭제",
      style: "destructive",
      onPress: () => {
        deleteDoc(doc(dbService, "communityComments", id))
      }
      }
    ])
  };


  return (
      <CommentBox>
          <NameDateMbtiBox>
              <MbtiBtn><Mbti>{comment.mbti}</Mbti></MbtiBtn>
              <Name>{comment.nickname}</Name>
              <Date>2023/01/04</Date>
              <ToggleBtn onPress={() => setToggle(!toggle)}>
                  <MaterialCommunityIcons name="dots-vertical" size={22} color="gray" />
              </ToggleBtn>
              {toggle &&
                  <ToggleBox>
                      <TouchableOpacity onPress={setEdit}>
                          <ToggleText>댓글 수정</ToggleText>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => deleteComment(comment.id)}>
                          <ToggleText>댓글 삭제</ToggleText>
                      </TouchableOpacity>
                  </ToggleBox>
              }
          </NameDateMbtiBox>
          {isEdit 
          ? <EditInput onSubmitEditing={() => editComment(comment.id)} value={editContent} onChangeText={setEditContent} defaultValue={comment.content} ref={editInputRef} /> 
          : <CommentText>{comment.content}</CommentText>}
      </CommentBox>
  )
};

const CommentBox = styled.View`
  margin-bottom: 20px;
`

const NameDateMbtiBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 8px;
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

const CommentText = styled.Text`
  font-size: 20px;
`

const EditInput = styled.TextInput`
  border-bottom-color: gray;
  border-bottom-width: 1px;
  font-size: 20px;
  padding: 0 10px;
  margin: 0 5px;

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
  height: 65px;
  width: 100px;
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