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

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (next: any, fallback: any) =>
    this.auth.onAuthStateChanged((authUser: any) => {
      if (authUser) {
        this.user(authUser.uid)
          .once("value")
          .then((snapshot: any) => {
            const dbUser = snapshot.val();

            // default empty roles
            if (!dbUser.roles) {
              dbUser.roles = [];
            }

            // merge auth and db user
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...dbUser
            };

            next(authUser);
          });
      } else {
        fallback();
      }
    });

  // User API

  user = (uid: string) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // Cart API

  // Item API

  item = (id: string) => this.db.ref(`items/${id}`);

  items = () => this.db.ref("items");
}

export default Firebase;
