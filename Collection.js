import React from "react";
import {View,Text,FlatList,Image,TouchableOpacity,Modal} from "react-native";
import { Overlay, ButtonGroup, SearchBar, Button } from "react-native-elements";
import { styles } from "./Styles";
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';
import Icon from "react-native-vector-icons/FontAwesome";

export class Collection extends React.Component {
  constructor(props) {
    super(props);

    this.collectionID = this.props.navigation.getParam("collectionID");
    this.state = {
      user: [],
    //   Index: 0,
      movies: [],
      arrayholder: [], 
      isModalVisible: false,
      genreTags: [],
    };
    this.navigatePage = "";
    this.db = firebase.firestore();

    // get colletion from the database and store in the state 
    this.userRef = this.db.collection("users").doc(this.collectionID);

    this.userRef.get().then(queryRef => {
      let mediaData = queryRef.data();
      let newUser = {
        mediaCollection: mediaData.movies,
      };

      this.setState({
        user: newUser
      });
    });

    //get subcollection
    this.mediaRef = this.db.collection("users").doc(this.collectionID).collection("movies");
    this.mediaRef.get().then(queryRef => {
        let newMovies = [];
        queryRef.forEach(docRef => {
          let mediaData = docRef.data();
          let newMovie = {
            key: docRef.id,
            title: mediaData.title,
            director: mediaData.director,
            releaseYear: mediaData.releaseYear,
            poster: mediaData.poster,
            genre: mediaData.genre,
          };
          newMovies.push(newMovie);
        });
        this.setState({
          movies: newMovies,
          arrayholder: newMovies
        });
      })
      .then(() => {
        // this.handle(); handle to fectch genre??
      });

    this.tabs = ["Movies", "Songs"];
  }



  // create a handle to click on movie 

  // create a handle to navigate songs and movies 
  handleMediaDetail (media) {
    this.props.navigation.navigate("MediaCollectionDetail", {
        media: media,
    
      });
  }

  // search within the homepage collection or a search tab 




//   toggleModal = () => {
//     this.setState({ isModalVisible: !this.state.isModalVisible });
//   };


  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.headerText}>My Collections</Text>
        </View>
        <View style={styles.bodyContainer}>
          <FlatList
            data={this.state.movies}
            numColumns={2}
            renderItem={({ item }) => {
              return (
                <View style={styles.posterContianer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.handleMediaDetail(item); //go to song or movie details
                    }}
                  >
                    <Image
                      resizeMode="contain"
                      source={{ uri: item.poster }}
                    />
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={item => item.key}
            ListHeaderComponent={this.renderHeader}
          />
        </View>
        <View style={styles.footerContainer}>
          {/* <ButtonGroup
            onPress={newIndex => this.handleTab(newIndex)}
            selectedIndex={this.state.selectedIndex}
            buttons={this.tabs}
          /> */}
 
        </View>
       
      </View>
    );
  }
}
