import React, { useState } from "react";
import { View, TextInput, Button, Alert } from "react-native";
import axios from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("/users/login", { email, password });
      const token = res.data.token;
      // Save token
      await AsyncStorage.setItem("token", token);
      navigation.replace("Home");
    } catch (err: any) {
      Alert.alert("Login Failed", err.response?.data?.message || "Error");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{ marginBottom: 10, borderWidth: 1, padding: 8 }} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}
