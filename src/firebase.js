import * as firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBGOHUPoiM-fG0F_jMiyDS3Apr9mcnQiu4",
    authDomain: "nba-full-fc500.firebaseapp.com",
    databaseURL: "https://nba-full-fc500.firebaseio.com",
    projectId: "nba-full-fc500",
    storageBucket: "nba-full-fc500.appspot.com",
    messagingSenderId: "606964447485"
};

firebase.initializeApp(config);

const firebaseDB = firebase.database();
const firebaseArticles = firebaseDB.ref('articles');
const firebaseTeams = firebaseDB.ref('teams');
const firebaseVideos = firebaseDB.ref('videos');

const firebaseLooper = (snapshot) => {
    const data = [];

    snapshot.forEach( (childSnap) => {
        data.push({
            ...childSnap.val(),
            id: childSnap.key
        })
    });

    return data;
}

export { 
    firebase,
    firebaseDB,
    firebaseArticles,
    firebaseTeams,
    firebaseVideos,
    firebaseLooper
};