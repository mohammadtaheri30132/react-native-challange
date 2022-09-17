import React from 'react';
import {StyleSheet} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {scale} from "react-native-size-matters";
import MusicList from "../components/MusicList";

const Home = () => {

    return (
        <SafeAreaView style={styles.safeArea}>
            <MusicList/>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0e2338',
        paddingHorizontal: scale(25),
        paddingVertical: scale(5)
    }
});
