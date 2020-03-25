import React from 'react';
import MovieList from './components/list';
import Detail from './components/detail';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './assets/fontawesome';

const AppNavigator = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator>
        <AppNavigator.Screen name="MovieList" component={MovieList} />
        <AppNavigator.Screen name="Detail" component={Detail} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}

export default App;
