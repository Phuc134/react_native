import { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";

function HomePage({ navigation }) {
    const [userName, setUsername] = useState('');
    return (
        <View style={styles.container}>
            <Text style={styles.userName}>Username: </Text>
            <TextInput style={styles.input} value={userName} onChangeText={newValue => setUsername(newValue)} />
            <Button onPress={() => navigation.navigate('VideoCallPage', {
                userName
            })} title="Join Call" />

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