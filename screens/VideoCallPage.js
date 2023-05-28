import React, { Component, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text, Alert, SafeAreaView, Modal } from 'react-native';
import ZegoUIKitPrebuiltVideoConference from '@zegocloud/zego-uikit-prebuilt-video-conference-rn'
import { ZegoMenuBarButtonName } from '@zegocloud/zego-uikit-prebuilt-video-conference-rn'
import Chat from '../components/Chat';
import { Stack, IconButton } from "@react-native-material/core";
import Icon from "@expo/vector-icons/Entypo";
import { io } from 'socket.io-client';
import { getSocketInstance } from '../socketClient';

export default function VideoCallPage({ route, navigation }) {
    const { userName, user } = route.params;
    const [ModalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
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
                    room={userName}
                    sender={user.user.name}
                    ModalVisible={ModalVisible}
                    setModalVisible={setModalVisible}
                />
            </Modal>
            <ZegoUIKitPrebuiltVideoConference
                appID={1488627741}
                appSign={"a7d127538ab7ee88caa70573acf0b1b911d0afda50b7e7fc9d739a19263860c2"}
                userID={user.user.id} // userID can be something like a phone number or the user id on your own user system. 
                userName={user.user.name}
                conferenceID={userName} // conferenceID can be any unique string. 
                config={{
                    onLeave: () => { navigation.navigate('HomePage') },
                    bottomMenuBarConfig: {
                        maxCount: 5,
                        buttons: [
                            ZegoMenuBarButtonName.toggleCameraButton,
                            ZegoMenuBarButtonName.toggleMicrophoneButton,
                            ZegoMenuBarButtonName.switchAudioOutputButton,
                            ZegoMenuBarButtonName.leaveButton,
                            ZegoMenuBarButtonName.switchCameraButton,
                        ],
                        extendButtons: [
                            <IconButton color='white' onPress={() => setModalVisible(!ModalVisible)
                            } icon={props => <Icon name="chat" {...props} />} />
                        ]
                    }
                }}

            />
        </View>
    );
}

const styles = {
    container: {
        flex: 1
    }
}