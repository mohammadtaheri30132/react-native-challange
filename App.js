/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  Text,
  View,

  Image,

} from 'react-native';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';

import {QueryClient, QueryClientProvider} from 'react-query';
import AnimatedSplash from 'react-native-animated-splash-screen';
import {ToastProvider} from 'react-native-toast-notifications';
import {
  ErrorWhite,
  Logo,
  SuccessWhite,
} from './application/components/shared/Icons';
import {scale} from 'react-native-size-matters';
import IntroScreen from './application/screens/Other/IntroScreen';
import UserProvider from './application/context';
import StackNavigator from './application/container/StackNavigator';
import AuthenticationState from './application/utils/AuthenticationState';
import {error_type, sucess_type} from './application/utils/TostMessage';


import ThemeProvider, {ThemeChangeContext} from './application/context/theme';
import {GestureHandlerRootView} from 'react-native-gesture-handler';



let App: () => React$Node = () => {
  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();


  const queryClient = new QueryClient({defaultOptions: {queries: {retry: 2}}});
  const [loading, setisloading] = React.useState(false);
  const [Authed, isAuthed] = React.useState(false);
  //INTETO SCREEN STATE
  const [inter, serintero] = React.useState(true);

  React.useEffect(() => {
    AuthenticationState().then(async e => {
      if (e.data == true) {
        isAuthed(true);
      } else {
        if (e.intro == null) {
          serintero(false);
        }
      }
      setTimeout(() => {
        setisloading(true);
      }, 1500);
    });
  }, [inter]);


  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <AnimatedSplash
        translucent={loading}
        isLoaded={loading}
        customComponent={<View style={{
          flex: 1,
          backgroundColor: '#fff',
          height: "100%",
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <View>
            <Image style={{width:300,height:300}} source={require('./application/assets/image/logomatn.png')} />
          </View>
        </View>
        }
        logoImage={require('./application/assets/image/logomatn.png')}
        backgroundColor='#fff' logoHeight={300} logoWidth={300}
      >
        {inter == false ? (
          <IntroScreen serintero={serintero} />
        ) : (
          <ToastProvider
            placement="top"
            duration={2500}
            textStyle={{fontSize: scale(14), fontFamily: 'Shabnam-FD'}}
            renderType={{
              error_type: toast => error_type(toast),
              sucess_type: toast => sucess_type(toast),
            }}>
            <NavigationContainer
              ref={navigationRef}

              fallback={<Text>Loading...</Text>}
              onReady={() => {
                routeNameRef.current =
                  navigationRef.current.getCurrentRoute().name;
              }}
              onStateChange={async () => {
                const previousRouteName = routeNameRef.current;
                const currentRouteName =
                  navigationRef.current.getCurrentRoute().name;

                if (previousRouteName !== currentRouteName) {
                }
                routeNameRef.current = currentRouteName;
              }}>
              <QueryClientProvider client={queryClient}>
                <UserProvider>
                  <ThemeProvider>
                    <StackNavigator Authed={Authed} inter={inter} />

                  </ThemeProvider>
                </UserProvider>
              </QueryClientProvider>
            </NavigationContainer>
          </ToastProvider>
        )}
      </AnimatedSplash>
    </GestureHandlerRootView>
  );
};
export default App;
