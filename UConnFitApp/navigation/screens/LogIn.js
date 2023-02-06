import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity} from "react-native";
import CustomButton from "../../assets/Components/CustomButton";
import fetch from "node-fetch";
import { myColors } from "../../assets/colors/ColorPalette";

let styles = {
    flexDirection: "row",
    borderBottomColor: myColors.grey,
    borderBottomWidth: 1,
    paddingBottom: 12,
    marginBottom: 25,
  };

const Login = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleEmail = (text) => {
    setEmail(text);
  };
  const handlePassword = (text) => {    
    setPassword(text);
  };

  const handleLogin = () => {
    // Calling API here
    (async () => {
      var raw = JSON.stringify({
        email: email,
        password: password,
      });

      var requestOptions = {
        method: "POST",
        headers: {
          "x-api-key": "baKUvaQPWW2ktAmIofzBz6TkTUmnVcQzX5qlPfEj",
          "Content-Type": "application/json",
        },
        body: raw,
        redirect: "follow",
      };
      fetch(
        "https://ap782aln95.execute-api.us-east-1.amazonaws.com/dev/auth/login",
        requestOptions
      )
      .then(response => response.text())
      .then((result) => {
        // Do stuff here
        var json = JSON.parse(result);
        var message = json.message // "message": "Success"
        var token = json.token     // "token": "..."

        console.log(message)
        console.log()
        console.log(token)
        
        navigation.navigate("Tabs");
      })
      .catch(error => console.log('error', error));
    })();
  };
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      <View style={{ paddingHorizontal: 25 }}>
        <Text
          style={{
            fontFamily: "System",
            fontSize: 28,
            fontWeight: "500",
            color: myColors.navy,
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <View style={styles}>

          <TextInput
            placeholder="Email"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <View style={styles}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#003f5c"
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>

        <CustomButton label={"Login"} onPress={handleLogin} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: myColors.navy }}> New to the App? </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: myColors.navy, fontWeight: "700" }}>
              {" "}
              Register{" "}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
