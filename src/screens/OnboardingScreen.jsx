import React from "react";
import {View, Text, StyleSheet, ImageBackground, StatusBar} from "react-native";
import LottieView from "lottie-react-native";
import StartButton from "../components/StartButton";

const OnboardingScreen = ({navigation}) => {
  const handleStart = () => {
    navigation.navigate("BottomTab");
  };

  return (
    <ImageBackground
      source={require("../assets/background1.jpeg")}
      style={styles.container}
    >
      <StatusBar translucent={true} backgroundColor="transparent" />
      <View style={styles.contentContainer}>
        <LottieView
          source={require("../assets/44754-bird.json")}
          autoPlay
          loop
          style={styles.lottieView}
        />
        <Text style={[styles.appName, {fontFamily: "Montserrat_500Medium"}]}>
          IDENTIFY{"\n"}BIRDS
        </Text>
        <Text style={[styles.slogan, {fontFamily: "Montserrat_400Regular"}]}>
          Khám phá thế giới đa dạng{"\n"}các loài chim với IdentifyBirds
        </Text>
      </View>
      <StartButton onPress={handleStart} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 20,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  lottieView: {
    width: 400,
    height: 400,
    marginStart: 15,
  },
  appName: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#086280",
  },
  slogan: {
    fontSize: 16,
    textAlign: "center",
    marginVertical: 10,
    color: "#086280",
    lineHeight: 24,
  },
});

export default OnboardingScreen;
