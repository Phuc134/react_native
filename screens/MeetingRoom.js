import React, { useEffect, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, Text, Alert, SafeAreaView } from 'react-native';
import { View } from 'react-native';
import { io } from "socket.io-client"
import StartMeeting from '../components/StartMeeting';
import { Camera, CameraType } from 'expo-camera';
import FontAwesome from "react-native-vector-icons/FontAwesome";
function MeetingRoom() {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();
    const [socket, setSocket] = useState();
    const [activeUsers, setActiveUsers] = useState();
    const [startCamera, setStartCamera] = useState(false);
    useEffect(() => {
        const _socket = io("link-");
        setSocket(_socket);
        // _socket.on("all-users", users => {
        //     console.log("Active users");
        //     setActiveUsers(users);
        // })
    }, [])

    const __startCamera = async () => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status == "granted") {
            setStartCamera(true);
        } else {
            Alert.alert("Access denied");
        }

    }

    const joinRoom = () => {
        __startCamera();
        socket.emit('join-room', { roomId: roomId, userName: name });
    }
    return (
        <View style={styles.container}>
            {startCamera ? (
                <SafeAreaView>
                    <Camera type={"front"}
                        style={{ width: "100%", height: 600 }}></Camera>
                    <View style={styles.menu}>
                        <TouchableOpacity>
                            <FontAwesome name={"microphone"}
                                size={24} />
                        </TouchableOpacity>
                    </View>

                </SafeAreaView>
            ) : (

                <StartMeeting
                    name={name}
                    setName={setName}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    joinRoom={joinRoom} />
            )}

        </View>
    )
}

export default MeetingRoom;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1c1c1c",
        flex: 1,
    },
    info: {
        width: "100%",
        backgroundColor: "#373538",
        height: 50,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: "#484648",
        padding: 12,
        justifyContent: "center"
    },
    textInput: {
        color: "white",
        fontSize: 18,

    },
    startMeetingButton: {
        width: 350,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0470DC",
        height: 50,
        borderRadius: 15,
    }
})