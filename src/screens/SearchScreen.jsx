import React, {useState, useEffect} from "react";
import {
  TextInput,
  Button,
  FlatList,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import {image_path, path, windowWidth} from "../constants";
import {Ionicons} from "@expo/vector-icons";

export const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [canLoadMore, setCanLoadMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${path}/birds/search`, {
        params: {keyword: searchTerm, page},
      });
      const data = response.data.birds;
      setSearchResults((prevResults) => [...prevResults, ...data]);
      setLoading(false);
      if (data.length > 0) {
        setCanLoadMore(true);
      }
    } catch (error) {
      console.error("Lỗi:", error);
      setLoading(false);
    }
  };

  const handleCardPress = (bird) => {
    navigation.navigate("Thông tin chi tiết", {bird});
  };

  const loadMoreData = () => {
    if (!loading && canLoadMore) {
      setPage((prevPage) => prevPage + 1);
      setCanLoadMore(false);
    }
  };

  const renderCard = ({item}) => {
    return (
      <TouchableOpacity
        key={item.id.toString()}
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
        onPress={() => handleCardPress(item)}
      >
        <Image
          source={{
            uri: image_path + item?.class_name + "/1.jpg",
          }}
          style={{width: 120, height: 120}}
        />
        <View style={{marginLeft: 20}}>
          <Text style={{fontSize: 16}}>{item?.common_name}</Text>
          <Text style={{fontSize: 14, marginVertical: 8, fontWeight: "300"}}>
            {item?.vietnamese_name}
          </Text>
          <Text style={{fontSize: 14, fontWeight: "300"}}>
            {item?.scientific_name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (page > 1) {
      fetchData();
    }
  }, [page]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nhập từ khóa tìm kiếm"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Ionicons
          name="search"
          size={24}
          color="#439A97"
          style={styles.searchIcon}
          onPress={() => {
            setPage(1);
            setSearchResults([]);
            fetchData();
          }}
        />
      </View>
      {loading && page === 1 ? (
        <ActivityIndicator size={30} color={"#439A97"} />
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCard}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, alignItems: "center"},
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#439A97",
    borderRadius: 10,
    padding: 8,
    margin: 10,
    marginHorizontal: 16,
    backgroundColor: "#fdfdfd",
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginLeft: 10,
  },
});
