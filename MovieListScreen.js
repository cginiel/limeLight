import React from 'react';
import {
  StyleSheet, TextInput, Text, View,
  FlatList, TouchableOpacity, Alert
}
  from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { movieListStyles, colors } from './Styles';
import { getDataModel } from './DataModel';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';

if (firebase.apps.length === 0) { // aka !firebase.apps.length
  firebase.initializeApp(firebaseConfig);
}

export class MovieListScreen extends React.Component {

  constructor(props) {
    super(props);

    this.operation = this.props.route.params.operation;
    // this.theList contains our list objects
    this.theList = this.props.route.params.item;
    this.currentUser = this.props.route.params.currentUser;

    let initText = '';
    // if you press the edit button on HomeScreen
    if (this.operation === 'editMovieList') {
      // the text displayed is what was stored
      initText = this.props.route.params.item.text;
    };

    this.state = {
      // list name goes to inputtext
      inputText: initText,
      // items list goes to itemsList
      itemsList: []
    };

  }

  getItemInventory = async () => {
    // gets a query snapshot of our itemsCollection
    let qSnap = await firebase.firestore()
    .collection('users')
    .doc(this.currentUser.key)
    .collection('movieGenresList')
    .doc(this.theList.key)
    .collection('movies')
    .get();
    // loops through the items and assigns key/value pairs
    // then pushes information from firebase into the local app memory
    qSnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.state.itemsList.push(data);
    });


    // update the app display with our appInventory list
    this.setState({
      itemsList: this.state.itemsList
    });
  }

  componentDidMount() {
    this.getItemInventory();
    this.focusUnsubscribe = this.props.navigation.addListener('focus', this.onFocus);
  }

  componentWillUnmount() {
    this.focusUnsubscribe();
  }

  onFocus = () => {
    if (this.props.route.params) {
      console.log("PARAMS: ", this.props.route.params);
      const { operation, item, movie } = this.props.route.params;
      // if user presses the add button on ListScreen
      if (operation === 'addMovie') {
        // trigger addItem function and pass in the text property of that item (found in the AddItemsScreen JSX)
        this.addItem(item, movie);
        // if user presses the item text (which is how we will edit an item in this case)
      } else if (operation === 'editItems') {
        // trigger editItems function and pass in the item's text and key properties (found in the AddItemsScreen JSX)
        this.updateItem(item.key, item.text);
      }
    }
    this.props.navigation.setParams({ operation: 'none' });
  }

  addItem = async (item, movie) => {
    console.log("ITEM IN ADDITEM: ", item);
    let itemsRef = firebase.firestore()
      .collection('users')
      .doc(this.currentUser.key)
      .collection('movieGenresList')
      .doc(item.key)
      .collection('movies')

    let addedItem = await itemsRef.add({ 
      title: movie.title,
      director: movie.director,
      year: movie.year,
      genre: movie.genre,
    });

    if (item) { // false if undefined
      this.state.itemsList.push({
        title: movie.title,
        director: movie.director,
        year: movie.year,
        genre: movie.genre,
        key: '' + addedItem.id });
    }
    this.setState({ itemsList: this.state.itemsList });
  }

  updateItem = async (itemKey, itemText) => {
    // firebase data //
    // getting a document referencing using the items key that was passed in
    let itemsDocRef = db.collection('listCollection')
      .doc(this.theList.key)
      .collection('itemsCollection')
      .doc(itemKey);
    // updating the respective document with new text
    await itemsDocRef.update({ text: itemText });

    // local in-app data //
    // grabbing itemsList (list of items) in its current state
    let { itemsList } = this.state;
    let foundIndex = -1;
    for (let idx in itemsList) {
      // if the key matches the item the user has selected
      if (itemsList[idx].key === itemKey) {
        // assign the foundIndex to that index
        foundIndex = idx;
        break;
      }
    }
    // if the foundIndex is not a placeholder, i.e. if it has an index value
    if (foundIndex !== -1) { // silently fail if item not found
      // update the item's text
      itemsList[foundIndex].text = itemText;
    }
    this.setState({ itemsList: this.state.itemsList });
  }

  deleteItem = async (itemKey) => {
    // firebase //
    // access a document reference through the item key passed in
    let itemsDocRef = firebase.firestore()
      .collection('users')
      .doc(this.currentUser.key)
      .collection('movieGenresList')
      .doc(this.theList.key)
      .collection('movies')
      .doc(itemKey);
    // delete that document
    await itemsDocRef.delete();

    // local in-app data //
    let { itemsList } = this.state;
    let foundIndex = -1;
    for (let idx in itemsList) {
      if (itemsList[idx].key === itemKey) {
        foundIndex = idx;
        break;
      }
    }
    if (foundIndex !== -1) { // silently fail if item not found
      itemsList.splice(foundIndex, 1); // remove one element 
    }
    this.setState({ itemsList: this.state.itemsList });
  }

  onItemDelete = (itemKey) => {
    this.deleteItem(itemKey);
  }

  onItemEdit = (item) => {
    this.props.navigation.navigate("AddItems", {
      operation: 'editItems',
      item: item
    });
  }

  // this function is inspired by
  // https://stackoverflow.com/questions/56983506/react-native-how-to-render-check-box-inside-flatlist
  // handleItemCheck = async (item, i) => {
  //   let items = this.state.itemsList;
  //   items[i].checked = items[i].checked ? !items[i].checked : true;

  //   this.setState({
  //     itemsList: items
  //   });

  //   // update firebase
  //   let itemsDocRef = db.collection('listCollection')
  //     .doc(this.theList.key)
  //     .collection('itemsCollection')
  //     .doc(items[i].key);

  //   await itemsDocRef.update({ checked: items[i].checked });
  // }

  // makeUncheckedList = () => {
  //   let items = this.state.itemsList;
  //   let uncheckedItemsList = [];
  //   for (let item of items) {
  //     if (item.checked === false) {
  //       uncheckedItemsList.push(item);
  //     }
  //   }
  //   return uncheckedItemsList;
  // }

  // if the switch is activated, update the list to show all items
  // handleShowCompleted = (value) => {
  //   let status = false;

  //   if (value) {
  //     status = true;
  //   } else {
  //     status = false;
  //   }

  //   this.setState({
  //     switchValue: status,
  //   });
  // }

  render() {
    return (
      <View style={movieListStyles.container}>
        <View style={movieListStyles.body}>
          <View style={movieListStyles.textInputContainer}>
            <Text style={movieListStyles.textInputLabel}>Movie list name:</Text>
            <TextInput
              placeholder='Enter list text'
              style={movieListStyles.textInputBox}
              onChangeText={(text) => this.setState({ inputText: text })}
              value={this.state.inputText}
            />
          </View>
          <View style={movieListStyles.listOfItemsContainer}>
            <FlatList
              data={this.state.itemsList}
              renderItem={({ item, index }) => {
                return (
                  <View style={movieListStyles.ItemContainer}>
                    <View style={movieListStyles.ItemTextContainer}>
                      {/* edit item button */}
                      <TouchableOpacity
                        onPress={() => { this.onItemEdit(item) }}>
                        <Text
                          style={movieListStyles.ItemText}
                          numberOfLines={1}
                          ellipsizeMode='tail'
                        >
                          {item.text}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View style={movieListStyles.ItemButtonContainer}>
                      {/* delete item button */}
                      <Ionicons name="md-trash"
                        size={24}
                        color={colors.primaryDark}
                        onPress={() => { this.onItemDelete(item.key) }} />
                    </View>
                  </View>
                );
              }}
              ListEmptyComponent={() =>
                <View style={movieListStyles.placeholderText}>
                  <Text style={movieListStyles.listscreenListEmpty}>Your list doesn't have any movies.</Text>
                  <Text style={movieListStyles.listscreenListEmpty}>Tap "+" below to add one.</Text>
                </View>
              }
            />
          </View>
        </View>
        <View style={movieListStyles.footer}>
          <View>
            {/* add items and navigate to MovieSelectScreen */}
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('Select Movie',
                  { operation: "addMovie" })}>
              <Ionicons name="ios-add"
                size={80}
                color={colors.primaryDark} />
            </TouchableOpacity>
          </View>
          <View style={movieListStyles.footerButtonContainer}>

            {/* cancel button */}
            <TouchableOpacity
              style={movieListStyles.footerButton}
              onPress={() => { this.props.navigation.navigate("Home") }}>
              <Text style={movieListStyles.footerButtonText}>Cancel</Text>
            </TouchableOpacity>
            {/* save button */}
            <TouchableOpacity
              style={movieListStyles.footerButton}
              onPress={() => {
                let theList = {};
                if (this.operation === 'addMovieList') {
                  theList = {
                    text: this.state.inputText,
                    key: -1 // placeholder for "no ID"
                  }
                } else { // operation === 'editMovieList'
                  theList = this.props.route.params.item;
                  theList.text = this.state.inputText;
                }
                this.props.navigation.navigate("Home", {
                  operation: this.operation,
                  list: theList
                });
              }}>
              <Text style={movieListStyles.footerButtonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}