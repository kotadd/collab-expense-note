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
  // console.log(`userAuth: ${userAuth}`);
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.id}`);
  const userSnapshot = await userRef.get();
  const userInfo = userSnapshot.data();

  // console.log(`userAuth.id: ${userAuth.id}`);

  if (!userInfo) return;
  const { accountID, groupID } = userInfo;

  if (!accountID || !groupID) return;

  const accountRef = firestore.doc(`accounts/${accountID}`);
  const accountSnapshot = await accountRef.get();
  const accountInfo = accountSnapshot.data();

  // console.log(`accountInfo.payments: ${JSON.stringify(accountInfo.payments)}`);

  return accountInfo.payments;
};

interface Props {
  date: Date;
  groupAmount: string;
  shopName: string;
  usage: string;
  userAmount: string;
}

export const createPaymentsData = async (userAuth, props: Props) => {
  const { date, groupAmount, shopName, usage, userAmount } = props;

  // console.log(userAuth);
  // console.log(props);

  let dateOption = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weeday: 'long'
  };

  if (!userAuth) return;

  const userID = userAuth.id;

  const userRef = firestore.doc(`users/${userID}`);
  const userSnapshot = await userRef.get();
  const userInfo = userSnapshot.data();

  if (!userInfo) return;
  const { accountID, groupID } = userInfo;

  if (!accountID || !groupID) return;

  const accountRef = firestore.doc(`accounts/${accountID}`);
  const accountSnapshot = await accountRef.get();

  if (accountSnapshot.exists) {
    const { payments } = accountSnapshot.data();

    const _updatedAt = new Date();
    const _createdAt = _updatedAt;
    const targetDate = date.toLocaleDateString('ja-JP', dateOption);
    const yearMonth = targetDate.replace(/(\d\d|\d)日/, '');

    const currentPayment = {
      _createdAt,
      _updatedAt,
      date: targetDate,
      groupID,
      groupAmount,
      shopName,
      usage,
      userID,
      userAmount
    };
    const yearMonthPayment = {
      [yearMonth]: [currentPayment]
    };
    try {
      if (payments) {
        // console.log('here');
        // console.log(yearMonthPayment);
        payments[yearMonth]
          ? payments[yearMonth].push(currentPayment)
          : (payments[yearMonth] = [currentPayment]);
        await accountRef.update({ payments });
      } else {
        // console.log(`yearMonthPayment: ${yearMonthPayment}`);
        await accountRef.update({ payments: yearMonthPayment });
      }
      return payments;
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return null;
};

// export const convertAccountsSnapshotToMap = accounts => {
//   const transformedCollection = accounts.docs.map(doc => {
//     const { payments } = doc.data();

//     return {
//       _createdAt: payments,
//       id: doc.id,
//       title,
//       items
//     };
//   });

//   return transformedCollection.reduce((accumulator, collection) => {
//     accumulator[collection.title.toLowerCase()] = collection;
//     return accumulator;
//   }, {});
// };

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
