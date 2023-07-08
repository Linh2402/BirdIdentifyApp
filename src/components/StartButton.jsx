import React from "react";
import {TouchableOpacity, Text, StyleSheet} from "react-native";
import {LinearGradient} from "expo-linear-gradient";

const StartButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <LinearGradient
        colors={["#1e7f9f", "#a8cbd7"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.gradient}
      >
        <Text style={styles.buttonText}>Bắt đầu</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 60,
  },
  gradient: {
    borderRadius: 30,
    paddingHorizontal: 50,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#f37180",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default StartButton;
