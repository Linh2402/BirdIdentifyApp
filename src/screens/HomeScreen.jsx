import React from "react";
import {
  Text,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {Ionicons} from "@expo/vector-icons";
import {LinearGradient} from "expo-linear-gradient";
import GetStarted from "../components/GetStarted";
import {windowWidth} from "../constants";
import HomeHeader from "../components/HomeHeader";
import {useNavigation} from "@react-navigation/native";

const data = [
  {
    id: 1,
    title: "All",
    label: "Tất cả",
  },
  {
    id: 2,
    title: "Psittaciformes - Bộ Vẹt",
    label: "Bộ Vẹt",
    label: "Bộ Vẹt",
  },
  {
    id: 3,
    title: "Anseriformes - Bộ Ngỗng",
    label: "Bộ Ngỗng",
  },
  {
    id: 4,
    title: "Passeriformes - Bộ Sẻ",
    label: "Bộ Sẻ",
  },
  {
    id: 5,
    title: "Galliformes - Bộ Gà",
    label: "Bộ Gà",
  },
  {
    id: 6,
    title: "Charadriiformes - Bộ Cun cút",
    label: "Bộ Cun cút",
  },
];

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#439A97" barStyle="light-content" />
      <HomeHeader />
      <ScrollView>
        <View style={styles.row}>
          <Ionicons name="list" color="#577D86" size={24} />
          <Text style={styles.rowText}>Danh sách các loài chim</Text>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={styles.orderContainer}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.gridItem,
                index % 2
                  ? {backgroundColor: "#4ea4a5"}
                  : {backgroundColor: "#F7C04A"},
              ]}
              onPress={() => navigation.navigate("Danh sách", {item})}
            >
              <Text style={[styles.title, index % 2 && {color: "#fff"}]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <GetStarted />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
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
  orderContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginTop: 16,
    marginRight: 16,
  },
  gridItem: {
    borderRadius: 10,
    marginBottom: 16,
    width: windowWidth * 0.35,
    height: 50,
    marginRight: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  gradientBackground: {
    width: windowWidth / 2 - 24,
    height: 70,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3F497F",
  },
});

export default HomeScreen;
