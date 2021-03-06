import firebase from 'firebase';
import '@firebase/firestore';
import '@firebase/storage';
import { firebaseConfig } from './Secrets';

class DataModel {
    constructor() {
        if (firebase.apps.length === 0) { // aka !firebase.apps.length
            firebase.initializeApp(firebaseConfig);
        }
        this.usersRef = firebase.firestore().collection('users');
        this.chatsRef = firebase.firestore().collection('chats');
        this.storageRef = firebase.storage().ref();
        this.users = [];
        this.chats = [];
        this.chatListeners = [];
        this.asyncInit();
    }

    asyncInit = async () => {
        this.loadUsers();
        this.loadChats();
        //this.subscribeToChats();
    }

    loadUsers = async () => {
        let querySnap = await this.usersRef.get();
        querySnap.forEach(qDocSnap => {
            let key = qDocSnap.id;
            let data = qDocSnap.data();
            data.key = key;
            this.users.push(data);
        });
    }

    getUsers = () => {
        return this.users;
    }

    createUser = async (email, pass, dispName) => {
        // assemble the data structure
        let newUser = {
            email: email,
            password: pass,
            displayName: dispName
        }

        // add the data to Firebase (user collection)
        let newUserDocRef = await this.usersRef.add(newUser);

        // get the new Firebase ID and save it as the local "key"
        let key = newUserDocRef.id;
        newUser.key = key;
        this.users.push(newUser);
        return newUser;
    }

    getUserForID = (id) => {
        for (let user of this.users) {
            if (user.key === id) {
                return user;
            }
        }
        // will return undefined. No haiku this time...
    }

    loadChats = async () => {
        let querySnap = await this.chatsRef.get();
        querySnap.forEach(async qDocSnap => {
            let data = qDocSnap.data();
            let thisChat = {
                key: qDocSnap.id,
                participants: [],
                messages: []
            }
            for (let userID of data.participants) {
                let user = this.getUserForID(userID);
                thisChat.participants.push(user);
            }

            let messageRef = qDocSnap.ref.collection("messages");
            let messagesQSnap = await messageRef.get();
            messagesQSnap.forEach(qDocSnap => {
                let messageData = qDocSnap.data();
                messageData.author = this.getUserForID(messageData.author);
                messageData.key = qDocSnap.id;
                thisChat.messages.push(messageData);
            });
            this.chats.push(thisChat);
        });
    }

    subscribeToChat = (chat, notifyOnUpdate) => {
        this.chatSnapshotUnsub = this.chatsRef.doc(chat.key)
            .collection('messages')
            .orderBy('timestamp')
            .onSnapshot((querySnap) => {
                chat.messages = [];
                querySnap.forEach((qDocSnap) => {
                    let messageObj = qDocSnap.data();
                    messageObj.key = qDocSnap.id;
                    messageObj.author = this.getUserForID(messageObj.author);
                    chat.messages.push(messageObj);
                });
                notifyOnUpdate(); // call back to the subscriber
            });
    }

    unsubscribeFromChat = (chat) => {
        // don't really need 'chat' but could need it in the future
        if (this.chatSnapshotUnsub) {
            this.chatSnapshotUnsub();
        }
    }

    addChatListener = (listener, chatID) => {
        this.subscribeToChat(chatID);
        this.chatListeners.push({
            listener: listener,
            chatID: chatID
        });
    }

    notifyChatListeners = (_chatID) => {
        this.chatListeners.forEach(({ listener, chatID }) => {
            if (chatID === _chatID) {
                listener.onChatUpdate();
            }
        });
    }

    getOrCreateChat = async (user1, user2) => {

        // look for this chat in the existing data model 'chats' array
        // if it's here, we know it's already in Firebase
        for (let chat of this.chats) {
            // we need to use user keys to look for a match
            // and we need to check for each user in each position
            if ((chat.participants[0].key === user1.key &&
                chat.participants[1].key === user2.key) ||
                (chat.participants[0].key === user2.key &&
                    chat.participants[1].key === user1.key)) {
                return chat; // if found, return it and we're done
            }
        }

        // chat not found, gotta create it. Create an object for the FB doc
        let newChatDocData = { participants: [user1.key, user2.key] };
        // add it to firebase
        let newChatDocRef = await this.chatsRef.add(newChatDocData);
        // create a local chat object with full-fledged user objects (not just keys)
        let newChat = {
            participants: [user1, user2],
            key: newChatDocRef.id, // use the Firebase ID
            messages: []
        }
        // add it to the data model's chats, then return it
        this.chats.push(newChat);
        return newChat;
    }

    getChatForID = (id) => {
        for (let chat of this.chats) {
            if (chat.key === id) {
                return chat;
            }
        }
        // the chat was not found
        // should throw an error prob'ly
        // return undefined
        // [[almost accidental haiku]]
    }

    addChatMessage = async (chatID, message) => { // doesn't need to be async?

        let messagesRef = this.chatsRef.doc(chatID).collection('messages');

        let fbMessageObject = {
            type: 'text',
            text: message.text,
            timestamp: message.timestamp,
            author: message.author.key,
        }

        messagesRef.add(fbMessageObject); // onSnapshot will update local model
    }

    addChatImage = async (chat, author, imageObject) => {

        // Set up storage ref and file name
        // assigns a unique ID
        let fileName = '' + Date.now();
        // reference for the image from Firebase Storage, and add unique ID
        let imageRef = this.storageRef.child(fileName);
        console.log("Storage ref setup works");

        // fetch the image object from the local filesystem
        let response = await fetch(imageObject.uri);
        console.log("Image URI: ", imageObject.uri);
        let imageBlob = await response.blob();
        console.log("Image BLOB retrieved");

        // upload it to Firebase Storage
        await imageRef.put(imageBlob);
        console.log("Image upload works");

        // update image Document in Firestore
        let downloadURL = await imageRef.getDownloadURL();
        imageObject.uri = downloadURL; // replace local URI with permanent one
        console.log("NEW URI: ", imageObject.uri);

        let messagesRef = this.chatsRef.doc(chat.key).collection('messages');
        messagesRef.add({
            author: author.key,
            timestamp: Date.now(),
            type: "image",
            imageURL: imageObject.uri
        });
    }
}


let theDataModel = undefined;

export function getDataModel() {
    if (!theDataModel) {
        theDataModel = new DataModel();
    }
    return theDataModel;
}