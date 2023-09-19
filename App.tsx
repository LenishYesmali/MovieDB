import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Homepage from './src/screens/homepage';
import MovieDetail from './src/screens/movie-detail';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Detail" component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
