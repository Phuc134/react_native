import { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import InputForm from "../components/InputForm";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import ButtonForm from "../components/ButtonForm";

function HomePage({ navigation, route }) {
  const [roomCode, setRoomCode] = useState("");
  const { setLogin } = route.params;
  const signOut = async () => {
    console.log("da sign out");
    await GoogleSignin.signOut();
    setUser(null);
    setLogin(false);
  };
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const user = await GoogleSignin.getCurrentUser();
    setUser(user);
  };
  return (
    // <View style={styles.container}>
    //     <Text style={styles.userName}>Username: </Text>
    //     <TextInput style={styles.input} value={userName} onChangeText={newValue => setUsername(newValue)} />
    //     <Button onPress={() => navigation.navigate('VideoCallPage', {
    //         userName, user
    //     })} title="Join Call" />
    //     <Button onPress={signOut} title="Sign out" />

    // </View>
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />
      <View style={styles.wrapper}>
        <InputForm
          labelValue={roomCode}
          onChangeText={(newValue) =>
            setRoomCode(newValue)
          }
          autoCapitalize="none"
          autoCorrect={false}
          placeholderText="Input room code"
          iconType="people"
        />
        <ButtonForm
          buttonTitle="Join call"
          onPress={() =>
            navigation.navigate("VideoCallPage", {
              roomCode,
              user,
            })
          }
        />
        <ButtonForm buttonTitle="Sign out" onPress={signOut} />
      </View>
    </SafeAreaView>
  );
}
export default HomePage;

const styles = {
  container: {
    backgroundColor: "#fff",
    innerHeight: 300,
    flex: 1,
    alignItems: "center",
  },
  logo: {
    height: 250,
    width: 250,
    resizeMode: "cover",
    marginTop: 50,
    marginBottom: 20,
  },
  wrapper: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 20,
    color: "#051d5f",
  },
};
