import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import Icon from "react-native-vector-icons/FontAwesome"

export default function LoginPage({ navigation, route }) {
    const { setLogin, setUser } = route.params;

    async function onGoogleButtonPress() {
        // Check if your device supports Google Play
        await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
        // Get the users ID token
        const userInfo = await GoogleSignin.signIn();
        const { idToken } = userInfo
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: '534722052571-qub1r08lrto5se910p0foeldqmkk4pc0.apps.googleusercontent.com',
        });
    }, [])

    return (
        <>
            <Button
                title="Google Sign-In"
                onPress={() => onGoogleButtonPress().then(async () => {
                    setLogin(true);

                    console.log('Signed in with Google!')
                })}
            />

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
