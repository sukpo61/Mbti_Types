import styled from "@emotion/native";
import { Alert, Modal, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { useRef, useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { authService, dbService } from "../../firebase";
import DetailMbtiColorBtn from "../global/DetailMbtiColorBtn";
import { getDate } from "../../utils";
import { useMutation, useQueryClient } from "react-query";

export default function QnAComment({ comment }) {
  const queryClient = useQueryClient();
  const user = authService.currentUser;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editContent, setEditContent] = useState("");

  // [댓글 수정] 클릭했을 때 text를 input으로 변환함.
  const setEdit = () => {
    setIsEdit(!isEdit);
    setIsOpenModal(!isOpenModal);
  };

  // 댓글 수정하기.
  const editComment = async (id) => {
    await updateDoc(doc(dbService, "qnaComments", id), {
      content: editContent,
    });
    setIsEdit(false);
  };

  // 댓글 수정하기.
  const { mutate: editMutate } = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("qnaComments");
    },
  });

  // 댓글 삭제하기
  const deleteComment = async (id) => {
    deleteDoc(doc(dbService, "qnaComments", id));
  };

  const deleteMutate = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("qnaComments");
    },
  });

  return (
    <CommentBox>
      <NameDateMbtiBox>
        <InfoTop>
          <DetailMbtiColorBtn mbti={comment.mbti} />
          <Name>{comment.nickname}</Name>
        </InfoTop>
        {user?.email == comment.userId ? (
          <ToggleBtn onPress={() => setIsOpenModal(!isOpenModal)}>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={23}
              color="gray"
            />
          </ToggleBtn>
        ) : null}
        <Modal
          visible={isOpenModal}
          transparent
          animationType="slide"
          onRequestClose={() => setIsOpenModal(false)}
        >
          <BackBlur onPress={() => setIsOpenModal(false)}>
            <EditDeleteBox>
              <EditDeleteBtn onPress={setEdit}>
                <Feather name="edit" size={22} color="black" />
                <ToggleText>댓글 수정</ToggleText>
              </EditDeleteBtn>
              <EditDeleteBtn onPress={() => deleteMutate.mutate(comment.id)}>
                <FontAwesome name="trash-o" size={25} color="black" />
                <ToggleText style={{ paddingLeft: 12 }}>댓글 삭제</ToggleText>
              </EditDeleteBtn>
            </EditDeleteBox>
          </BackBlur>
        </Modal>
      </NameDateMbtiBox>
      <InfoMiddle>
        {isEdit ? (
          <EditInput
            autoFocus
            onSubmitEditing={() => editMutate(comment.id)}
            onChangeText={setEditContent}
            defaultValue={comment.content}
          />
        ) : (
          <CommentText>{comment.content}</CommentText>
        )}
      </InfoMiddle>
      <Date>{getDate(comment.date)}</Date>
    </CommentBox>
  );
}

const InfoTop = styled.View`
  flex-direction: row;
  align-items: center;
`;
const InfoMiddle = styled.View`
  width: 90%;
  flex-direction: row;
  align-items: center;
`;

const CommentBox = styled.View`
  min-height: 60px;
  margin-bottom: 24px;
  flex-direction: column;
  justify-content: space-between;
`;

const NameDateMbtiBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Name = styled.Text`
  font-size: 14px;
  margin-left: 5px;
`;
const Date = styled.Text`
  font-size: 12px;
  color: gray;
  margin-right: 5px;
`;

const CommentText = styled.Text`
  font-size: 12px;
  line-height: 18px;
`;

const EditInput = styled.TextInput`
  width: 100%;
  border-bottom-color: gray;
  border-bottom-width: 1px;
  font-size: 14px;
  padding: 0 2px;
`;

const ToggleBtn = styled.TouchableOpacity`
  position: absolute;
  right: 0;
`;

const ToggleText = styled.Text`
  padding: 3px 10px;
  font-size: 14px;
`;

const BackBlur = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const EditDeleteBox = styled.View`
  height: 130px;
  width: 100%;
  position: absolute;
  border-radius: 20px 20px 0px 0px;
  bottom: 0;
  background-color: white;
  justify-content: center;
  padding: 0 30px;
`;

const EditDeleteBtn = styled.TouchableOpacity`
  flex-direction: row;
  padding: 12px 0;
  align-items: center;
`;
