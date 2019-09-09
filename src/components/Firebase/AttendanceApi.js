import firebase from "./firebase";

const getAttendances = () =>
  firebase.firestore
    .collection("attendances")
    .get()
    .then(querySnapshot => {
      const attendances = [];
      querySnapshot.forEach(doc => {
        attendances.push({ uid: doc.id, ...doc.data() });
      });
      return attendances;
    });

const getAttendance = uid =>
  firebase.firestore
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

const getAttendancesByEvent = eventUid =>
  firebase.firestore
    .collection("attendances")
    .where("eventId", "==", eventUid)
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

const getAttendanceByUser = userUid =>
  firebase.firestore
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

const addAttendance = attendanceObject =>
  firebase.firestore
    .collection("attendances")
    .add(attendanceObject)
    .then(response => {
      console.log("Attendance saved: ", response);
    })
    .catch(error => {
      console.log("Error saving attendance: ", error);
    });

const editAttendance = (uid, attendanceObject) =>
  firebase.firestore
    .collection("attendances")
    .doc(uid)
    .update(attendanceObject)
    .then(() => {
      console.log("Edit successful");
    })
    .catch(error => {
      console.log("Error updating attendance: ", uid, " ", error);
    });

export default {
  getAttendances,
  getAttendance,
  getAttendancesByEvent,
  getAttendanceByUser,
  addAttendance,
  editAttendance
};
