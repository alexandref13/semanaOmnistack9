import React from 'react';
import { YellowBox } from "react-native";
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
])

export default function navinext() {
  return (
    <NavigationContainer>
      <Routes />
    </NavigationContainer>
  );
}