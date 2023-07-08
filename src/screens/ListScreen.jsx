import {useNavigation} from "@react-navigation/native";
import axios from "axios";
import {useEffect, useState} from "react";
import {Ionicons} from "@expo/vector-icons";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {image_path, path, windowWidth} from "../constants";
import {FlatList} from "react-native-gesture-handler";

export const List = ({route}) => {
  const {item} = route.params;
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      let url = "";
      if (item.title === "All") {
        url = `${path}/birds?page=${page}`;
      } else {
        url = `${path}/birds/${item.title}?page=${page}`;
      }
      const response = await axios.get(url);
      setData((prevData) => [...prevData, ...response.data.birds]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const loadMoreData = () => {
    if (!loading) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  const navigation = useNavigation();

  const handleCardPress = (bird) => {
    navigation.navigate("Thông tin chi tiết", {bird});
  };

  const RenderCard = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id.toString()}
        activeOpacity={0.7}
        style={styles.cardBirds}
        onPress={() => handleCardPress(item)}
      >
        <Image
          source={{
            uri: image_path + item?.class_name + "/1.jpg",
          }}
          style={styles.cardImage}
        />
        <View style={styles.cardOverlay}>
          <Text
            style={[styles.cardTitle, {fontFamily: "Montserrat_400Regular"}]}
          >
            {item?.common_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.row}>
        <Ionicons name="list" color="black" size={24} />
        <Text style={styles.rowText}>
          {item.title === "All"
            ? "Danh sách các loài chim"
            : "Danh sách các loài chim " + item.label}
        </Text>
      </View>
      {loading && page === 1 ? (
        <View
          style={[
            styles.loadingContainer,
            {alignItems: "center", justifyContent: "center"},
          ]}
        >
          <ActivityIndicator size={60} color={"#439A97"} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id.toString()}
          renderItem={RenderCard}
          contentContainerStyle={styles.flatListContent}
          numColumns={2}
          onEndReached={loadMoreData}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading && page > 1 ? (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size={30} color={"#439A97"} />
              </View>
            ) : null
          }
        />
      )}
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
  },
  cardBirds: {
    borderRadius: 8,
    padding: 8,
    width: windowWidth * 0.48,
    alignItems: "center",
  },
  cardImage: {
    width: "100%",
    height: 170,
    borderRadius: 8,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    borderRadius: 8,
    justifyContent: "flex-end",
    alignItems: "flex-start",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 14,
    margin: 25,
    textAlign: "center",
  },
  flatListContent: {
    padding: 8,
  },
  loadingContainer: {
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  gridItem: {
    width: "48%",
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
