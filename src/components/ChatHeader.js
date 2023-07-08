import { green } from '@material-ui/core/colors'
import React from 'react'
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import Entypo from "react-native-vector-icons/Entypo"

function ChatHeader({ setModalVisible }) {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => setModalVisible(false)}
            >
                <Text style={styles.buttonText}>Close
                </Text>

            </Pressable>
            <Text style={styles.heading}>Chat</Text>
            <Entypo name="bell" size={25} color="#efefef" />
        </View>
    )
}

export default ChatHeader
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: "#06F"
    },
    heading: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold"
    },
    buttonText: {
        color: "white",
        fontSize: 20
    }
})
