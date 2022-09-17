import React, {useState} from 'react';

export const MusicContext = React.createContext();

const MusicProvider = ({children}) => {
    const [info, setInfo] = useState([]);

    return (
        <MusicContext.Provider value={[info, setInfo]}>
            {children}
        </MusicContext.Provider>
    )
}
export default MusicProvider
