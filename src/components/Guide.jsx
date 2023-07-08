import React from "react";
import {Image, ScrollView, StyleSheet, Text, View} from "react-native";
import {windowWidth} from "../constants";
import {SafeAreaView} from "react-native-safe-area-context";

const Guide = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Cách nhận biết loài chim qua hình ảnh</Text>
        <Text style={styles.content}>
          Chất lượng hình ảnh tốt có thể cải thiện độ chính xác của việc nhận
          diện chim.
        </Text>
        <Text style={styles.subtitle}>Chim nằm chính giữa khung hình</Text>
        <Text style={styles.content}>
          Đảm bảo chim nằm chính giữa khung hình và không quá xa.
        </Text>
        <Image
          source={require("../assets/image_1.png")}
          style={{width: windowWidth - 32, height: 200}}
        />
        <Text style={styles.subtitle}>
          Tránh có cây cối hoặc vật khác trước mặt chim
        </Text>
        <Text style={styles.content}>
          Hạn chế sự hiện diện của cây cối, lồng chim hoặc các vật khác trước
          mặt chim trong ảnh.
        </Text>
        <Image
          source={require("../assets/image_2.png")}
          style={{width: windowWidth - 32, height: 200}}
        />
        <Text style={styles.subtitle}>Ánh sáng tốt và độ tương phản cao</Text>
        <Text style={styles.content}>
          Đảm bảo có đủ ánh sáng để tạo độ tương phản cao. Nếu bạn không thể
          nhìn thấy chim, ứng dụng cũng không thể nhận diện được.
        </Text>
        <Image
          source={require("../assets/image_3.png")}
          style={{width: windowWidth - 32, height: 200}}
        />
        <Text style={styles.subtitle}>Chụp mặt trước của chim</Text>
        <Text style={styles.content}>
          Hãy cố gắng chụp mặt trước của chim. Ít nhất, phần đầu của chim phải
          thấy rõ.
        </Text>
        <Image
          source={require("../assets/image_4.png")}
          style={{width: windowWidth - 32, height: 200}}
        />
        <Text style={styles.subtitle}>Chỉ có một loài chim trong ảnh</Text>
        <Text style={styles.content}>
          Chỉ nên có một loài chim trong bức ảnh. Quá nhiều chim trong ảnh có
          thể dẫn đến việc nhận diện sai.
        </Text>
        <Image
          source={require("../assets/image_5.png")}
          style={{width: windowWidth - 32, height: 200}}
        />
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
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
  },
  content: {
    fontSize: 16,
    marginVertical: 8,
  },
});

export default Guide;
