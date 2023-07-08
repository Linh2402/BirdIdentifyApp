import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {windowWidth} from "../constants";

const data = [
  {
    id: 1,
    path: "../assets/vet_macaw.jpeg",
    screen: "Sự đa dạng của thế giới các loài chim",
    title: "Sự đa dạng của thế giới các loài chim",
  },
  {
    id: 2,
    path: "../assets/canh_cut.jpeg",
    screen: "Sự sống của chim cánh cụt",
    title: "Sự sống của chim cánh cụt",
  },
  {
    id: 3,
    path: "../assets/hai_au.jpeg",
    screen: "Cuộc sống độc đáo của chim hải âu",
    title: "Cuộc sống độc đáo của chim hải âu",
  },
];

export const GetStarted = () => {
  const navigation = useNavigation();

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: "#dbebeb",
          marginVertical: 8,
          marginHorizontal: 16,
          borderRadius: 8,
          paddingBottom: 10,
          alignItems: "center",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
        onPress={() => navigation.navigate(item.screen)}
      >
        {item.id === 1 ? (
          <Image
            source={require("../assets/vet_macaw.jpeg")}
            style={{
              width: windowWidth - 32,
              height: 230,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              marginBottom: 8,
            }}
            resizeMode="contain"
          />
        ) : item.id === 2 ? (
          <Image
            source={require("../assets/canh_cut.png")}
            style={{
              width: windowWidth - 32,
              height: 230,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderRadius: 8,
              marginBottom: 8,
            }}
            resizeMode="contain"
          />
        ) : (
          <Image
            source={require("../assets/hai_au.jpeg")}
            style={{
              width: windowWidth - 32,
              height: 230,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              borderRadius: 8,
              marginBottom: 8,
            }}
            resizeMode="contain"
          />
        )}
        <Text style={{fontSize: 17, fontWeight: 500}}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View style={styles.row}>
        <Ionicons name="bookmark" color="#577D86" size={24} />
        <Text style={styles.rowText}>Get Started</Text>
      </View>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("Hướng dẫn")}
      >
        <View style={{flex: 2}}>
          <Text style={styles.title}>
            Cách nhận biết loài chim qua hình ảnh
          </Text>
          <Text style={styles.subtitle}>
            5 lời khuyên hữu ích về cách cải thiện độ chính xác của nhận dạng
          </Text>
        </View>
        <Image source={require("../assets/image0.png")} style={styles.image} />
      </TouchableOpacity>
      <View style={styles.row}>
        <Ionicons name="book" color="#577D86" size={24} />
        <Text style={styles.rowText}>Khám phá</Text>
      </View>
      {data.map((item) => (
        <RenderCard item={item} key={item.id} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
  },
  rowText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "500",
    color: "#577D86",
  },
  card: {
    backgroundColor: "#dbebeb",
    flexDirection: "row",
    margin: 16,
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  image: {
    width: 100,
    height: 120,
    flex: 1,
  },
});

export default GetStarted;
