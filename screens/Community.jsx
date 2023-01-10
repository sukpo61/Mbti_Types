import React from "react";
import styled from "styled-components/native";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { Header } from "react-native/Libraries/NewAppScreen";

export default function Community() {
  return (
    <SafeAreaView>
      <View style={styles.communityTitleContainer}>
        <Text name="" style={styles.communityTitle}>
          좋아요 순
        </Text>
      </View>

      <View style={styles.postBox}>
        <View style={styles.postTitleWrap}>
          <Text style={styles.postTitle}>이게맞나 싶다</Text>
        </View>

        <View style={styles.postDetailWrap}>
          <Text style={styles.postDetail}>닉네임</Text>
          <Text style={styles.postDetail}>23.01.01</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  //* 게시글 타이틀
  communityTitleContainer: {
    // backgroundColor: "green",
    marginBottom: 30,
    fontWeight: "bold",
  },
  communityTitle: {
    fontSize: 20,
  },

  //* 게시글 내용 (제목, 닉네임, 날짜)
  postBox: {
    marginLeft: 10,
    marginBottom: 20,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
  },
  postTitle: {
    // backgroundColor: "beige",
    marginBottom: 10,
    fontSize: 15,
  },
  postDetailWrap: {
    flexDirection: "row",
  },
  postDetail: {
    fontSize: 12,
    marginRight: 5,
    marginBottom: 5,
  },
});