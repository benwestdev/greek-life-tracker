import firebase from "./firebase";

const doCreateUserWithEmailAndPassword = (email, password) =>
  firebase.auth.createUserWithEmailAndPassword(email, password);

const doSignInWithEmailAndPassword = (email, password) =>
  firebase.auth.signInWithEmailAndPassword(email, password);

const doSignInWithGoogle = () =>
  firebase.auth.signInWithPopup(firebase.googleProvider);

const doSignInWithFacebook = () =>
  firebase.auth.signInWithPopup(firebase.facebookProvider);

const doSignOut = () => firebase.auth.signOut();

const doPasswordReset = email => firebase.auth.sendPasswordResetEmail(email);

const doPasswordUpdate = password =>
  firebase.auth.currentUser.updatePassword(password);

const onAuthUserListener = (next, fallback) =>
  firebase.auth.onAuthStateChanged(authUser => {
    if (authUser) {
      firebase.firestore
        .collection("users")
        .doc(authUser.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            authUser = {
              uid: authUser.uid,
              email: authUser.email,
              ...doc.data()
            };
            next(authUser);
          } else {
            console.log("No such document!");
          }
        });
    } else {
      fallback();
    }
  });

export default {
  doCreateUserWithEmailAndPassword,
  doSignInWithEmailAndPassword,
  doSignInWithGoogle,
  doSignInWithFacebook,
  doSignOut,
  doPasswordReset,
  doPasswordUpdate,
  onAuthUserListener
};
