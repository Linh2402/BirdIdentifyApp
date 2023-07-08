import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {windowWidth} from "../constants";
import {ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export const News3 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Cuộc sống độc đáo của chim hải âu</Text>
        <Text style={styles.date}>30/06/2023</Text>
        <Image
          source={require("../assets/hai_au.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.content}>
          Chim hải âu là một loài chim có khả năng bay cao và săn mồi xuất sắc
          trên biển. Họ là những chuyên gia săn mồi có kỹ năng tuyệt vời trong
          việc chiến đấu và bắt cá. Chim hải âu có một cuộc sống độc lập và
          phiêu lưu trên đại dương mênh mông. Hãy khám phá thêm về cuộc sống độc
          đáo của chim hải âu trong bài viết này.
        </Text>
        <Text style={styles.sectionTitle}>Kỹ năng săn mồi xuất sắc</Text>
        <Image
          source={require("../assets/bat_moi.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.content}>
          Chim hải âu là những người săn mồi tài ba trên biển. Họ sử dụng đôi
          mắt nhọn nhạy để tìm kiếm cá mồi từ trên cao. Khi nhận biết được một
          con cá, chim hải âu sẽ nhanh chóng lao xuống từ độ cao và dùng móng
          vuốt sắc nhọn để bắt con mồi trong nước. Kỹ năng săn mồi của chim hải
          âu rất đặc biệt và đã truyền qua hàng ngàn thế hệ.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: "#8d8d8d",
    marginBottom: 8,
  },
  image: {
    width: windowWidth - 40,
    height: 225,
    marginBottom: 8,
    borderRadius: 8,
  },
  content: {
    fontSize: 16,
    color: "#555",
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
});

export default News3;
