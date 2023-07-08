import React from "react";
import {
  View,
  Text,
  StyleSheet,
} from "react-native";

export default function NodeChat({sender, chatContent, ...rest}) {
  return ( 
    <View style={styles.chatLineView} {...rest}>
      {sender != "you" ? <Text style={styles.itemUserName}>{sender}</Text>:null}
      <Text style={styles.itemText}>{chatContent}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  chatLineView: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    width: "auto",
    padding: 8,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
  },
  itemUserName: {
    color: "#3399ff",
    padding: 5,
    fontSize: 14,
  },
  itemText: {
    color: "black",
    padding: 5,
    fontSize: 14,
  },
});
