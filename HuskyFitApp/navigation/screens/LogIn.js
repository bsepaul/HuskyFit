import React from "react";
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from "react-native";
import CustomButton from "../../assets/Components/CustomButton";
import fetch from "node-fetch";
import { myColors } from "../../assets/styles/ColorPalette";
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
      
        console.log(message);
        console.log();
        console.log(token);

        //If you want to bypass the login credentials, uncomment this
        // navigation.navigate("Tabs", {token: token});
        
        // If you want to test the login credentials or need the token for testing something, uncomment this
        if ((message != "Invalid input") && (message != "User does not exist.") && (message != "Incorrect username or password.")) {
         navigation.navigate("Tabs", {token: token});
        }
        else {
          alertFailure();
        }
        
      })
      .catch(error => console.log('Login error', error));
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
            autoCorrect={false}
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
