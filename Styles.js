import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#68D48D', // LimeLight Green
    primaryDark: '#303F9F', // MD Brown 300
    primaryLight: '#E8EAF6', // MD Amber 200
    outline: '#fff', // MD Gray 400
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

// will need to change to "home styles"
export const peopleStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        paddingTop: 20
    },
    peopleListContainer: {
        flex: 0.5,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        width: '90%',
    },
    separator: {
        backgroundColor: colors.primaryLight,
        height: 1,
        width: '90%',
        alignSelf: 'center'
    },
    personRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: 10
    },
    personText: {
        fontSize: 16,
    }
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
