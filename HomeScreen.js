import React from 'react';
import { StyleSheet, TextInput, Text, View, 
  FlatList, TouchableOpacity, Alert } 
  from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { homeStyles, colors } from './Styles';
import { getDataModel } from './DataModel';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';

if (firebase.apps.length === 0) { // aka !firebase.apps.length
  firebase.initializeApp(firebaseConfig);
}

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
    // console.log(this.dataModel.usersRef.doc(this.currentUser.key));
    // console.log(this.currentUser.key);
  }
  

  // load in the data from Firebase
  getListInventory = async () => {
    // collection reference
    let movieGenresListRef = firebase.firestore()
      .collection('users')
      .doc(this.currentUser.key)
      .collection('movieGenresList');

    // load movie genres list into user profile
    let qSnap = await movieGenresListRef.get();
    qSnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.state.theList.push(data);
    });

    // update the app display with our appInventory list
    this.setState({
      theList: this.state.theList
    });
  }

  componentDidMount() {
    // load in data from Firebase upon component mount
    // because this is the HomeScreen this will only run one time, upon app load
    this.getListInventory();
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
  }

  componentWillUnmount() {
    this.focusUnsubscribe();
  }

  onFocus = () => {
    if (this.props.route.params) {
      const { operation, list } = this.props.route.params;
      // if the add button is pressed on HomeScreen
      if (operation === 'addMovieList') {
        // trigger addList function and add text from the list object (captured in the ListScreen JSX)
        this.addList(list.text);
        // if the edit button is pressed on HomeScreen
      } else if (operation === 'editMovieList') {
        // trigger updateList function and pass in the list object's key and text properties (captured in the ListScreen JSX)
        this.updateList(list.key, list.text);
      }
    }
    this.props.navigation.setParams({ operation: 'none' });
  }

  addList = async (listText) => {
    // this creates a list on the user's profile.
    // the intention for this project is that the list is a movie genre, e.g. "Horror Films"
    let movieGenresListRef = firebase.firestore()
      .collection('users')
      .doc(this.currentUser.key)
      .collection('movieGenresList');
    // sending our added list to firebase
    let addedMovieGenre = await movieGenresListRef.add({ text: listText });

    if (listText) { // false if undefined
      // updating our list with list text and a unique firebase ID
      this.state.theList.push({ text: listText, key: '' + addedMovieGenre.id });
    }
    // update list state for view
    this.setState({ theList: this.state.theList });
  }

  updateList = async (listKey, listText) => {
    
    // getting a document reference to a specific list
    let docRef = firebase.firestore()
      .collection('users')
      .doc(this.currentUser.key)
      .collection('movieGenresList')
      .doc(listKey);
    // updating the respective document with new text
    await docRef.update({ text: listText });

    // local in-app data //
    // grabbing theList (list of lists) in its current state
    let { theList } = this.state;
    let foundIndex = -1;
    for (let idx in theList) {
      // if the key matches the item the user has selected
      if (theList[idx].key === listKey) {
        // assign the foundIndex to that index
        foundIndex = idx;
        break;
      }
    }
    // if the foundIndex is not a placeholder, i.e. if it has an index value
    if (foundIndex !== -1) { // silently fail if item not found
      // update the list's text
      theList[foundIndex].text = listText;
    }
    this.setState({ theList: this.state.theList });
  }

  deleteList = async (listKey) => {
    // firebase //
    // access a document reference through the list key passed in
    let docRef = firebase.firestore()
      .collection('users')
      .doc(this.currentUser.key)
      .collection('movieGenresList')
      .doc(listKey);
    // delete that document
    await docRef.delete();

    // local in-app data //
    let { theList } = this.state;
    let foundIndex = -1;
    for (let idx in theList) {
      if (theList[idx].key === listKey) {
        foundIndex = idx;
        break;
      }
    }
    if (foundIndex !== -1) { // silently fail if item not found
      theList.splice(foundIndex, 1); // remove one element 
    }
    this.setState({ theList: this.state.theList });
  }

  onListDelete = (listKey) => {
    this.deleteList(listKey);
  }

  onListEdit = (list) => {
    this.props.navigation.navigate("Movie Lists", {
      operation: 'editMovieList',
      item: list,
      currentUser: this.currentUser
    });
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
                    You don't have any movie lists.
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
              this.props.navigation.navigate('Movie Lists',
                { operation: "addMovieList",
                  currentUser: this.currentUser
                  })}>
            <Ionicons name="ios-add"
              size={80}
              color={colors.primaryDark} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}