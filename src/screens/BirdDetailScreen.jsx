import React, {useRef, useState} from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import BirdInfo from "../components/BirdInfo";
import {image_path} from "../constants";

const BirdDetailScreen = ({route}) => {
  const {bird} = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.background}>
        <Image
          source={{uri: image_path + bird?.class_name + "/1.jpg"}}
          style={styles.birdImage}
        />
      </View>
      <BirdInfo bird={bird} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  birdImage: {
    width: 300,
    height: 300,
    marginTop: 16,
  },
});

export default BirdDetailScreen;
