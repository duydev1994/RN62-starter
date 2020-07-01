import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import {Avatar} from 'react-native-elements';

class LoginScreen extends Component {
  state = {email: 'user@gmail.com', password: 'user'};

  loginEmail = () => {
    const {email, password} = this.state;

    console.log(email, password, this.props.actions);

    this.props.actions.loginRequest(email, password);
    //Actions.main();
  };

  render() {
    const {email, password} = this.state;
    const {user} = this.props;

    const titleConfig = {
      title: 'Login Page',
      tintColor: 'black',
    };

    let error;
    if (user.errorMessage !== '') {
      console.log('user', user, user.errorMessage);
      error = <Text style={styles.error}>{user.errorMessage}</Text>;
    }

    return (
      <SafeAreaView>
        <NavigationBar title={titleConfig} />
        {error}
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
          <View
            style={{
              backgroundColor: 'red',
              justifyContent: 'center',
            }}>
            <Avatar
              rounded
              source={{
                uri:
                  'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
              }}
            />

            <TextInput
              style={styles.input}
              placeholder="email"
              onChangeText={email => this.setState({email})}
              value={email}
            />
            <TextInput
              style={styles.input}
              placeholder="password"
              onChangeText={password => this.setState({password})}
              value={password}
            />
            <Icon.Button name="envelope-o" onPress={this.loginEmail}>
              Login
            </Icon.Button>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 20,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
  },

  input: {
    alignSelf: 'center',
    height: 44,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
  },
});

function mapStateToProps(state) {
  const {user} = state;

  return {
    user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginScreen);
