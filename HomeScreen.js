import React from 'react';
import { StyleSheet, TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { homeStyles, colors } from './Styles';
import { getDataModel } from './DataModel';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);

    this.dataModel = getDataModel();
    this.currentUser = this.props.route.params.currentUser;
    
    let allUsers = this.dataModel.getUsers();
    let otherUsers = [];
    for (let user of allUsers) {
      if (user.email !== this.currentUser.email) {
        otherUsers.push(user);
      }
    }

    this.state = {
      people: otherUsers
    }
  }

  render() {
    return (
      <View style={homeStyles.container}>
        <View style={homeStyles.profileContainer}>
          <Text style={homeStyles.displayName}>
            {this.currentUser.displayName}
          </Text>
          <Feather name="user" size={60} color="black" />
          <Text>
            "{this.currentUser.bio}"
          </Text>
          <Text>
            {this.currentUser.location}
          </Text>
        </View>
      </View>
    )
  }
}