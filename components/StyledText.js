import React from 'react';
import { Text } from 'react-native';

function MonoText(props) {
  return (
    <Text {...props} style={[props.style, { fontFamily: 'space-mono' }]} />
  );
}
function Airfly(props) {
  return (
    <Text {...props} style={[props.style, {fontFamily: 'airfly'} ]} />
  );
}
function LatoText(props) {
   return (
    <Text {...props} style={[props.style, {fontFamily: 'lato'} ]} />
  );
}
export {MonoText, Airfly ,LatoText};