/**
 * @format
 */

import {AppRegistry, I18nManager} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

I18nManager.allowRTL(false);
AppRegistry.registerComponent(appName, () => App);
