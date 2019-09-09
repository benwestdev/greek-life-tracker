import firebase from "./firebase";
import moment from "moment";

const getEvents = () =>
  firebase.firestore
    .collection("events")
    .get()
    .then(querySnapshot => {
      const events = [];
      querySnapshot.forEach(doc => {
        events.push({ uid: doc.id, ...doc.data() });
      });
      return events;
    });

const getEventsPaginated = (lastRef, includePastEvents) => {
  const today = moment().format("MM-DD-YYYY");
  if (lastRef) {
    if (includePastEvents) {
      return firebase.firestore
        .collection("events")
        .orderBy("date", "desc")
        .limit(1)
        .startAfter(lastRef)
        .get();
    } else {
      return firebase.firestore
        .collection("events")
        .where("date", ">=", today)
        .orderBy("date", "desc")
        .limit(1)
        .startAfter(lastRef)
        .get();
    }
  } else {
    if (includePastEvents) {
      return firebase.firestore
        .collection("events")
        .orderBy("date", "desc")
        .limit(1)
        .get();
    } else {
      return firebase.firestore
        .collection("events")
        .where("date", ">=", today)
        .orderBy("date", "desc")
        .limit(1)
        .get();
    }
  }
};

const getEvent = uid =>
  firebase.firestore
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

const addEvent = eventObject =>
  firebase.firestore
    .collection("events")
    .add(eventObject)
    .then(response => {
      console.log("Event saved: ", response);
    })
    .catch(error => {
      console.log("Error saving event: ", error);
    });

const editEvent = (uid, eventObject) =>
  firebase.firestore
    .collection("events")
    .doc(uid)
    .update(eventObject)
    .then(() => {
      console.log("Edit successful");
    })
    .catch(error => {
      console.log("Error updating event: ", uid, " ", error);
    });

const deleteEvent = uid =>
  firebase.firestore
    .collection("events")
    .doc(uid)
    .delete();

export default {
  getEvents,
  getEventsPaginated,
  getEvent,
  addEvent,
  editEvent,
  deleteEvent
};
