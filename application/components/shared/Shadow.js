import React from 'react';
import DropShadow from "react-native-drop-shadow";

const Shadow = ({shadowColor= "#000",shadowOpacity=1,shadowRadius=5}) => {
    return (
        <DropShadow
            style={{
                shadowColor: shadowColor,
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity,
                shadowRadius,
            }}
        >
        </DropShadow>
    );
};

export default Shadow;
