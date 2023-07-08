import React from "react";
import {View, StyleSheet, Text, Image} from "react-native";
import {image_path, windowWidth} from "../constants";
import {Ionicons} from "@expo/vector-icons";

const BirdInfo = ({bird}) => {
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={{fontWeight: "500", fontSize: 24}}>
          {bird?.common_name}{" "}
          <Text style={{fontSize: 14, fontWeight: "300", color: "#8d8d8d"}}>
            thuộc họ
          </Text>
        </Text>
        <Text style={{fontWeight: "500", fontSize: 22}}>{bird?.family}</Text>
        <Text style={styles.label1}>
          Tên Tiếng Việt:{" "}
          <Text style={styles.label2}>{bird?.vietnamese_name}</Text>
        </Text>
        <Text style={styles.label1}>
          Tên Khoa Học:{" "}
          <Text style={styles.label2}>{bird?.scientific_name}</Text>
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View style={{flexDirection: "row", alignItems: "center"}}>
          <Ionicons name="images-outline" size={24} />
          <Text style={{fontSize: 18, fontWeight: "500"}}>{"  "}Hình ảnh</Text>
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {[2, 3, 4, 5].map((i, index) => (
            <Image
              key={index}
              source={{uri: image_path + bird?.class_name + "/" + i + ".jpg"}}
              style={styles.images}
            />
          ))}
        </View>
      </View>
      <View style={styles.wrapper}>
        <View
          style={{flexDirection: "row", alignItems: "center", marginBottom: 8}}
        >
          <Ionicons name="newspaper-outline" size={24} />
          <Text style={{fontSize: 18, fontWeight: "500"}}>{"  "}Mô tả</Text>
        </View>
        <Text style={styles.text}>
          {"  "}
          {bird?.description}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View
          style={{flexDirection: "row", alignItems: "center", marginBottom: 8}}
        >
          <Ionicons name="podium-outline" size={24}></Ionicons>
          <Text style={{fontSize: 18, fontWeight: "500"}}>{"  "}Đặc trưng</Text>
        </View>
        <View style={{marginLeft: 16}}>
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 17, fontWeight: "500"}}>Chiều dài</Text>
            <Text style={styles.text}>{bird.height}</Text>
          </View>
          <View style={styles.line} />
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 17, fontWeight: "500"}}>Cân nặng</Text>
            <Text style={styles.text}>{bird.weight}</Text>
          </View>
          <View style={styles.line} />
          <View style={{marginBottom: 10}}>
            <Text style={{fontSize: 17, fontWeight: "500"}}>Thức ăn</Text>
            <Text style={styles.text}>{bird?.diet}</Text>
          </View>
        </View>
      </View>
      <View style={styles.wrapper}>
        <View
          style={{flexDirection: "row", alignItems: "center", marginBottom: 8}}
        >
          <Ionicons name="earth-outline" size={24} />
          <Text style={{fontSize: 18, fontWeight: "500"}}>{"  "}Phân bố</Text>
        </View>
        <Text style={styles.text}>
          {"  "}
          {bird?.distribution}
        </Text>
      </View>
      <View style={styles.wrapper}>
        <View
          style={{flexDirection: "row", alignItems: "center", marginBottom: 8}}
        >
          <Ionicons name="school-outline" size={24} />
          <Text style={{fontSize: 18, fontWeight: "500"}}>
            {"  "}Phân loại khoa học
          </Text>
        </View>
        <View
          style={{marginBottom: 10, flexDirection: "row", alignItems: "center"}}
        >
          <Text style={[styles.text, styles.col1]}>Tên Khoa học</Text>
          <Text style={styles.col2}>{bird?.scientific_name}</Text>
        </View>
        <View style={styles.line} />
        <View
          style={{marginBottom: 10, flexDirection: "row", alignItems: "center"}}
        >
          <Text style={[styles.text, styles.col1]}>Họ</Text>
          <Text style={styles.col2}>{bird?.family}</Text>
        </View>
        <View style={styles.line} />
        <View
          style={{marginBottom: 10, flexDirection: "row", alignItems: "center"}}
        >
          <Text style={[styles.text, styles.col1]}>Bộ</Text>
          <Text style={styles.col2}>{bird?.bird_order}</Text>
        </View>
        <View style={styles.line} />
        <View
          style={{marginBottom: 10, flexDirection: "row", alignItems: "center"}}
        >
          <Text style={[styles.text, styles.col1]}>
            Tình trạng{"\n"}bảo tồn
          </Text>
          <Text style={styles.col2}>{bird?.conservation_status}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    backgroundColor: "#e9e9e9",
    width: windowWidth,
    marginTop: 16,
  },
  wrapper: {
    backgroundColor: "#fff",
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  label1: {fontSize: 15, fontWeight: "300", color: "#8d8d8d", marginTop: 8},
  label2: {
    fontSize: 16,
    fontWeight: "400",
    color: "#343434",
    marginTop: 8,
  },
  images: {
    width: (windowWidth - 48) / 2,
    height: (windowWidth - 48) / 2,
    marginTop: 16,
  },
  text: {color: "#8d8d8d", fontSize: 16},
  line: {
    height: 1,
    backgroundColor: "#d8d8d8",
    marginBottom: 8,
  },
  col1: {width: 120, fontSize: 15},
  col2: {fontSize: 16, color: "#000", width: windowWidth - 132},
});

export default BirdInfo;
