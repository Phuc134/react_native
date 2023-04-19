import React, { memo, useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, SafeAreaView, Modal } from 'react-native';
import { io } from "socket.io-client"
import StartMeeting from '../components/StartMeeting';
import { Camera, CameraType } from 'expo-camera';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Icon from 'react-native-vector-icons/FontAwesome';
import Chat from '../components/Chat';
const menuIcons = [
    {
        id: 1,
        name: "microphone",
        title: "Mute",
        customColor: "#efefef"
    },
    {
        id: 2,
        name: "video-camera",
        title: "stop video",
        customColor: "#efefef"
    },
    {
        id: 3,
        name: "upload",
        title: "Share content",
        customColor: "#efefef"
    },
    {
        id: 4,
        name: "group",
        title: "Participants",
        customColor: "#efefef"
    },
]
function MeetingRoom() {
    const [name, setName] = useState();
    const [roomId, setRoomId] = useState();
    const [socket, setSocket] = useState();
    const [activeUsers, setActiveUsers] = useState([]);
    const [startCamera, setStartCamera] = useState(false);
    const [type, setType] = useState(CameraType.front);
    const [ModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // const _socket = io("link-");
        // setSocket(_socket);
        // _socket.on("all-users", users => {
        //     console.log("Active users");
        //     setActiveUsers(users);
        // })
    }, [])

    const __startCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log(status);
        if (status == "granted") {
            setStartCamera(true);
        } else {
            Alert.alert("Access denied");
        }

    }

    const joinRoom = () => {
        __startCamera();
        //socket.emit('join-room', { roomId: roomId, userName: name });
    }
}
return (
    <View style={styles.container}>
        {startCamera ? (
            <SafeAreaView style={{ flex: 1 }}>
                <Modal
                    animationType='slide'
                    transparent={false}
                    presentationStyle={"fullScreen"}
                    visible={ModalVisible}
                    onRequestClose={() => {

                        /* Alert.alert("Modal has been closed. ");*/
                        setModalVisible(!ModalVisible)
                    }}
                >
                    <Chat
                        ModalVisible={ModalVisible}
                        setModalVisible={setModalVisible}
                    />
                </Modal>
                <View style={styles.activeUsersContainer} >
                    <View style={styles.cameraContainer}>
                        <Camera type={CameraType.front} style={{
                            width: activeUsers.lenght <= 1 ? "100%" : 200,
                            height: activeUsers.lenght <= 1 ? 600 : 200
                        }} >
                        </Camera>
                    </View>
                </View>
                <View style={styles.menu}>
                    {menuIcons.map((icon, index) =>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={styles.tile}
                        >

                            <FontAwesome name={"comment"} size={24} color={"#efefef"} />
                            <Text style={styles.textTile}>Chat</Text>
                        </TouchableOpacity>
                    )}
                </View >
            </SafeAreaView>)
            : (
                <StartMeeting
                    name={name}
                    setName={setName}
                    roomId={roomId}
                    setRoomId={setRoomId}
                    joinRoom={joinRoom} />
            )}
    </View>
)
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
    },
    tile: {
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        width: 15
    },
    textTile: {
        color: "white",
        marginTop: 10
    },
    menu: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    cameraContainer: {
        flex: 1,
        backgroundColor: "black",
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center"

    },
    activeUsersContainer: {
        flex: 1,
        width: "100",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"

    },
    activeUserContainer: {
        boderColor: "gray",
        borderWidth: 1,
        height: 200,
        width: 200,
        justifyContent: "center",
        alignItems: "center"
    }

})