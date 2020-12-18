import React, { Component } from 'react';
// import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { ListItem, SearchBar } from 'react-native-elements';
// import {
//     StyleSheet,
//     TouchableOpacity,
//     Image,
//     Alert,
//     ScrollView,
//   } from 'react-native';
import { withNavigation } from 'react-navigation';
import {
  StyleSheet, TextInput, Text, View,
  FlatList, TouchableOpacity, Alert, Image, ActivityIndicator
}
  from 'react-native';


// inspired by this Medium article https://medium.com/@vikrantnegi/how-to-build-a-react-native-flatlist-with-realtime-searching-ability-81ad100f6699

 export class SearchFriendsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
    };

    this.arrayholder = [];
  }

  componentDidMount() {
    
    const url = `https://randomuser.me/api/?&results=10`;
    this.setState({ loading: true });

    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.results,
          error: res.error || null,
          loading: false,
        });
        this.arrayholder = res.results;
      })
      .catch(error => {
        this.setState({ error, loading: false });
      });
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '85%',
          backgroundColor: '#68D48D',
          marginLeft: '14%',
        }}
      />
    );
  };

  searchFriends = text => {
    this.setState({
      value: text,
    });

    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.name.title.toUpperCase()} ${item.name.first.toUpperCase()} ${item.name.last.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData,
    });
  };

  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Search People..."
        lightTheme
        round
        onChangeText={text => this.searchFriends(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };

  render() {
    
    if (this.state.loading) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
    // <TouchableOpacity
    //     onPress={()=> {this.props.navigation.navigate("FriendDetail")}}
    // >
      <View style={styles.msgContainer}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <ListItem rightElement={() => (<View>
            <TouchableOpacity
        onPress={()=> {this.props.navigation.navigate("Friend Profile")}}
            >
              <View> Add Friend</View>
            </TouchableOpacity>
              </View>)}
            leftAvatar={{ source: { uri: item.picture.thumbnail } }}
            title={`${item.name.first} ${item.name.last}`}
            subtitle = 'Active'

            />
          )}
          
          keyExtractor={item => item.email}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader}
        />
      </View>
    
    );
  }
}



const styles = StyleSheet.create({
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: '#DCDCDC',
      backgroundColor: '#fff',
      borderBottomWidth: 1,
      padding: 10,
    },
    pic: {
      borderRadius: 30,
      width: 60,
      height: 60,
    },
    nameContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: 280,
    },
    nameTxt: {
      marginLeft: 15,
      fontWeight: '600',
      color: '#222',
      fontSize: 18,
      width:170,
    },
    mblTxt: {
      fontWeight: '200',
      color: '#777',
      fontSize: 13,
    },
    msgContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    msgTxt: {
      fontWeight: '400',
      color: '#008B8B',
      fontSize: 12,
      marginLeft: 15,
    },
  });