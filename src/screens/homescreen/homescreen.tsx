import { Container, Toast } from 'native-base';
import React from 'react';
import { NavigationStackProp } from 'react-navigation-stack';
import NativeFooter from '../../components/native-footer/native-footer.component';
import PaymentListMonthly from '../../components/payment-list-monthly/payment-list-monthly.component';

import { connect } from 'react-redux';

interface IStateToProps {
  user: {
    currentUser: {};
  };
  currentUser: {};
}
interface INavProps {
  navigation: NavigationStackProp;
}

type Props = IStateToProps & INavProps;

class HomeScreen extends React.Component<Props> {
  componentDidMount() {
    const { currentUser } = this.props;

    if (currentUser) {
      Toast.show({
        text: 'ログインしました',
        type: 'success'
      });
    }
  }
  render() {
    return (
      <Container>
        <PaymentListMonthly navigation={this.props.navigation} />
        <NativeFooter />
      </Container>
    );
  }
}

const mapStateToProps = ({ user }: IStateToProps) => ({
  currentUser: user.currentUser
});

export default connect(mapStateToProps)(HomeScreen);
