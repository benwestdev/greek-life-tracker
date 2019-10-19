// eslint-disable-next-line
import React, { useState, useEffect } from "react";
import firebase from "./firebase";
import moment from "moment";

const useGetEvents = timeFrame => {
  const dateCriteria = buildDateRangeCriteria(timeFrame);

  const [events, setEvents] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents(dateCriteria);
        setEvents(events);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        setError("Unable to retrieve events");
        setEvents([]);
      }
    };
    fetchEvents();
    // eslint-disable-next-line
  }, [timeFrame]);
  return { events, isLoading, error };
};

const buildDateRangeCriteria = timeFrame => {
  const start = moment().startOf(timeFrame);
  const end = moment().endOf(timeFrame);

  const startDate = moment(start).format("MM-DD-YYYY");
  const endDate = moment(end).format("MM-DD-YYYY");
  return {
    startDate,
    endDate
  };
};

const getAllEvents = () =>
  firebase.firestore
    .collection("events")
    .orderBy("date", "desc")
    .get()
    .then(querySnapshot => {
      const events = [];
      querySnapshot.forEach(doc => {
        events.push({ uid: doc.id, ...doc.data() });
      });
      return events;
    });

const getEvents = dateCriteria =>
  firebase.firestore
    .collection("events")
    .where("date", ">=", dateCriteria.startDate)
    .where("date", "<=", dateCriteria.endDate)
    .get()
    .then(querySnapshot => {
      const events = [];
      querySnapshot.forEach(doc => {
        events.push({ uid: doc.id, ...doc.data() });
      });
      return events;
    });

const getEventsPaginated = (lastRef, includePastEvents) => {
  const today = moment(new Date()).format("MM-DD-YYYY");
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
  useGetEvents,
  getEvents,
  getEventsPaginated,
  getAllEvents,
  getEvent,
  addEvent,
  editEvent,
  deleteEvent,
  buildDateRangeCriteria
};
