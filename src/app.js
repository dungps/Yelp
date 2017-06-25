import React, { Component } from "react";
import { Text, StatusBar, View } from "react-native";
import { Provider } from "react-redux";
import RouterWithNavigator from "./components/AppNavigator";

import configureStore from "./store";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      store: module.hot && module.hot.data && module.hot.data.store
        ? module.hot.data.store
        : configureStore(() => {
            this.setState({ isLoading: false });
          })
    };
  }

  render() {
    if (this.state.isLoading) {
      return null;
    }

    return (
      <Provider store={this.state.store}>
        <View style={{ flex: 1 }}>
          <StatusBar backgroundColor="#fff" barStyle="dark-content" />
          <RouterWithNavigator />
        </View>
      </Provider>
    );
  }
}

export default App;
