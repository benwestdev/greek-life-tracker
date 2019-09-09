import firebase from "./firebase";

const getUsers = () =>
  firebase.firestore
    .collection("users")
    .get()
    .then(querySnapshot => {
      const users = [];
      querySnapshot.forEach(doc => {
        users.push({ uid: doc.id, ...doc.data() });
      });
      return users;
    });

const getUser = uid =>
  firebase.firestore
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

const editUser = (uid, userObject) =>
  firebase.firestore
    .collection("users")
    .doc(uid)
    .set(userObject)
    .then(response => {
      console.log("Edit successful");
    })
    .catch(error => {
      console.log("Error updating user: ", uid, " ", error);
    });

export default {
  getUsers,
  getUser,
  editUser
};
