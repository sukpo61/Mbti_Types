import CommentsList from "../components/Detail/CommentsList";
import Post from "../components/Detail/Post";
import CommentAddInput from "../components/Detail/CommnetAddInput";
import styled from "@emotion/native";
import { ScrollView } from "react-native";

export default function CommunityDetail() {

  return (
    <>
      <ScrollView>
        <Post />
        <CommentsList />
      </ScrollView>
      <CommentAddInput />
    </>
  )
};