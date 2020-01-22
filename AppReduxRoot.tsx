import React from 'react';
import { Button } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { connect } from 'react-redux';
import { Action, Dispatch } from 'redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './src/redux/user/user.actions';
import HomeScreen from './src/screens/homescreen/homescreen';
import LoginScreen from './src/screens/loginscreen/loginscreen';
import { Props, IDispatchToProps, IStateToProps } from './src/screens/types';

class AppReduxRoot extends React.Component<Props> {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          // console.log(`snapShotId: ${snapShot.id}`);
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
        // console.log(`userRef: ${userRef}`);
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  render() {
    const { navigation } = this.props;
    return this.unsubscribeFromAuth ? (
      <HomeScreen navigation={navigation} />
    ) : (
      <LoginScreen navigation={navigation} />
    );
  }
}

AppReduxRoot.navigationOptions = ({ navigation }) => ({
  headerRight: () => (
    <Button title='＋' onPress={() => navigation.navigate('CreateNew')} />
  )
});

const mapStateToProps = ({ user }: IStateToProps) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppReduxRoot);
