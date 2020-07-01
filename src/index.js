import React, {Component} from 'react';
import {Provider} from 'react-redux';
import configureStore from './store/configureStore';
import Routing from './routing';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class App extends Component {
  constructor() {
    super();
    Icon.loadFont();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({isLoading: false})),
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <Routing />
      </Provider>
    );
  }
}
