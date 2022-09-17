import React, {useEffect,useState} from 'react';
import {Image, StyleSheet, View} from "react-native";
import {scale} from "react-native-size-matters"
import AnimatedSplash from "react-native-animated-splash-screen";


const SplashView = () => (
    <View style={styles.main}>
        <View>
            <Image style={styles.image}
                   source={require('../assets/image/welcome.png')}/>
        </View>
    </View>
)

const SplashScreen = ({children}) => {

    const [splash, setSplash] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setSplash(true)
        }, 1500)
    }, []);

    return (
        <AnimatedSplash
            translucent={splash}
            isLoaded={splash}
            customComponent={<SplashView/>}
            backgroundColor='#0e2338'
            logoHeight={300} logoWidth={300}
        >
            {children}
        </AnimatedSplash>
    );
};

export default SplashScreen;

const styles = StyleSheet.create({
    image: {
        width: scale(300),
        height: scale(300)
    },
    main: {
        flex: 1,
        height: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    }
});
