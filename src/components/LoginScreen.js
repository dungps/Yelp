import React, { Component } from "react";
import { View, Image, Dimensions } from "react-native";
import { connect } from "react-redux";

const styles = {
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1
  }
};

class LoginScreen extends Component {
  render() {
    const { width, height } = Dimensions.get("window");
    return (
      <View style={[{ width: width, height: height }, styles.container]}>
        <Image
          source={{
            uri:
              "https://wallpaperscraft.com/image/potatoes_fries_coke_ice_hamburger_bun_sesame_vegetables_tomatoes_onions_patty_cheese_ketchup_fast_food_77805_800x1280.jpg"
          }}
          style={{
            width: width,
            height: height
          }}
        />
      </View>
    );
  }
}

export default connect()(LoginScreen);
