/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {QueryClient, QueryClientProvider} from 'react-query';

import SplashScreen from "./application/screens/SplashScreen";
import AppNavigator from "./application/container/AppNavigator";
import MusicProvider from "./application/context";


const App: () => React$Node = () => {

    const queryClient = new QueryClient({defaultOptions: {queries: {retry: 2}}})


    return (
        <SplashScreen>
            <QueryClientProvider client={queryClient}>
                <MusicProvider>
                    <AppNavigator/>
                </MusicProvider>
            </QueryClientProvider>
        </SplashScreen>

    );
};
export default App;
