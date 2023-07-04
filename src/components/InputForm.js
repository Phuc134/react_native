import React from "react"
import { View, TextInput, StyleSheet } from "react-native"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { windowWidth, windowHeight } from "../utils/Dimensions"

export default function InputForm({ labelValue, placeholderText, iconType, ...rest }) {
    return (
        <View style={styles.inputContainer}>
            <View style={styles.iconStyle}>
                <MaterialIcons
                    name={iconType}
                    size={26}
                    color="#666" />
            </View>
            <TextInput
                style={styles.input}
                value={labelValue}
                numberOfLines={1}
                placeholder={placeholderText}
                placeholderTextColor="#866"
                {...rest} />
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 5,
        marginBottom: 5,
        width: "100%",
        height: windowHeight / 15,
        borderColor: "#ccc",
        borderRadius: 3,
        borderWidth: 1,
        flexDirection: "row",
        backgroundColor: "#fff",
    },
    iconStyle: {
        padding: 10,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        borderRightColor: "#ccc",
        borderRightWidth: 1,
        width: 50,
    },
    input: {
        padding: 10,
        flex: 1,
        fontSize: 16,
        color: "#333",
        justifyContent: "center",
        alignItems: "center",
    },
    inputField: {
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        width: windowWidth / 1.5,
        height: windowHeight / 15,
        fontSize: 16,
        borderRadius: 8,
        borderWidth: 1,
    }
})
