import React, { Component } from 'react';
import {
  StyleSheet,Text,View,Image,TouchableOpacity,FlatList,Dimensions,Alert,ScrollView
} from 'react-native';


export class FriendProfileScreen extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      profileVisible:false,
      userSelected:[],
      product: {
        name:"Tony Baloney",
        description:"'I love a good motion movie'",
        created:"",
        images:[
          "https://i.ibb.co/1GxtvqT/p3.jpg", 
          "https://i.ibb.co/5MQzWLz/p7.jpg", 
          "https://i.ibb.co/ZWJ9GbY/p6.jpg", 
        ],
       
      }
    };
  }

  __setImageSelected = (image) => {
    this.setState({selectedImage:image});
  }

  __renderImages = () => {
    return(
      <View style={styles.smallProfileImageContainer}>
        {this.state.product.images.map((prop, key) => {
          return (
            <TouchableOpacity key={key} onPress={() => {this.__setImageSelected(prop)}}>
              <Image style={styles.smallImage} source={{uri:prop}}/>
            </TouchableOpacity>
          );
        })}
      </View>
    )
  }

  __renderColors = () => {
    return(
      <View style={styles.contentColors}>
        {this.state.product.colors.map((prop, key) => {
          return (
            <TouchableOpacity key={key} style={[styles.bottonColor, {backgroundColor:prop}]}></TouchableOpacity> 
          );
        })}
      </View>
    )
  }

  render() {
    var bigProfileImage = (this.state.selectedImage) ? this.state.selectedImage: this.state.product.images[0]; 
    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View style={styles.profile}>
            <View style={styles.profileHeader}>
              <Text style={styles.name}>{this.state.product.name}</Text>
            </View>
            <View style={styles.profileContent}>
              <View style={styles.header}>
                <View style={styles.bigProfileImageContainer}>
                  <Image style={styles.bigProfileImage} source={{uri:bigProfileImage}}/>
                </View>
                {this.__renderImages()}
              </View>
            </View>
          </View>


        <View style={styles.profile}>
          <View style={styles.profileHeader}>
            <Text style={styles.profileTitle}>Description</Text>
          </View>
          <View style={styles.profileContent}>
            <Text style={styles.description}>{this.state.product.description}</Text>
          </View>
        </View>

        <View style={styles.profile}>
          <View style={styles.profileContent}>
            <TouchableOpacity style={styles.addButton}>
              <Text style={styles.addButtonText}>Message</Text>  
            </TouchableOpacity>
          </View>
        </View>
        </ScrollView>
      </View>
    );
  }
}


// Reference: https://www.bootdey.com/react-native-snippet/57/Shop-Product-View-Concept

const styles = StyleSheet.create({
  container:{
    flex:1,
    marginTop:20,
    backgroundColor:"#FFFFFF",
  },
  content:{
    marginLeft:10,
    marginRight:10,
    marginTop:20,
  },
  header:{
    flexDirection:'row',
  },
  bigProfileImage:{
    width:200,
    height:200,
  },
  smallProfileImageContainer:{
    flexDirection:'column',
    marginLeft:30
  },
  smallImage:{
    width:60,
    height:60,
    marginTop:5, 
  },
  bottonColor: {
    height:40,
    width:40,
    borderRadius:40,
    marginHorizontal:3
  },
  contentColors:{
    flexDirection:'row', 
  },
  name:{
    fontSize:22,
    color:"#696969",
    fontWeight:'bold',
  },

  description:{
    fontSize:18,
    color:"#696969",
  },
  addButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#3D7851",
  },
  addButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  },

  /******** profile **************/
  profile:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginVertical: 5,
    backgroundColor:"white",
    marginHorizontal: 5,
  },
  profileContent: {
    paddingVertical: 12.5,
    paddingHorizontal: 16,
  },
  profileHeader:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12.5,
    paddingBottom: 25,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 1,
    borderBottomRightRadius: 1,
  },
  profileTitle:{
    color:"#696969"
  }
}); 