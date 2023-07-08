import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import ButtonForm from "../components/ButtonForm"
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";

export default function LoginPage({ navigation, route }) {
  const { setLogin, setUser } = route.params;

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const userInfo = await GoogleSignin.signIn();
    const { idToken } = userInfo;
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "534722052571-qub1r08lrto5se910p0foeldqmkk4pc0.apps.googleusercontent.com",
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          style={styles.logo}
          source={require("../assets/images/logo.png")}
        />
        <ButtonForm
          buttonTitle="Google Sign-In"
          onPress={() =>
            onGoogleButtonPress().then(async () => {
              setLogin(true);
              console.log("Signed in with Google!");
            })
          }
        />
       
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        flex: 1,
        alignItems: "center",
    },
    wrapper: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 20,
        alignItems: "center",
    },
    logo: {
        height: 250,
        width: 250,
        resizeMode: "cover",
        marginTop: 100,
        marginBottom: 40,
    },
    navButton: {
        marginTop: 15,
    },
    navButtonText: {
        fontSize: 18,
        fontWeight: "500",
        color: "#2e64e5",
    },
})