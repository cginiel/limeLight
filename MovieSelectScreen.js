import React from 'react';
import {
  StyleSheet, TextInput, Text, View,
  FlatList, TouchableOpacity, Alert
}
  from 'react-native';
import { movieSelect, colors } from './Styles';
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';

if (firebase.apps.length === 0) { // aka !firebase.apps.length
  firebase.initializeApp(firebaseConfig);
}

export class MovieSelectScreen extends React.Component {

  constructor(props) {
    super(props);

    this.operation = this.props.route.params.operation;
    
    this.moviesRef = firebase.firestore().collection('movies');

    this.loadMovies();

    this.state = {
      movies: [],
    }

  }

  loadMovies = async () => {
    // let moviesRef = firebase.firestore().collection('movies');
    let querySnap = await this.moviesRef.get();
    
    querySnap.forEach(qDocSnap => {
      let key = qDocSnap.id;
      let data = qDocSnap.data();
      data.key = key;
      this.state.movies.push(data);
    });

    this.setState({
      movies: this.state.movies
    });

  }
  render() {
    return (
      <View style={movieSelect.container}>
        <Text>Press an item to add it to your list.</Text>
        <View style={movieSelect.listContainer}>
          <FlatList
            data={this.state.movies}
            ItemSeparatorComponent={() => (
              <View style={movieSelect.separator}
              />
            )}
            renderItem={({ item }) => {
              return (
                <View style={movieSelect.listItemContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      let theMovie = {};
                      if (this.operation === 'addMovie') {
                        theMovie = {
                          title: item.title,
                          director: item.director,
                          year: item.year,
                          genre: item.genre,
                          key: item.key
                        }
                      } else {
                        theMovie = this.props.route.params.movie;
                      }
                      this.props.navigation.navigate('Movie Lists', {
                        operation: this.operation,
                        movie: theMovie
                      });
                    }}>
                    <View style={movieSelect.listItemTextContainer}>
                      <Text>
                        {item.title}
                      </Text>
                      <Text>
                        {item.director}
                      </Text>
                      <Text>
                        {item.year}
                      </Text>
                      <Text>
                        {item.description}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            }}
            ListEmptyComponent={() =>
              <View style={movieSelect.placeholderText}>
                <Text style={movieSelect.homescreenListEmpty}>
                  You don't have any movie lists.
                    </Text>
                <Text style={movieSelect.homescreenListEmpty}>
                  Tap "+" below to add one.
                    </Text>
              </View>
            }
          />
        </View>
      </View>
      
    );
  }
}