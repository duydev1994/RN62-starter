import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';
import {Input, Text, Button} from 'react-native-elements';

class LoginScreen extends Component {
  state = {email: 'user@gmail.com', password: 'user'};

  loginEmail = () => {
    const {email, password} = this.state;
    this.props.actions.loginRequest(email, password);
  };

  render() {
    const {email, password} = this.state;
    const {user} = this.props;

    let error;
    if (user.errorMessage !== '') {
      error = <Text style={styles.error}>{user.errorMessage}</Text>;
    }

    return (
      <SafeAreaView>
        <ScrollView bounces={false}>
          <KeyboardAvoidingView behavior={'position'} style={styles.container}>
            <View style={styles.container}>
              <View style={styles.boxFrom}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/Login/icon.gif')}
                />
                <Image
                  style={styles.logo}
                  source={require('../../assets/logo-trans.png')}
                />

                <View style={styles.input}>
                  {error}
                  <Input
                    containerStyle={styles.input}
                    placeholder="INPUT WITH ICON"
                    onChangeText={email => this.setState({email})}
                    value={email}
                    leftIcon={{type: 'font-awesome', name: 'envelope'}}
                  />

                  <Input
                    secureTextEntry={true}
                    containerStyle={styles.input}
                    placeholder="INPUT WITH ICON"
                    errorMessage=""
                    onChangeText={password => this.setState({password})}
                    value={password}
                    leftIcon={{type: 'font-awesome', name: 'unlock-alt'}}
                  />
                </View>
                <Button
                  buttonStyle={styles.btnLogin}
                  onPress={this.loginEmail}
                  icon={<Icon name="sign-in" size={15} color="white" />}
                  title=" Login"
                />

                <Image
                  style={styles.btnLoginFaceID}
                  onPress={this.loginEmail}
                  source={require('../../assets/Login/icon-face-id.png')}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  error: {
    color: 'red',
    textAlign: 'center',
  },
  btnLogin: {
    height: 40,
    width: 200,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 200,
    width: 200,
  },
  input: {
    width: windowWidth * 0.7,
  },
  logo: {
    height: 100,
    width: 200,
    resizeMode: 'contain',
  },
  btnLoginFaceID: {
    marginTop: 20,
    height: 50,
    width: 50,
  },
  boxFrom: {
    height: windowHeight * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
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
