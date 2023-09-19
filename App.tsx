import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Homepage from './src/screens/homepage';
import Detailpage from './src/screens/detailpage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Detail" component={Detailpage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
