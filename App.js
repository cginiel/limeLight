import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { LoginScreen } from './LoginScreen';
import { HomeScreen } from './HomeScreen';
import { MovieListScreen } from './MovieListScreen';
import { MovieSelectScreen } from './MovieSelectScreen';
// import { ProductView } from './FriendDetail';
// import { ChatScreen } from './ChatScreen';
// import { CameraScreen } from './CameraScreen';
import { SearchFriendsScreen } from './SearchableList';
import {FriendProfileScreen} from './FriendDetail';
import {FriendsListScreen} from './FriendsList';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: true
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Movie Lists" component={MovieListScreen} />
        <Stack.Screen name="Select Movie" component={MovieSelectScreen} />
        {/* <Stack.Screen name="Friend Detail" component={FriendDetail} /> */}
        {/* <Stack.Screen name="Chat" component={ChatScreen} /> */}
        {/* <Stack.Screen name="Camera" component={CameraScreen} /> */}
        <Stack.Screen name="Search People" component={SearchFriendsScreen} />
        <Stack.Screen name= "Friend Profile" component={FriendProfileScreen} />
        <Stack.Screen name= "Friend List" component={FriendsListScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;