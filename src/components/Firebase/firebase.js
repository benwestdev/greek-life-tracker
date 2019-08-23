import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

import { DEV_CONFIG, PROD_CONFIG } from "./config";

const config = process.env.NODE_ENV === "production" ? PROD_CONFIG : DEV_CONFIG;

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.auth = app.auth();
    this.db = app.database();
    this.firestore = app.firestore();

    this.emailAuthProvider = app.auth.EmailAuthProvider;
    this.googleProvider = new app.auth.GoogleAuthProvider();
    this.facebookProvider = new app.auth.FacebookAuthProvider();
  }

  // *** Auth API ***
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  doSignInWithFacebook = () => this.auth.signInWithPopup(this.facebookProvider);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** User API ***
  user = uid => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  // *** Merge Auth and DB User API ***
  onAuthUserListener = (next, fallback) =>
    this.auth.onAuthStateChanged(authUser => {
      if (authUser) {
        this.firestore
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

  // *** Event API ***
  event = uid => this.db.ref(`events/${uid}`);
  events = () => this.db.ref(`events`);

  // *** Attendance API ***
  attendance = (eventUID, uid) =>
    this.db.ref(`events/${eventUID}/attendance/${uid}`);
  attendances = eventUID => this.db.ref(`events/${eventUID}/attendances`);

  userAttendance = (userUID, uid) =>
    this.db.ref(`user/${userUID}/attendance/${uid}`);
  userAttendances = userUID => this.db.ref(`users/${userUID}/attendance`);

  //*** FIRESTORE USER API  ***/;
  getUsers = () =>
    this.firestore
      .collection("users")
      .get()
      .then(querySnapshot => {
        const users = [];
        querySnapshot.forEach(doc => {
          users.push({ uid: doc.id, ...doc.data() });
        });
        console.log({ users });
        return users;
      });

  getUser = uid =>
    this.firestore
      .collection("users")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          return { uid: doc.id, ...doc.data() };
        } else {
          console.log("no document found");
          return null;
        }
      });

  addUser = userObject =>
    this.firestore
      .collection("users")
      .add(userObject)
      .then(docRef => {
        console.log("Saved user: ", docRef);
      })
      .catch(error => {
        console.log("Error saving user: ", error);
      });

  editUser = (uid, userObject) =>
    this.firestore
      .collection("users")
      .doc(uid)
      .set(userObject)
      .then(response => {
        console.log("Edit successful");
      })
      .catch(error => {
        console.log("Error updating user: ", uid, " ", error);
      });

  //** FIRESTORE EVENT API ***/
  getEvents = () =>
    this.firestore
      .collection("events")
      .get()
      .then(querySnapshot => {
        const events = [];
        querySnapshot.forEach(doc => {
          events.push({ uid: doc.id, ...doc.data() });
        });
        console.log({ events });
        return events;
      });

  getEvent = uid =>
    this.firestore
      .collection("events")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          return { uid: doc.id, ...doc.data() };
        } else {
          console.log("no document found");
          return null;
        }
      });

  addEvent = eventObject =>
    this.firestore
      .collection("events")
      .add(eventObject)
      .then(response => {
        console.log("Event saved: ", response);
      })
      .catch(error => {
        console.log("Error saving event: ", error);
      });

  editEvent = (uid, eventObject) =>
    this.firestore
      .collection("events")
      .doc(uid)
      .update(eventObject)
      .then(() => {
        console.log("Edit successful");
      })
      .catch(error => {
        console.log("Error updating event: ", uid, " ", error);
      });

  deleteEvent = uid =>
    this.firestore
      .collection("events")
      .doc(uid)
      .delete();

  //** FIRESTORE ATTENDANCES API ***/
  getAttendances = () =>
    this.firestore
      .collection("attendances")
      .get()
      .then(querySnapshot => {
        const attendances = [];
        querySnapshot.forEach(doc => {
          attendances.push({ uid: doc.id, ...doc.data() });
        });
        console.log({ attendances });
        return attendances;
      });

  getAttendance = uid =>
    this.firestore
      .collection("attendances")
      .doc(uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          return { uid: doc.id, ...doc.data() };
        } else {
          console.log("no document found");
          return null;
        }
      });

  getAttendancesByEvent = eventUid =>
    this.firestore
      .collection("attendances")
      .where("eventId", "==", eventUid)
      .get()
      .then(querySnapshot => {
        const attendances = [];
        querySnapshot.forEach(doc => {
          attendances.push({ uid: doc.id, ...doc.data() });
        });
        console.log({ attendances });
        return attendances;
      })
      .catch(error => {
        console.log(error);
      });

  getAttendanceByUser = userUid =>
    this.firestore
      .collection("attendances")
      .where("userId", "==", userUid)
      .get()
      .then(querySnapshot => {
        const attendances = [];
        querySnapshot.forEach(doc => {
          attendances.push({ uid: doc.id, ...doc.data() });
        });
        return attendances;
      })
      .catch(error => {
        console.log(error);
      });

  addAttendance = attendanceObject =>
    this.firestore
      .collection("attendances")
      .add(attendanceObject)
      .then(response => {
        console.log("Attendance saved: ", response);
      })
      .catch(error => {
        console.log("Error saving attendance: ", error);
      });

  editAttendance = (uid, attendanceObject) =>
    this.firestore
      .collection("attendances")
      .doc(uid)
      .update(attendanceObject)
      .then(() => {
        console.log("Edit successful");
      })
      .catch(error => {
        console.log("Error updating attendance: ", uid, " ", error);
      });
}

export default Firebase;
