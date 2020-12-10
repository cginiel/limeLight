import React from 'react';
import { StyleSheet, TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert } 
  from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { peopleStyles, colors } from './Styles';
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
      <View style={peopleStyles.container}>
        <View style={peopleStyles.peopleListContainer}>
          <Text>
            You made it to the homescreen! Updates coming soon :)
          </Text>
          <FlatList
            ItemSeparatorComponent={()=>{
              return (
                <View style={peopleStyles.separator}/>
              );
            }}
            data={this.state.people}
            renderItem={({item})=> {
              return (
                <TouchableOpacity 
                  style={peopleStyles.personRow}
                  onPress={()=> {
                    this.props.navigation.navigate('Collection', {
                      currentUser: this.currentUser,
                      otherUser: item
                    });
                  }}
                >
                  <Text style={peopleStyles.personText}>{item.displayName}</Text>
                  <Ionicons name="ios-arrow-dropright" size={24} color="black"/>                
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    )
  }
}