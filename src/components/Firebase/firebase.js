import app from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

import AuthApi from "./AuthApi";
import UserApi from "./UserApi";
import EventApi from "./EventApi";
import AttendanceApi from "./AttendanceApi";

import { firebase } from "../../config";

const config = firebase;

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

  AuthApi = AuthApi;
  UserApi = UserApi;
  EventApi = EventApi;
  AttendanceApi = AttendanceApi;
}

export default new Firebase();
