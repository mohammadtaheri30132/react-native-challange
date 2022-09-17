import React, {useContext, useEffect, useState} from 'react';
import {scale} from "react-native-size-matters";
import {ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {HeartIcon} from "./shared/SvgIcons";
import Stars from "./shared/Stars";
import axios from "axios";
import {useNavigation} from "@react-navigation/native";
import TrackPlayer from "react-native-track-player";
import {MusicContext} from "../context";


const MusicList = () => {

    const navigation = useNavigation();
    const [info, setInfo] = useContext(MusicContext);

    const [isLoading, setIsLoading] = useState(false)

    const getData = async () => {
        setIsLoading(true)
        const res = await axios.get('https://gitlab.com/dono-dev/react-native-code-challenge/-/raw/main/data/manifest.json')
        setInfo(res.data.data)
        setIsLoading(false)
    }



    const fav = (id) => {
        info.map((item, index) => {
            if (index === id) {
                info[index].fav = true;
            } else {
                info[index].fav = false;
            }
        })
        setInfo(info.slice());
    }

    const rate = (id, num) => {
        let myx = info.slice()
        let i = myx[id]
        i = {...i, rate: num}
        myx[id] = i
        setInfo(myx.slice())
        console.log(info)
    }

    const renderItem = ({item, index}) => {
        let faved = item?.fav
        return (
            <TouchableOpacity activeOpacity={.9}
                              onPress={() => navigation.navigate('Player', {id: index, rate: rate, fav: fav})}
                              style={styles.card}
                              key={index}>
                <TouchableOpacity onPress={() => fav(index)} activeOpacity={.9} style={styles.heart}>
                    <HeartIcon active={faved}/>
                </TouchableOpacity>
                <Image style={styles.image} resizeMode='cover'
                       source={{uri: item.cover}}/>
                <View style={styles.subCard}>
                    <Text style={{color: "#fff"}}>{item.title}</Text>
                    <Stars rate={rate} active={item.rate} id={index}/>
                </View>
            </TouchableOpacity>
        )
    }


    useEffect(() => {
        getData()

        async function player() {
            await TrackPlayer.setupPlayer();
        }

        player()
    }, [])



    return (
        <>
            <Text style={styles.title}>Music List</Text>
            {isLoading ? <ActivityIndicator size={"large"} color={'#fff'}/> :
                <FlatList
                    data={info.slice()}
                    keyExtractor={(item, index) => index}
                    ListFooterComponent={() => <View style={{height: scale(70)}}></View>}
                    decelerationRate={'normal'}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    renderItem={renderItem}
                />
            }
        </>
    );
};

export default MusicList;
const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#0e2338'
    },
    title: {
        fontSize: scale(20),
        color: 'white',
        marginBottom: scale(10),
    },

    card: {
        overflow: 'hidden',
        borderRadius: 10,
        marginBottom: scale(20)
    },
    subCard: {
        backgroundColor: '#1b344d',
        padding: scale(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    heart: {
        position: 'absolute',
        left: scale(10),
        zIndex: 9999,
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#fff',
        top: scale(10)
    },
    image: {
        width: '100%',
        height: scale(200)
    }
});
