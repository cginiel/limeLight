import React from 'react';
import {
  StyleSheet, TextInput, Text, View,
  FlatList, TouchableOpacity, Alert, Image
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
    this.imageWidth = 75,
      this.imageHeight = 100;

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
        <Text style={movieSelect.header}>Press an item to add a movie to your list.</Text>
        <View style={movieSelect.listContainer}>
          <FlatList style={styles.list}
            data={this.state.movies}
            ItemSeparatorComponent={() => (
              <View style={styles.separator}
              />
            )}
            renderItem={({ item }) => {
              return (
                <View style={styles.listItemContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      let theMovie = {};
                      if (this.operation === 'addMovie') {
                        theMovie = {
                          title: item.title,
                          director: item.director,
                          year: item.year,
                          genre: item.genre,
                          key: item.key,
                          imageURL: item.imageURL
                        }
                      } else {
                        theMovie = this.props.route.params.movie;
                      }
                      this.props.navigation.navigate('Movie Lists', {
                        operation: this.operation,
                        movie: theMovie
                      });
                    }}>
                    <View style={styles.listItemTextContainer}>
                      <Image
                        style={{ width: this.imageWidth, height: this.imageHeight }}
                        source={{ uri: item.imageURL }}
                      />
                      <Text style={styles.title} >
                        {item.title}
                      </Text>
                      <Text style={styles.director}>
                        Director: {item.director}
                      </Text>
                      <Text style={styles.year}>
                        Release Year: {item.year}
                      </Text>
                      <Text style={styles.description}>
                        Description: {item.description}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },

  list: {
    paddingHorizontal: 17,
    backgroundColor:"#68D48D",
  },
  separator: {
    marginTop: 10,
  },
  /******** movie card **************/
  listItemContainer:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 2
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginVertical: 8,
    backgroundColor:"white"
  },
  listItemTextContainer: {
    paddingVertical: 17,
    paddingHorizontal: 16,
    borderTopLeftRadius: 1,
    borderTopRightRadius: 1,
    // flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
//  Image:{
//     flex: 1,
//     height: 150,
//     width: null,
//   },
  /******** movie components **************/
  title:{
    fontSize:18,
    flex:1,
  }, 
  description:{
    fontSize:15,
    color:"#888",
    flex:1,
    marginTop:5,
    marginBottom:5,
    flexDirection: 'row',
  },
  director:{
    fontSize:13,
    color: "#808080",
    marginTop: 5,
    flexDirection: 'column',
  },
  year:{
    fontSize:13,
    color: "#808080",
    marginTop: 5,
    flexDirection: 'column',
  },
 
  // iconData:{
  //   width:15,
  //   height:15,
  //   marginTop:5,
  //   marginRight:5
  // },

});  
