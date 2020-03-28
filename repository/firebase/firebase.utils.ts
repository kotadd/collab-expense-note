import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {
  CreatePaymentType,
  MonthlyPayments,
  PaymentProps,
  PaymentType
} from './accounts/account-types'
import { GroupType } from './groups/group-types'
import { UserAuthType, UserType } from './users/user-types'

const config = {
  apiKey: 'AIzaSyDxYGmo8Y9WQIBJ-oemrLr8MrnYUHGZa8Y',
  authDomain: 'collab-expense-note-db.firebaseapp.com',
  databaseURL: 'https://collab-expense-note-db.firebaseio.com',
  projectId: 'collab-expense-note-db',
  storageBucket: 'collab-expense-note-db.appspot.com',
  messagingSenderId: '661228793540',
  appId: '1:661228793540:web:40a094d31c50d5d961a391',
  measurementId: 'G-1SQD65LYH7'
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const dateOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
  weekday: 'short'
}

export const timestampToLocaleDate: (
  timestamp: firebase.firestore.Timestamp,
  locale: string
) => string = (timestamp, locale) => {
  return timestamp.toDate().toLocaleDateString(locale, dateOptions)
}

export const fetchAllGroupData: () => Promise<
  firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[]
> = async () => {
  const groupCollectionRef = firestore.collection('groups')
  const groupCollectionSnapshot = await groupCollectionRef.get()
  return groupCollectionSnapshot.docs
}

export const loginUser: (
  email: string,
  password: string
) => Promise<firebase.auth.UserCredential | undefined> = async (
  email,
  password
) => {
  if (!email || !password) return
  const userAuth = auth.signInWithEmailAndPassword(email, password)
  return userAuth
}

export const fetchGroupUsers: (
  userInfo: UserType
) => Promise<
  firebase.firestore.DocumentData[] | undefined
> = async userInfo => {
  if (!userInfo) return
  const { groupID } = userInfo
  if (!groupID) return

  const usersCollection = firestore.collection('users')

  const querySnapshot = await usersCollection
    .where('groupID', '==', groupID)
    .get()

  const userList: firebase.firestore.DocumentData[] = []
  querySnapshot.forEach(doc => {
    const object = doc.data()
    object.uid = doc.id
    userList.push(object)
  })

  return userList
}

export const fetchGroupByUser: (
  userInfo: UserType | undefined
) => Promise<GroupType | undefined> = async userInfo => {
  if (!userInfo) return
  const { groupID } = userInfo
  if (!groupID) return

  const groupRef = firestore.doc(`groups/${groupID}`)
  const groupSnapshot = await groupRef.get()
  const groupInfo = groupSnapshot.data()

  return groupInfo as GroupType
}

export const fetchPaymentsByUser: (
  userInfo: UserType | undefined
) => Promise<MonthlyPayments | undefined> = async userInfo => {
  if (!userInfo) return
  const { accountID, groupID } = userInfo

  if (!accountID || !groupID) return

  const accountRef = firestore.doc(`accounts/${accountID}`)
  const accountSnapshot = await accountRef.get()
  const accountInfo = accountSnapshot.data() as PaymentProps

  return accountInfo.payments
}

export const fetchUserByUserAuth: (
  userAuth: UserAuthType
) => Promise<UserType | undefined> = async (userAuth: UserAuthType) => {
  if (!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const userSnapshot = await userRef.get()
  const userInfo = userSnapshot.data()

  return userInfo as UserType
}

export const addUserToGroups: (
  userAuth: UserAuthType,
  groupID: string
) => Promise<void> = async (userAuth, groupID) => {
  if (!userAuth || !groupID) return

  const userID = userAuth.uid
  const userRef = firestore.doc(`users/${userID}`)
  const userSnapshot = await userRef.get()

  const _updatedAt = new Date()
  if (userSnapshot.exists) {
    try {
      await userRef.update({ _updatedAt })
    } catch (error) {
      console.log('error groupdID to the user', error.message)
    }
  }

  const groupRef = firestore.doc(`groups/${groupID}`)
  const groupSnapshot = await groupRef.get()
  const groupInfo = groupSnapshot.data() as GroupType

  if (groupSnapshot.exists) {
    try {
      let { userIDs } = groupInfo

      if (userIDs.indexOf(userID) != -1)
        return console.log('このユーザーはすでにグループに含まれています')
      userIDs ? userIDs.push(userID) : (userIDs = [userID])

      await groupRef.update({ _updatedAt, userIDs })
    } catch (error) {
      console.log('error add user to group', error.message)
    }
  }
}

export const createPaymentsData: (
  userAuth: UserAuthType,
  props: CreatePaymentType
) => Promise<MonthlyPayments | null | undefined> = async (userAuth, props) => {
  const {
    collected,
    date,
    groupAmount,
    purchaseMemo,
    shopName,
    usage,
    userAmount
  } = props

  if (!userAuth) return

  const userID = userAuth.uid

  const userRef = firestore.doc(`users/${userID}`)
  const userSnapshot = await userRef.get()
  const userInfo = userSnapshot.data()

  if (!userInfo) return
  const { accountID, groupID } = userInfo

  if (!accountID || !groupID) return

  const accountRef = firestore.doc(`accounts/${accountID}`)
  const accountSnapshot = await accountRef.get()

  if (accountSnapshot.exists) {
    const { payments } = accountSnapshot.data() as PaymentProps

    const _updatedAt = new Date()
    const _createdAt = _updatedAt
    const targetDate = date.toLocaleDateString('ja-JP', dateOptions)
    const yearMonth = targetDate.replace(/(\d\d|\d)日.*/, '')

    const currentPayment: PaymentType = {
      _createdAt,
      _updatedAt,
      collected,
      date,
      groupID,
      groupAmount,
      purchaseMemo,
      shopName: shopName || 'その他',
      usage: usage || 'その他',
      userID,
      userAmount
    }

    try {
      if (payments) {
        payments[yearMonth]
          ? payments[yearMonth].push(currentPayment)
          : (payments[yearMonth] = [currentPayment])
        await accountRef.update({ payments })
      } else {
        const yearMonthPayment = {
          [yearMonth]: [currentPayment]
        }
        await accountRef.update({ payments: yearMonthPayment })
      }
      return payments
    } catch (error) {
      console.log('error creating payments', error.message)
    }
  }

  return null
}

export const createAccountAndGroup: (
  name: string
) => Promise<null | undefined> = async name => {
  const accountsRef = firestore.collection('accounts').doc()
  const groupsRef = firestore.collection('groups').doc()
  try {
    const _updatedAt = new Date()
    const _createdAt = _updatedAt
    accountsRef.set({
      _createdAt,
      _updatedAt
    })
    groupsRef.set({
      _createdAt,
      _updatedAt,
      name,
      accountID: accountsRef.id,
      userIDs: []
    })
    return
  } catch (error) {
    console.log('error creating user', error.message)
  }

  return null
}

export default firebase
