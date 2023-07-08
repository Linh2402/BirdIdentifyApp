import React from "react";
import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";

const HomeHeader = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#439A97", "#439A97"]}
        start={{x: 0.5, y: 0}}
        end={{x: 0.5, y: 1}}
        style={styles.linearGradient}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <Text style={styles.title}>Bird Indentify</Text>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => navigation.navigate("Tìm kiếm")}
          >
            <Ionicons name="search" size={32} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  linearGradient: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  searchBarContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default HomeHeader;
