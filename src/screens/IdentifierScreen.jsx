import React, {useState, useEffect, useRef} from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import LottieView from "lottie-react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import {image_path, path} from "../constants";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {windowWidth} from "../constants";
import {Ionicons} from "@expo/vector-icons";
import BirdInfo from "../components/BirdInfo";
import useAuthStore from "../store";

const SLIDER_WIDTH = windowWidth + 30;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.6);

const renderItem = ({item}) => {
  return (
    <View
      style={{
        padding: 20,
        paddingBottom: 0,
        borderRadius: 20,
        alignItems: "center",
        backgroundColor: "#C1ECE4",
      }}
    >
      <Image
        source={{uri: image_path + item?.class_name + "/1.jpg"}}
        style={{
          width: 220,
          height: 220,
          borderRadius: 16,
          borderWidth: 2,
          borderColor: "#fff",
        }}
      />
      <Text style={{marginVertical: 10, fontSize: 20, fontWeight: "500"}}>
        <Text style={{color: "#606060", fontSize: 16, fontWeight: "300"}}>
          {"Độ chính xác: "}
        </Text>
        {item.confidence}
        {" %"}
      </Text>
    </View>
  );
};

export const IdentifierScreen = ({navigation}) => {
  const [pickedImagePath, setPickedImagePath] = useState("");
  const [birds, setBirds] = useState([]);
  const [birdsData, setBirdsData] = useState([]);
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const token = useAuthStore((state) => state.token);

  const PickImageCon = () => (
    <View style={{alignItems: "center"}}>
      <Image
        source={require("../assets/image3.png")}
        style={styles.imagePlaceholder}
      />
      <View style={{alignItems: "center", padding: 20, paddingTop: 0}}>
        <Text style={{fontSize: 18, fontWeight: "500", marginBottom: 16}}>
          Chọn một bức ảnh để nhận diện
        </Text>
        <Text style={{textAlign: "center", lineHeight: 20, fontSize: 14.5}}>
          Để cải thiện độ chính xác trong việc nhận diện, hãy đảm bảo chất lượng
          hình ảnh tốt và giữ chim ở giữa khung hình, tránh để chim quá xa.
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button1} onPress={openCamera}>
          <Ionicons name="camera" size={27} color={"#fff"} />
          <Text style={{color: "#fff"}}>{"  "}Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button1} onPress={showImagePicker}>
          <Ionicons name="images" size={27} color={"#fff"} />
          <Text style={{color: "#fff"}}>{"  "}Library</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const uploadImage = async (uri) => {
    const formData = new FormData();
    formData.append("image", {
      uri: uri,
      type: "image/jpeg",
      name: "photo.jpg",
    });

    try {
      setLoading(true);
      setBirds([]);
      const response = await axios.post(path + "/predict", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      const data = response?.data ?? [];
      setBirds(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const showImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync();

    if (!result.canceled) {
      setPickedImagePath(result.uri);
      setIsInitialLoad(false);
      uploadImage(result.uri);
    }
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync();

    if (!result.cancelled) {
      setPickedImagePath(result.uri);
      uploadImage(result.uri);
    }
  };

  useEffect(() => {
    const fetchBirdData = async () => {
      const data = [];
      try {
        await Promise.all(
          birds.map(async (bird) => {
            const response = await axios.get(
              path + `/birds/${bird.predicted_id}`
            );
            data.push({...response.data, confidence: bird.confidence});
          })
        );
        setBirdsData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBirdData();
  }, [birds]);

  birdsData.sort(function (a, b) {
    return b.confidence - a.confidence;
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#439A97" barStyle="light-content" />
      <ScrollView>
        <View style={styles.imageContainer}>
          {!pickedImagePath ? (
            <PickImageCon />
          ) : loading ? (
            <View style={styles.imageContainer1}>
              <Image source={{uri: pickedImagePath}} style={styles.image1} />
              <LottieView
                source={require("../assets/41671-scan.json")}
                autoPlay
                loop
                style={styles.lottieAnimation}
              />
            </View>
          ) : (
            <View
              style={{
                justifyContent: "center",
                height: 360,
                marginTop: 16,
              }}
            >
              <Carousel
                ref={isCarousel}
                data={birdsData}
                renderItem={renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                onSnapToItem={(index) => setIndex(index)}
              />
              <Image
                source={{
                  uri: pickedImagePath,
                }}
                style={{
                  width: 100,
                  height: 90,
                  borderWidth: 2,
                  borderColor: "#fff",
                  borderRadius: 16,
                  position: "absolute",
                  bottom: 10,
                  left: 20,
                }}
              />
              <Pagination
                dotsLength={birdsData.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                horizontal={true}
                containerStyle={{height: 70}}
                dotStyle={{
                  width: 30,
                  height: 30,
                  justifyContent: "center",
                  alignItems: "center",
                }}
                renderDots={(activeIndex, total, context) => {
                  const dots = [];
                  for (let i = 0; i < total; i++) {
                    const isActive = i === activeIndex;
                    dots.push(
                      <View
                        key={i}
                        style={{
                          width: 40,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <View
                          style={{
                            width: 30,
                            height: 30,
                            borderRadius: 15,
                            backgroundColor: isActive
                              ? "#439A97"
                              : "transparent",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: isActive ? "white" : "black",
                              fontWeight: isActive ? "bold" : "normal",
                              textAlign: "center",
                            }}
                          >
                            {i + 1}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                  return dots;
                }}
              />
              <View style={[styles.buttonContainer, styles.position]}>
                <TouchableOpacity style={styles.button} onPress={openCamera}>
                  <Ionicons name="camera" size={27} color={"#fff"} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={showImagePicker}
                >
                  <Ionicons name="images" size={27} color={"#fff"} />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
        {birdsData.length > 0 && <BirdInfo bird={birdsData[index]} />}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer1: {
    width: 350,
    height: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  image1: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
    position: "absolute",
  },
  lottieAnimation: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    alignItems: "center",
  },
  imagePlaceholder: {
    marginTop: 16,
    width: 370,
    height: 370,
    resizeMode: "contain",
  },
  position: {
    position: "absolute",
    right: 10,
    top: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(128, 128, 128, 0.5)",
    marginHorizontal: 8,
    flexDirection: "row",
  },
  button1: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#439A97",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 16,
    margin: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  topResults: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    alignSelf: "center",
  },
  resultsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  resultItem: {
    width: "48%",
    marginBottom: 16,
  },
  resultImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
  },
  resultName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  resultAccuracy: {
    fontSize: 16,
    color: "#6f6f6f",
  },
});

export default IdentifierScreen;
