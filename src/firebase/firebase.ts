import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyDnWwC6ujg0Pm4iqwmzh7_AGZ9WyVgxT6E",
  authDomain: "my-guitar-shop.firebaseapp.com",
  databaseURL: "https://my-guitar-shop.firebaseio.com",
  projectId: "my-guitar-shop",
  storageBucket: "my-guitar-shop.appspot.com",
  messagingSenderId: "643088084014"
};

class Firebase {
  auth: any;
  db: any;

  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
  }

  // Auth API

  doCreateUserWithEmailAndPassword = (email: string, password: string) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email: string, password: string) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = (email: string) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password: string) =>
    this.auth.currentUser.updatePassword(password);

  // User API

  user = (uid: string) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");
}

export default Firebase;
