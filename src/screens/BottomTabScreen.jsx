import React, {useState, useEffect} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {LinearGradient} from "expo-linear-gradient";
import {Ionicons} from "@expo/vector-icons";
import {Animated, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {HomeScreen} from "../screens/HomeScreen";
import {IdentifierScreen} from "../screens/IdentifierScreen";
import {HistoryScreen} from "./HistoryScreen";

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  const [scaleValue] = useState(new Animated.Value(1));
  const navigation = useNavigation();

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate("Identify");
    });
  };

  const getTabBarIcon = (name, focused, color, size) => {
    if (name === "Identify") {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePress}
          style={{
            transform: [{scale: scaleValue}],
          }}
        >
          <LinearGradient
            colors={["#577D86", "#57C5B6"]}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{
              borderRadius: 100,
              padding: 10,
              elevation: 5,
            }}
          >
            <Ionicons name="scan" color="white" size={size} />
          </LinearGradient>
        </TouchableOpacity>
      );
    }

    if (name === "Home") {
      return <Ionicons name="home" color={color} size={size} />;
    }

    return <Ionicons name="person" color={color} size={size} />;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) =>
          getTabBarIcon(route.name, false, color, size),
        headerShown: false,
        tabBarActiveTintColor: "#439A97",
        tabBarInactiveTintColor: "gray",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 0,
          elevation: 0,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="Identify"
        component={IdentifierScreen}
        options={{unmountOnBlur: true}}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{unmountOnBlur: true}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabScreen;
