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

    this.nextKey = 0;
    this.state = {
      people: otherUsers,
      theList: []
    }
  }

  render() {
    return (
      <View style={homeStyles.container}>
        {/* user profile */}
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
        <View style={homeStyles.body}>
          <View style={homeStyles.listContainer}>
            {/* movies lists */}
            <FlatList
              data={this.state.theList}
              ItemSeparatorComponent={() => (
                <View style={homeStyles.separator}
                />
              )}
              renderItem={({ item }) => {
                return (
                  <View style={homeStyles.listItemContainer}>
                    <View style={homeStyles.listItemTextContainer}>
                      {/* edit list button */}
                      <Feather name="list"
                        size={24}
                        color={colors.primaryDark}
                        onPress={() => { this.onListEdit(item) }} />
                      <Text
                        style={homeStyles.listItemText}
                        numberOfLines={1}
                        ellipsizeMode='tail'>
                        {item.text}
                      </Text>
                    </View>
                    <View style={homeStyles.listItemButtonContainer}>
                      {/* delete list button */}
                      <Ionicons name="md-trash"
                        size={24}
                        color={colors.primaryDark}
                        onPress={() => { this.onListDelete(item.key) }} />
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={() =>
                <View style={homeStyles.placeholderText}>
                  <Text style={homeStyles.homescreenListEmpty}>
                    You don't have any lists.
                    </Text>
                  <Text style={homeStyles.homescreenListEmpty}>
                    Tap "+" below to add one.
                    </Text>
                </View>
              }
            />
          </View>
        </View>
        <View style={homeStyles.footer}>
          {/* add list button */}
          <TouchableOpacity
            onPress={() =>
              this.props.navigation.navigate('MovieList',
                { operation: "addMovieList" })}>
            <Ionicons name="md-add-circle"
              size={80}
              color={colors.primaryDark} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}