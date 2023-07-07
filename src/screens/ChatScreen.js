import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Platform,
  Keyboard,
  ImageBackground,
  FlatList,
} from "react-native";
import ChatHeader from "../components/ChatHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getSocketInstance } from "../../socketClient";
import NodeChat from "../components/NoteChat";
import InputForm from "../components/InputForm";

function Chat({ setModalVisible, sender, room, listMessage , setListMessage, messageText, setMessageText}) {


  useEffect(() => {
    const testt = async () => {
      const socket = await getSocketInstance();
      socket.on("receive_message", ({ sender, messageText }) => {
        setListMessage((prevList) => [
          ...prevList,
          { sender, text: messageText },
        ]);
      });
    };
    testt();
  }, []);
  const addMessage = async () => {
    try {
      setMessageText("");
      const socket = await getSocketInstance();
      socket.emit("send_message", { room, sender, messageText });
      setListMessage((prevList) => [
        ...prevList,
        { sender, text: messageText },
      ]);
    } catch (e) {
      console.log(e);
    }
  };

  const renderChatLine = (item) => (
    item.sender == sender ? (
      <View style={{ alignItems: "flex-end" }}>
        <NodeChat sender="you" chatContent={item.text} />
      </View>
    ) : (
      <View style={{ alignItems: "flex-start" }}>
      <NodeChat sender={sender} chatContent={item.text} />
    </View>
    )
  );

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ height: "100%" }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{ flex: 1 }}>
              <ChatHeader setModalVisible={setModalVisible} />
              <SafeAreaView style={styles.mainChat}>
                <ImageBackground
                  imageStyle={{ opacity: 0.4 }}
                  source={require("../assets/images/background.jpg")}
                  style={styles.imgBackground}
                >
                  <FlatList
                    data={listMessage}
                    renderItem={({ item }) => renderChatLine(item)}
                    keyExtractor={item => item.id}
                  />
                </ImageBackground>
                <View style={{ flex: 1 / 10 }}>
                  <View style={styles.chatTextboxView}>
                    <View style={{ flex: 85 / 100 }}>
                      <TextInput
                        placeholder="Typing..."
                        value={messageText}
                        autoCapitalize="sentences"
                        autoCorrect={false}
                        onChangeText={(text) => setMessageText(text)}
                      />
                    </View>
                    <View style={{ flex: 15 / 100 }}>
                      <TouchableOpacity
                        onPress={addMessage}
                        style={{
                          ...styles.button,
                          backgroundColor: messageText ? "#0B71EB" : "#373838",
                        }}
                      >
                        <FontAwesome name={"send"} size={18} color="#efefef" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </SafeAreaView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

export default Chat;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c1c1c",
  },
  chatTextboxView: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    width: "100%",
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: 5,
  },
  imgBackground: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    flexDirection: "column",
    justifyContent: "center",
  },
  chatForm: {
    flexDirection: "row",
  },
  button: {
    height: 40,
    width: 40,
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  mainChat: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
  },
});