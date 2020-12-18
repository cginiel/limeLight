import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  FlatList,
} from 'react-native';
import FriendDetail from './FriendDetail'
import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';


export class FriendsListScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      theList: [
        {id:1,  name: "Tony Baloney",    status:"active", image:"https://i.ibb.co/1GxtvqT/p3.jpg"},
        {id:2,  name: "Peter Littlejohn",   status:"active", image:"https://i.ibb.co/qMdmsZV/p4.jpg"} ,
        {id:3,  name: "Mary Smith",  status:"active", image:"https://i.ibb.co/Q6fwv4j/Processed-with-VSCO-with-hb2-preset.jpg"} ,
        {id:4,  name: "John Ganyard",  status:"active", image:"https://i.ibb.co/wMJ4nFc/p5.jpg"} ,
        {id:5,  name: "Julia Knowles",   status:"active", image:"https://i.ibb.co/SPZBvf1/p2.jpg"} ,
        
      ]
    };
  }

  renderItem = ({item}) => {
    return (
      // <TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => {this.props.navigation.navigate('Friend Profile')}}>
            <Image source={{ uri: item.image }} style={styles.pic} />
          </TouchableOpacity>
          <View>     
            <View style={styles.nameContainer}>
              <Text style={styles.nameTxt} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
              <Text style={styles.mblTxt}>Added</Text>
            </View>
            <View style={styles.statusContainer}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
        </View>
      
    );
  }

  render() {
    return(
      <View style={{ flex: 0.7 }} >
        <FlatList 
          extraData={this.state}
          data={this.state.theList}
          keyExtractor = {(item) => {
            return item.id;
          }}
          renderItem={this.renderItem}/>

      <View style={styles.footerButton}>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('Search People')}>
            <Text style={styles.footerButtonText}>Add More Friends</Text>
        </TouchableOpacity>
      </View>
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
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontWeight: '400',
    color: '#008B8B',
    fontSize: 12,
    marginLeft: 15,
  },
  footer: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  // List Screen footer
  footerButtonContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-around',

    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 6,
    // backgroundColor: colors.primary,
    width: '100%',
    height: 50
  },
  // footerButton: {
  //   flex: 1,
  //   borderRadius: 12,
  //   borderColor: '#3D7851',
  //   borderWidth: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   padding: 15,
  //   marginHorizontal: '5%',
  //   backgroundColor: '#68D48D',

  //   marginTop:12, 
  //   height:20, 
  //   width: '40%',
  // },
  footerButtonText: {
    color: 'black', 
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '200',
  }
});