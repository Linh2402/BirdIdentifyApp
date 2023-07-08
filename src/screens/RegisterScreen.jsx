import React, {useRef} from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import {useForm, Controller} from "react-hook-form";
import {windowWidth} from "../constants";
import useAuthStore from "../store";
import {useNavigation} from "@react-navigation/native";
import FlashMessage from "react-native-flash-message";
import {showMessage} from "react-native-flash-message";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

export const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
    watch,
  } = useForm();
  const navigation = useNavigation();
  const {register} = useAuthStore();
  const onSubmit = async (data) => {
    const status = await register(data);
    if (status) navigation.navigate("History");
    else
      showMessage({
        message: "Email này đã được đăng ký!",
        type: "danger",
      });
  };

  const password = useRef({});
  password.current = watch("password", "");

  return (
    <KeyboardAwareScrollView style={styles.container}>
      <FlashMessage position="top" />
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require("../assets/register.png")}
      />
      <Text style={styles.title}>Đăng ký</Text>
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address",
          },
        }}
        defaultValue=""
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 4,
            message: "Password must be at least 4 characters",
          },
        }}
        defaultValue=""
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: "Confirm Password is required",
          validate: (value) =>
            value === password.current || "Passwords do not match",
        }}
        defaultValue=""
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
            />
            {errors.confirmPassword && (
              <Text style={styles.errorText}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </View>
        )}
      />
      <View style={{alignItems: "center"}}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <View style={{alignItems: "center", marginTop: 16}}>
          <Text>Nếu bạn đã có tài khoản, </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Đăng nhập");
            }}
          >
            <Text style={{color: "#439A97", fontSize: 16}}>Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  image: {
    width: windowWidth - 40,
    marginVertical: -80,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#439A97",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "#439A97",
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  errorText: {
    color: "red",
    marginTop: 5,
  },
  button: {
    backgroundColor: "#439A97",
    padding: 14,
    width: 150,
    borderRadius: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
