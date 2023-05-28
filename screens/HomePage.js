import { useEffect, useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { GoogleSignin } from '@react-native-google-signin/google-signin';

function HomePage({ navigation, route }) {
    const [userName, setUsername] = useState('');
    const { setLogin } = route.params;
    const signOut = async () => {
        console.log('da sign out');
        await GoogleSignin.signOut();
        setUser(null);
        setLogin(false);
    }
    const [user, setUser] = useState(null);
    useEffect(() => {
        getUser();

    }, [])
    const getUser = async () => {
        const user = await GoogleSignin.getCurrentUser();
        setUser(user);
    }
    return (
        <View style={styles.container}>
            <Text style={styles.userName}>Username: </Text>
            <TextInput style={styles.input} value={userName} onChangeText={newValue => setUsername(newValue)} />
            <Button onPress={() => navigation.navigate('VideoCallPage', {
                userName, user
            })} title="Join Call" />
            <Button onPress={signOut} title="Sign out" />

        </View>
    )
}
export default HomePage;

const styles = {
    container: {
        flex: 1,
        padding: 20,
    },
    userName: {
        fontWeight: 'bold',
        marginTop: 100
    },
    input: {
        borderWidth: 1,
        marginTop: 10,
        fontSize: 30
    },

}