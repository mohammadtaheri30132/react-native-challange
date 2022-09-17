import React from 'react';
import {StyleSheet, TouchableOpacity, View} from "react-native";
import {StarCommentIcon} from "./SvgIcons";

const Stars = ({rate,active=-1,id}) => {
    return (
        <View style={styles.boxStar}>


            {[1,2,3,4,5].map((item, index) =>{
                    return (<TouchableOpacity key={index} onPress={()=>rate(id,index)}>
                        <StarCommentIcon  width={15} height={15} back={index <= active?false:true}/>
                    </TouchableOpacity>)
                }


            )}
        </View>
    );
};

export default Stars;

const styles = StyleSheet.create({
    boxStar: {
        flexDirection: 'row',
        alignItems: 'center',
    },
})
