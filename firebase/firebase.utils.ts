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
  const userSnapshot = await userRef.get();

  if (!userSnapshot.exists) {
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

export const addUserProfileDocument = async (userAuth, groupID, name) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();

  const groupRef = firestore.doc(`groups/${groupID}`);
  const groupSnapshot = await groupRef.get();
  const groupInfo = groupSnapshot.data();

  const { accountID } = groupInfo;
  if (!accountID) return;

  if (userSnapshot.exists) {
    const _updatedAt = new Date();
    try {
      await userRef.update({
        name,
        accountID,
        groupID,
        _updatedAt
      });
      addUserToGroups(userAuth, groupID);
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

export const fetchGroupDataByUser = async userAuth => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  const userInfo = userSnapshot.data();

  if (!userInfo) return;
  const { accountID, groupID } = userInfo;

  if (!accountID || !groupID) return;

  const groupRef = firestore.doc(`groups/${groupID}`);
  const groupSnapshot = await groupRef.get();
  const groupInfo = groupSnapshot.data();

  console.log(`groupInfo: ${JSON.stringify(groupInfo, null, '  ')}`);

  return groupInfo;
};

export const fetchAllGroupData = async () => {
  const groupCollectionRef = firestore.collection('groups');
  const groupCollectionSnapshot = await groupCollectionRef.get();
  return groupCollectionSnapshot.docs;
};

export const fetchAllUserData = async () => {
  const userCollectionRef = firestore.collection('users');
  const userCollectionSnapshot = await userCollectionRef.get();
  return userCollectionSnapshot.docs;
};

export const fetchAllGroupUserDataByUser = async userAuth => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  const userInfo = userSnapshot.data();

  if (!userInfo) return;
  const { groupID } = userInfo;

  if (!groupID) return;

  const groupRef = firestore.doc(`groups/${groupID}`);
  const groupSnapshot = await groupRef.get();
  const userIDs = groupSnapshot.data();

  let allUsers = await fetchAllUserData();
  let userData = {};
  allUsers.forEach(user => {
    return (userData[user.id] = user.data().name);
  });
  return userData;
};

export const fetchPaymentsData = async userAuth => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userSnapshot = await userRef.get();
  const userInfo = userSnapshot.data();

  if (!userInfo) return;
  const { accountID, groupID } = userInfo;

  if (!accountID || !groupID) return;

  const accountRef = firestore.doc(`accounts/${accountID}`);
  const accountSnapshot = await accountRef.get();
  const accountInfo = accountSnapshot.data();

  return accountInfo.payments;
};

interface PaymentProps {
  checked: boolean;
  date: Date;
  groupAmount: string;
  purchaseMemo: string;
  shopName: string;
  usage: string;
  userAmount: string;
}

interface GroupProps {
  accountID: string;
  groupName: string;
  userIDs: [string];
}

interface UserProps {
  accountID: string;
  email: string;
  groupID: string;
  name: string;
}

export const addUserToGroups = async (userAuth, groupID) => {
  if (!userAuth || !groupID) return;

  const userID = userAuth.uid;
  const userRef = firestore.doc(`users/${userID}`);
  const userSnapshot = await userRef.get();

  const _updatedAt = new Date();
  if (userSnapshot.exists) {
    try {
      await userRef.update({ _updatedAt });
    } catch (error) {
      console.log('error groupdID to the user', error.message);
    }
  }

  const groupRef = firestore.doc(`groups/${groupID}`);
  const groupSnapshot = await groupRef.get();
  const groupInfo = groupSnapshot.data();

  if (groupSnapshot.exists) {
    try {
      let { userIDs } = groupInfo;

      if (userIDs.indexOf(userID) > 0)
        return console.log('このユーザーはすでにグループに含まれています');
      userIDs ? userIDs.push(userID) : (userIDs = userID);

      await groupRef.update({ _updatedAt, userIDs });
    } catch (error) {
      console.log('error add user to group', error.message);
    }
  }
};

export const createPaymentsData = async (userAuth, props: PaymentProps) => {
  const {
    checked,
    date,
    groupAmount,
    shopName,
    usage,
    userAmount,
    purchaseMemo
  } = props;

  let dateOption = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    weeday: 'long'
  };

  if (!userAuth) return;

  const userID = userAuth.uid;

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
      collected: checked,
      date,
      groupID,
      groupAmount,
      purchaseMemo,
      shopName: shopName || 'その他',
      usage: usage || 'その他',
      userID,
      userAmount
    };
    const yearMonthPayment = {
      [yearMonth]: [currentPayment]
    };
    try {
      if (payments) {
        payments[yearMonth]
          ? payments[yearMonth].push(currentPayment)
          : (payments[yearMonth] = [currentPayment]);
        await accountRef.update({ payments });
      } else {
        await accountRef.update({ payments: yearMonthPayment });
      }
      return payments;
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return null;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;
