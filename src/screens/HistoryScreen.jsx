import {useNavigation} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import useAuthStore from "../store";
import {path, windowWidth} from "../constants";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import axios from "axios";

export const HistoryScreen = () => {
  const navigation = useNavigation();
  const isLogged = useAuthStore((state) => state.isLogged);
  const email = useAuthStore((state) => state.email);
  const token = useAuthStore((state) => state.token);
  const {logout} = useAuthStore();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCardPress = (item) => {
    navigation.navigate("History Detail", {item});
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${path}/history/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const HistoryCard = ({item}) => {
    return (
      <TouchableOpacity
        style={{
          width: windowWidth * 0.48 - 16,
          margin: 8,
          backgroundColor: "#fff",
          borderRadius: 8,
        }}
        onPress={() => handleCardPress(item)}
      >
        <Image
          source={{uri: item.url}}
          style={{
            width: windowWidth * 0.48 - 16,
            height: windowWidth * 0.48,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: 40,
            paddingHorizontal: 8,
          }}
        >
          <Text>{item.date}</Text>
          <TouchableOpacity
            hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            onPress={() => handleDelete(item.id)}
          >
            <Ionicons name="trash" size={24} color={"#8d8d8d"} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(path + "/history", {
        headers: {
          Authorization: `${token}`,
        },
      });

      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  if (!isLogged) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#439A97" barStyle="light-content" />
        <View style={{alignItems: "center", padding: 20}}>
          <Image
            style={{
              width: windowWidth - 40,
              marginVertical: -80,
            }}
            resizeMode="contain"
            source={require("../assets/history.png")}
          />
          <View style={{alignItems: "center", padding: 20, paddingTop: 0}}>
            <Text style={{fontSize: 18, fontWeight: "500", marginBottom: 16}}>
              Bạn chưa đăng nhập
            </Text>
            <Text style={{textAlign: "center", lineHeight: 20, fontSize: 14.5}}>
              Hãy đăng nhập để tận hưởng những trải nghiệm tuyệt vời, lưu lại
              lịch sử định danh và khám phá thêm nhiều điều thú vị hơn.
            </Text>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Đăng nhập");
            }}
          >
            <Text style={styles.buttonText}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#439A97" barStyle="light-content" />
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
              paddingHorizontal: 20,
              justifyContent: "space-between",
            }}
          >
            <Text style={{color: "#fff", fontSize: 16, fontWeight: "300"}}>
              Xin chào,
              <Text style={styles.buttonText}> {email.split("@")[0]}</Text>
            </Text>
            <TouchableOpacity
              onPress={() => logout()}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
              <Ionicons name="log-out-outline" color="#fff" size={30} />
            </TouchableOpacity>
          </View>
        </LinearGradient>
        {loading ? (
          <View
            style={[
              styles.content,
              {alignItems: "center", justifyContent: "center"},
            ]}
          >
            <ActivityIndicator size={60} color={"#439A97"} />
          </View>
        ) : (
          <View style={styles.content}>
            <View style={styles.row}>
              <Ionicons name="list" color="black" size={24} />
              <Text style={styles.rowText}>Danh sách định danh</Text>
            </View>
            {data.length === 0 ? (
              <View
                style={{
                  width: windowWidth,
                  height: 300,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../assets/empty_data.png")}
                  style={{width: 150, height: 150}}
                />
                <Text style={{color: "#8d8d8d", marginTop: 8}}>
                  Không có dữ liệu
                </Text>
              </View>
            ) : (
              <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <HistoryCard item={item} />}
                contentContainerStyle={{padding: 8}}
                numColumns={2}
              />
            )}
          </View>
        )}
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {flex: 1},
  button: {
    backgroundColor: "#439A97",
    padding: 14,
    width: 150,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 28,
    fontWeight: "500",
    marginBottom: 20,
    color: "#439A97",
  },
  linearGradient: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    marginTop: 16,
  },
  rowText: {
    marginLeft: 8,
    fontSize: 18,
    fontWeight: "500",
  },
});
