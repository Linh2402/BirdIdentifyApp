import React from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import {windowWidth} from "../constants";
import {ScrollView} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

export const News2 = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Sự sống của chim cánh cụt</Text>
        <Text style={styles.date}>28/06/2023</Text>
        <Image
          source={require("../assets/canh_cut.png")}
          style={styles.image}
          resizeMode="cover"
        />
        <Text style={styles.content}>
          Chim cánh cụt là một trong những loài chim sống trong môi trường khắc
          nghiệt nhất trên Trái Đất. Họ sinh sống trong vùng Bắc Cực và Nam Cực
          nơi có điều kiện thời tiết lạnh giá và băng tuyết. Đặc điểm đáng chú ý
          của chim cánh cụt là khả năng bơi và lặn xuống đại dương sâu. Hãy cùng
          tìm hiểu thêm về cuộc sống độc đáo của chim cánh cụt và những nỗ lực
          bảo vệ loài này.
        </Text>
        <Text style={styles.sectionTitle}>
          Cuộc hành trình kéo dài hàng nghìn km
        </Text>
        <Text style={styles.content}>
          Chim cánh cụt thực hiện cuộc hành trình điểm đến từ xa hàng năm để tìm
          kiếm thức ăn và địa điểm sinh sản. Họ di cư hàng nghìn km từ vùng Bắc
          Cực đến Nam Cực và ngược lại. Đây là một cuộc hành trình khó khăn,
          nhưng chim cánh cụt luôn tìm cách vượt qua mọi thách thức để duy trì
          sự sống của loài.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flex: 1,
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

export default News2;
