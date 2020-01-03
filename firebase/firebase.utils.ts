import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyDxYGmo8Y9WQIBJ-oemrLr8MrnYUHGZa8Y',
  authDomain: 'collab-expense-note-db.firebaseapp.com',
  databaseURL: 'https://collab-expense-note-db.firebaseio.com',
  projectId: 'collab-expense-note-db',
  storageBucket: 'collab-expense-note-db.appspot.com',
  messagingSenderId: '661228793540',
  appId: '1:661228793540:web:40a094d31c50d5d961a391',
  measurementId: 'G-1SQD65LYH7'
};

firebase.initializeApp(config);

export const createUserProfileDocument = async userAuth => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { email } = userAuth;
    const _updatedAt = new Date();
    const _createdAt = _updatedAt;
    try {
      await userRef.set({
        email,
        _createdAt,
        _updatedAt
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const addUserProfileDocument = async (
  userAuth,
  groupID,
  accountID,
  name
) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (snapShot.exists) {
    const _updatedAt = new Date();
    try {
      await userRef.update({
        name,
        groupID,
        accountID,
        _updatedAt
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const loginUser = async (email, password) => {
  if (!email || !password) return;
  const userAuth = auth.signInWithEmailAndPassword(email, password);
  return userAuth;
};

export const fetchPaymentsData = async userAuth => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  const userInfo = userSnapshot.data();

  const { accountID, groupID } = userInfo;

  if (!accountID || !groupID) return;

  const accountRef = firestore.doc(`accounts/${accountID}`);
  const accountSnapshot = await accountRef.get();
  const accountInfo = accountSnapshot.data();

  return accountInfo;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
