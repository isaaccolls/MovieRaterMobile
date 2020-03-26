import React from 'react';
import Auth from './components/auth';
import MovieList from './components/list';
import Detail from './components/detail';
import Edit from './components/edit';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import './assets/fontawesome';

const AppNavigator = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <AppNavigator.Navigator>
        <AppNavigator.Screen name="Auth" component={Auth} />
        <AppNavigator.Screen name="MovieList" component={MovieList} />
        <AppNavigator.Screen name="Detail" component={Detail} />
        <AppNavigator.Screen name="Edit" component={Edit} />
      </AppNavigator.Navigator>
    </NavigationContainer>
  );
}

export default App;
