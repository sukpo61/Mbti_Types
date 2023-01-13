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

export default function Comment({ comment }) {
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
    await updateDoc(doc(dbService, "communityComments", id), {
      content: editContent,
    });
    setIsEdit(false);
  };

  // 댓글 수정하기.
  const { mutate: editMutate } = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("communityComments");
    },
  });

  // 댓글 삭제하기
  const deleteComment = async (id) => {
    deleteDoc(doc(dbService, "communityComments", id));
    // const test = Alert.alert("댓글 삭제", "댓글을 정말 삭제하시겠습니다?", [
    //   {
    //     text: "취소",
    //     style: "cancel",
    //     onPress: () => {
    //       setIsOpenModal(false);
    //     },
    //   },
    //   {
    //     text: "삭제",
    //     style: "destructive",
    //     onPress: () => {
    //       setIsOpenModal(false);
    //       deleteDoc(doc(dbService, "communityComments", id));
    //       return "delete";
    //     },
    //   },
    // ]);
    // console.log(test)
    // if (test === 'delete') {
    //   deleteDoc(doc(dbService, "communityComments", id));
    // }
  };

  // FIXME: 왜 삭제만 실시간 업데이트가 안 될까???
  const deleteMutate = useMutation(deleteComment, {
    onSuccess: () => {
      // setIsOpenModal(false);
      queryClient.invalidateQueries("communityComments");
      // refetch()
      // onRefresh()
      // queryClient.refetchQueries("communityComments");
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
              {/* <EditDeleteBtn onPress={() => deleteMutate(comment.id,{onSuccess: () => queryClient.invalidateQueries("communityComments")})}> */}
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
            multiline={true}
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
  min-height: 72px;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: space-between;
`;

const NameDateMbtiBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

const Name = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-left: 5px;
  line-height: 24px;
`;

const Date = styled.Text`
  font-size: 12px;
  color: gray;
  margin-right: 5px;
`;

const CommentText = styled.Text`
  font-size: 15px;
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

const ToggleBox = styled.View`
  height: 65px;
  width: 100px;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 7px;
  top: 25px;
  z-index: 1;
  background-color: white;
  border: 0.5px solid lightgray;
`;

const ToggleText = styled.Text`
  padding: 3px 10px;
  font-size: 20px;
`;

const BackBlur = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.3);
`;

const EditDeleteBox = styled.View`
  height: 130px;
  width: 100%;
  position: absolute;
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
