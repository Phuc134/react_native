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
} from "react-native";
import ChatHeader from "../components/ChatHeader";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { getSocketInstance } from "../../socketClient";

function Chat({ setModalVisible, sender, room }) {
  const [listMessage, setListMessage] = useState([]);

  const [messageText, setMessageText] = useState();

  useEffect(() => {
    const testt = async () => {
      const socket = await getSocketInstance();
      socket.on("receive_message", ({ sender, messageText }) => {
        console.log(messageText);
        console.log("1");
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
              {/*Chat Messages*/}
              <View style={styles.chatMessages}>
                {listMessage.map((item, index) => {
                  return item.sender != sender ? (
                    <>
                      <Text style={styles.otherPeopleName}>{item.sender}:</Text>
                      <Text style={styles.otherPeopleMessage} key={index}>
                        {item.text}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.yourMessage}>
                      {item.text}
                    </Text>
                  );
                })}
              </View>
              {/*Type Messages */}
              <View style={styles.chatFormContainer}>
                <Text style={{ color: "white" }}>Send to: Everyone</Text>
                <View style={styles.chatForm}>
                  <TextInput
                    value={messageText}
                    onChangeText={(text) => setMessageText(text)}
                    style={styles.textInput}
                    placeholderTextColor="#D50000"
                    placeholder="Tap here to chat"
                  />
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
  chatFormContainer: {
    borderColor: "#2f2f2f",
    borderTopWidth: 1,
    padding: 12,
  },
  textInput: {
    height: 40,
    color: "#efefef",
    borderColor: "#595859",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    flex: 1,
  },
  chatForm: {
    flexDirection: "row",
  },
  button: {
    height: 40,
    width: 40,
    marginTop: 12,
    marginLeft: 12,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  chatMessages: {
    flex: 1,
  },
  yourMessage: {
    backgroundColor: "#0975D4",
    width: "auto",
    marginTop: 5,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 100,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    alignSelf: "flex-end",
  },
  otherPeopleName: {
    color: "white",
    marginLeft: 10,
    marginTop: 10,
  },
  otherPeopleMessage: {
    backgroundColor: "#868686",
    marginVertical: 5,
    marginRight: 100,
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    color: "#fff",
    textAlign: "left",
    alignSelf: "flex-start",
    float: "left",
  },
});
