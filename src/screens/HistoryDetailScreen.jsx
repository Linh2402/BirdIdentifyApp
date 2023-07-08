import React, {useEffect, useState} from "react";
import {ActivityIndicator, Image, StyleSheet, Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {FlatList, TouchableOpacity} from "react-native-gesture-handler";
import axios from "axios";

import {image_path, path, windowWidth} from "../constants";

export const HistoryDetailScreen = ({route, navigation}) => {
  const {item} = route.params;
  const [birdData, setBirdData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const promises = item.predictions.map((prediction) =>
        getBirdById(prediction.bird_id)
      );
      const birdResults = await Promise.all(promises);
      setBirdData(birdResults);
    };

    fetchData();
  }, []);

  const getBirdById = async (id) => {
    try {
      setLoading(true);
      const response = await axios.get(`${path}/birds/${id}`);
      const bird = response.data;
      setLoading(false);
      return bird;
    } catch (error) {
      setLoading(false);
      console.error("Lỗi:", error);
      throw error;
    }
  };

  const handleCardPress = (bird) => {
    navigation.navigate("Thông tin chi tiết", {bird});
  };

  const RenderCard = ({item}) => {
    const bird = birdData.find((bird) => bird.id === item.bird_id);

    if (loading)
      return (
        <View
          style={{
            width: windowWidth,
            height: 150,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size={24} color={"#f37180"} />
        </View>
      );
    else
      return (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            width: windowWidth - 40,
            marginVertical: 8,
            backgroundColor: "#fff",
            alignItems: "center",
            flexDirection: "row",
            padding: 8,
            borderRadius: 8,
          }}
          onPress={() => handleCardPress(bird)}
        >
          <Image
            source={{
              uri: image_path + bird?.class_name + "/1.jpg",
            }}
            style={{width: 120, height: 120}}
          />
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 20, marginBottom: 8}}>
              {bird?.common_name}
            </Text>
            <Text>
              Độ chính xác:{"  "}
              <Text style={{fontSize: 20}}>
                {item.confidence}
                {"%"}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      );
  };

  return (
    <View style={styles.container}>
      <Image
        source={{uri: item.url}}
        style={{width: windowWidth * 0.6, height: windowWidth * 0.6}}
      />
      <View style={styles.row}>
        <Ionicons name="stopwatch-outline" color="black" size={30} />
        <Text style={{fontSize: 18}}> {item.date}</Text>
      </View>
      <FlatList
        data={item.predictions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={RenderCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: "center", padding: 20},
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 16,
  },
});
