import React from 'react';
import {scale} from "react-native-size-matters";
import ROW from "./ROW";

const Br = ({w='100%',mt,mb, bg='#dedede', h=scale(.7)}) => {
    return (
        <ROW w={w} h={h} mt={mt} mb={mb} bg={bg}></ROW>
    );
};

export default Br;
