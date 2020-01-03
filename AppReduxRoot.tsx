import React from 'react';
import AppContainer from './AppContainer';
import { setCurrentUser } from './src/redux/user/user.actions';
import { Action, Dispatch } from 'redux';

import { connect } from 'react-redux';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import HomeScreen from './src/screens/homescreen/homescreen';
import { NavigationStackProp } from 'react-navigation-stack';
import LoginScreen from './src/screens/loginscreen/loginscreen';

interface IStateToProps {
  user: {
    currentUser: {};
  };
}
interface IDispatchToProps {
  setCurrentUser: (user: {}) => void;
}

interface INavProps {
  navigation: NavigationStackProp;
}

type Props = IStateToProps & IDispatchToProps & INavProps;

class AppReduxRoot extends React.Component<Props> {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      }

      setCurrentUser(userAuth);
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

const mapStateToProps = ({ user }: IStateToProps) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = (dispatch: Dispatch<Action>): IDispatchToProps => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(AppReduxRoot);
