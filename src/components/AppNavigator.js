import React, { Component } from "react";
import AppNavigator from "@src/navigatorConfig";
import { connect } from "react-redux";
import { addNavigationHelpers } from "react-navigation";

class Navigator extends Component {
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    nav: state.nav
  };
};

export default connect(mapStateToProps)(Navigator);
