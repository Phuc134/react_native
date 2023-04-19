import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import Header from "../components/Header";
import SearcBar from "../components/SearcBar";
import MenuButtons from "../components/MenuButton";
import ContactsMenu from "../components/ContactsMenu";

function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <SafeAreaView style={{ height: '100%' }}>
                <Header />
                <SearcBar />
                <MenuButtons navigation={navigation} />
                <ContactsMenu />
            </SafeAreaView>
        </View>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1c1c1c",
        padding: 15,
    },

})