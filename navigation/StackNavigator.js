
import React from 'react';
import {
    Platform
} from 'react-native';
import {
    createAppContainer,
    createStackNavigator,
 
    createSwitchNavigator,
  
} from 'react-navigation';
import Home from '../screens/Pages/Home';
import About from '../screens/Pages/About';
import AboutWeb from '../screens/Pages/AboutWeb';
const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});
const HomeNavigator = createStackNavigator({
    HomeStack : Home,
    AboutStack : {screen : About},
    AboutWeb : {screen :  AboutWeb}
    
}, {
    initialRouteName: 'HomeStack',
     animationEnabled: false,
         swipeEnabled: false,
         mode : 'modal'
},
config);

HomeNavigator.navigationOptions ={

}

HomeNavigator.path='';

const router = createSwitchNavigator ({
    main: HomeNavigator
})

const myRouter = createAppContainer(router)
export default myRouter;
