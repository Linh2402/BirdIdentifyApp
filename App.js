import React, {useEffect} from "react";
import {View, Text, StatusBar} from "react-native";
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_500Medium,
  Montserrat_300Light_Italic,
  Montserrat_300Light,
} from "@expo-google-fonts/montserrat";
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import OnboardingScreen from "./src/screens/OnboardingScreen";
import BottomTabScreen from "./src/screens/BottomTabScreen";
import "react-native-safe-area-context";
import "react-native-gesture-handler";
import BirdDetailScreen from "./src/screens/BirdDetailScreen";
import {LoginScreen} from "./src/screens/LoginScreen";
import {RegisterScreen} from "./src/screens/RegisterScreen";
import {HistoryDetailScreen} from "./src/screens/HistoryDetailScreen";
import {SearchScreen} from "./src/screens/SearchScreen";
import Guide from "./src/components/Guide";
import News1 from "./src/components/News1";
import News2 from "./src/components/News2";
import News3 from "./src/components/News3";
import {List} from "./src/screens/ListScreen";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_300Light_Italic,
    Montserrat_500Medium,
    Montserrat_300Light,
  });

  useEffect(() => {
    if (fontsLoaded) {
      console.log("Font Montserrat đã tải thành công");
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer headerMode="none">
      <StatusBar backgroundColor="#f37180" barStyle="light-content" />
      <Stack.Navigator initialRouteName="Onboarding">
        <Stack.Screen
          name="Onboarding"
          component={OnboardingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTabScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Thông tin chi tiết" component={BirdDetailScreen} />
        <Stack.Screen name="Đăng nhập" component={LoginScreen} />
        <Stack.Screen name="Đăng ký" component={RegisterScreen} />
        <Stack.Screen name="History Detail" component={HistoryDetailScreen} />
        <Stack.Screen name="Tìm kiếm" component={SearchScreen} />
        <Stack.Screen name="Hướng dẫn" component={Guide} />
        <Stack.Screen
          name="Sự đa dạng của thế giới các loài chim"
          component={News1}
        />
        <Stack.Screen name="Sự sống của chim cánh cụt" component={News2} />
        <Stack.Screen
          name="Cuộc sống độc đáo của chim hải âu"
          component={News3}
        />
        <Stack.Screen name="Danh sách" component={List} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
