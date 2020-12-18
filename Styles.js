import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#68D48D', // LimeLight Green
    primaryDark: '#3D7851', // Dark Green
    primaryLight: '#E8EAF6', // Light Blue
    outline: '#fff', // white
    placeholderTextColor: '#bebebe' // Mid Grey
}


export const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#68D48D',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20
    },
    titleText: {
      fontSize: 32,
      fontWeight: '900',
      color: '#fff'
    },
    topView: {
        flex: 0.3,
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },
    logoImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: '50%',
        resizeMode: 'contain',
    },
    middleView: {
        flex: 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        //backgroundColor: 'lightgreen'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10
    },
    inputLabel: {
        flex: 0.3,
        justifyContent: 'flex-end',
        paddingRight: 5,
        textAlign: 'right',
        fontSize: 10
    },
    inputText: {
        flex: 0.5,
        backgroundColor: '#fff',
        borderColor: colors.outline,
        paddingLeft: 5,
        borderWidth: 1,
        height: 30,
        fontSize: 12,
    },
    bottomView: {
        flex: 0.3,
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'space-around', 
        // justifyContent can be 'center' to be stacked
        alignItems: 'center'
    },
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.outline,
        borderRadius: 6,
        backgroundColor: colors.primary,
        width: '50%',
        height: '25%'
    },
    buttonText: {
        textAlign: 'center',
        color: 'white'
    }
});

export const homeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20
    },
      profileContainer: {
          flex: 0.25,
          justifyContent: 'space-between',
          alignItems: 'center',
         
          // width: '90%',
      },
      displayName: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      body: {
        flex: 0.75,
        alignItems: 'stretch',
        justifyContent: 'center',
        width: '100%',
        padding: '5%',
      },
        // listHeaderText: {
        //   fontSize: 16,
        //   padding: 15
        // },
        listContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'stretch', // this turns out to be important!
          padding: 15,
        },
        separator: {
            backgroundColor: colors.primaryLight,
            height: 1,
            width: '90%',
            alignSelf: 'center'
        },
        listItemContainer: {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 5,
          marginTop: 20,
        },
          listItemTextContainer: {
            flex: 0.8,
            flexDirection: 'row',
            justifyContent: 'flex-start',
          },
            listItemText: {
              fontSize: 18,
              paddingLeft: 20,

            },
          listItemButtonContainer: {
            flex: 0.2,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          },
        placeholderText: {
          alignItems: "center",
          justifyContent: "center",
          color: "black"
        },
        homescreenListEmpty: {
          fontSize: 12,
          fontStyle: "italic"
        },
        listscreenListEmpty: {
          fontSize: 12
        },
    // personRow: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     width: '100%',
    //     paddingVertical: 10
    // },
    // personText: {
    //     fontSize: 16,
    // }
    // footer: {
    //   flex: 1,
      
    //   alignItems: 'center',
    // },
  
    // List Screen footer
    footerButtonContainer: {
      flexDirection: 'row',
      // justifyContent: 'space-around',

      alignItems: 'center',
      borderWidth: 1,
      borderColor: colors.outline,
      borderRadius: 6,
      // backgroundColor: colors.primary,
      width: '300%',
      height: 50
    },
    footerButton: {
      flex: 0.1,
      borderRadius: 12,
      borderColor: colors.primaryDark,
      borderWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      marginHorizontal: '5%',
      backgroundColor: colors.primary,
      alignItems: "flex-start",
      alignSelf: "flex-start",
      // width: '100%',
    },
    footerButtonText: {
      color: 'white', 
      fontSize: 15,
      textAlign: 'center',
      fontWeight: '200',
    }
});

export const movieListStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.primaryLight
  },
  header: {
    flex: 0.1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: colors.primary,
  },
  headerText: {
    fontSize: 24,
    color: "white"
  },
  body: {
    flex: 0.4,
    alignItems: 'stretch',
    justifyContent: 'center',
    width: '100%',
    padding: '5%',
  },
  listHeaderText: {
    fontSize: 16,
    padding: 15
  },
  listContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch', // this turns out to be important!
    padding: 15,
  },
  toggleSwitch: {
    flexDirection: 'row',
  },
  toggleSwitchText: {
    paddingLeft: 20
  },
  // Home Screen body
  placeholderText: {
    alignItems: "center",
    justifyContent: "center",
    color: "black"
  },
  homescreenListEmpty: {
    fontSize: 16,
  },
  listscreenListEmpty: {
    fontSize: 12,
    fontStyle: "italic"
  },
  listItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  listItemTextContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  listItemText: {
    fontSize: 18,
    paddingLeft: 20,

  },
  listItemButtonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  // List Screen body
  textInputContainer: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputLabel: {
    fontSize: 18,
    paddingRight: 15
  },
  textInputBox: {
    borderColor: colors.outline,
    borderTopColor: '#fff',
    borderRightColor: '#fff',
    borderLeftColor: '#fff',
    borderWidth: 1,
    width: '50%',
    height: 40,
    fontSize: 18,
    padding: 5,
  },
  listOfItemsContainer: {
    flex: 0.8,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch', // this turns out to be important!
    padding: 15,
  },
  toggleSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleSwitchText: {
    paddingLeft: 13
  },
  ItemContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 5,
  },
  ItemTextContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  ItemText: {
    fontSize: 14,
    // paddingLeft: 20,

  },
  ItemButtonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    borderColor: colors.outline,
    borderRadius: 6,
    // backgroundColor: colors.primary,
    width: '100%',
    height: 50
  },
  footerButton: {
    flex: 0.2,
    borderRadius: 12,
    borderColor: colors.primaryDark,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    marginHorizontal: '5%',
    backgroundColor: colors.primary,
    alignItems: "flex-start",
    alignSelf: "flex-start",
    // width: '100%',
  },
  footerButtonText: {
    color: 'white', 
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '200',
  }
});







export const movieSelect = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
  },
  
  header: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'stretch',
    textAlign: "center",
    alignItems: 'center',
    // justifyContent: 'center',
    fontSize: 18,
    fontWeight: "bold",
    color: 'black', 
    // marginLeft: 50, 
  },

  listContainer: {},
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: colors.primaryD
  },
  listItemContainer: { 
  },
  listItemTextContainer: {
  },
  placeholderText: {},
  homescreenListEmpty: {}
});

export const chatStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    messageListContainer: {
        flex: 0.9,
        justifyContent: 'center',
        alignItems: 'stretch',
        width: '100%',
        alignSelf: 'center',
        paddingTop: '3%'
    },
    chatTextSelfContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        margin: 5,
        marginRight: 20,
        marginLeft: 40,
        backgroundColor: 'lightblue',
        borderRadius: 6
    },
    chatTextSelf: {
        fontSize: 18,
        textAlign: 'right',
    },
    chatTextOtherContainer: {
        alignSelf: 'flex-start',
        padding: 5,
        margin: 5,
        marginLeft: 20,
        marginRight: 40,
        backgroundColor: 'lightgray',
        borderRadius: 6
    },
    chatTextOther: {
        fontSize: 18,
        textAlign: 'left',
    },
    inputContainer: {
        flex: 0.1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'stretch'
    },
    inputRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        flex: 0.8,
        borderWidth: 1,
        borderColor: colors.primaryDark,
        borderRadius: 6,
        alignSelf: 'center',
        fontSize: 18,
        height: 40,
        padding: 5,
        margin: 5
    }
});
