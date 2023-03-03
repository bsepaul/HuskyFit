import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
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

  const alertFailure = () => {
    const title = 'Login Error';
    const message = 'Incorrect email or password. Try again.';
    const emptyArrayButtons = [];
    const alertOptions = {
      cancelable: true,
    };
    Alert.alert(title, message, emptyArrayButtons, alertOptions);
  };

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
        // var token = json.token     // "token": "..."
        var token = 'eyJraWQiOiJBd2F0VzNTNlZkUTVkZ3ZYYmRQN1lqQzVLMENoRXc2NnRFK1JlQld0QTJVPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmOGMwZjQ5Yi03NjQ1LTRjMzAtYTQ1NS01MDUzODdkZTAyYzQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYmlydGhkYXRlIjoiMDRcLzE1XC8yMDAxIiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfZzM1TmJlc1ZTIiwiY29nbml0bzp1c2VybmFtZSI6ImJyaWRnZXQuc21pdGhfZXBhdWxAdWNvbm4uZWR1Iiwib3JpZ2luX2p0aSI6IjFkYTNiYjMxLTIyYjgtNGYzZC1iMDczLTIyN2I5OGVjNmM2MiIsImF1ZCI6IjN2MDBobXJlMjJ1cWVjdmw5anVjOGdiMTNvIiwiZXZlbnRfaWQiOiJhZjYwY2VhNy1jOGQ4LTRiOTgtOGRmMS1lYzE4MDMzMTc4OTUiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3Nzg3MzE2MSwibmFtZSI6IkJyaWRnZXQgU21pdGggRXBhdWwiLCJleHAiOjE2Nzc4OTExNjEsImlhdCI6MTY3Nzg3MzE2MSwianRpIjoiNjMwZTA0YjgtN2VhOS00OTFmLTgwODktZmQ5ZmVmODUyMzRkIiwiZW1haWwiOiJicmlkZ2V0LnNtaXRoX2VwYXVsQHVjb25uLmVkdSJ9.obHtZOJttowibpWLsjEBOgcHez7OPc7kgHlyVTitJ3Urqg1k5EKpWWlYAONj6lJP7EsJ8_o7amsdzBaonxGWfRF5u1BLgby8msAktouhqyBsRz6H6bZNc1l2zFf2HS8RVUTUBLnKpy-ZuANHOvnCSVPOlXK-WdHK9GXcZ0GHgSgA-6RqSLS17o-V5Utae_GAuovMEJs7Yny8UkELaJsClve82erZmSUs8blcGSy7TiZDZo1_9oxnob6ENYbzAaG6QR13_axs1-z5ADajCJ5faEJwFDaMitiQQ2cG9q1oGI91ts4fn-yMsqhNonNyhsj8nbvdlqidRTmlJS5YNWTEPg';

        console.log(message)
        console.log()
        console.log(token)

        //If you want to bypass the login credentials, uncomment this
        navigation.navigate("Tabs", {token: token});
        
        // If you want to test the login credentials or need the token for testing something, uncomment this
        // if ((message != "Invalid input") && (message != "User does not exist.")) {
        //  navigation.navigate("Tabs", {token: token});
        // }
        // else {
        //   alertFailure();
        // }
        
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
