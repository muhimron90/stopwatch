import React, { Component } from 'react';

import { BackHandler, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';

class HandleBack extends Component {
  constructor(props) {
    super(props);
    this.onBack = this.onBack.bind(this);
  }
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onBack);
  }
  onBack = () => {
    if(this.props.navigation.isFocused()){
      
      //  return this.props.onBack();
    Alert.alert(
   'Hey, wait a sec !!',
   'Are you sure want close this Apps?',
   [{
       text: 'Cancel',
        onPress: () => {},
       style: 'cancel',
     },
     {
       text: 'GoodBye',
       onPress: () => BackHandler.exitApp(),
     },
   ], {
     cancelable: false,
   }
 );
  
  return true;
    }
   return false;
 
  };
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onBack);
  }
  render() {
    return this.props.children;
  }
}

export default withNavigation(HandleBack);
