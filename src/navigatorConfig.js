import { StackNavigator } from "react-navigation";

import HomeScreen from "./components/HomeScreen";
import SettingScreen from "./components/SettingScreen";

const routeConfigs = {
  Home: {
    screen: HomeScreen
  },
  Setting: {
    screen: SettingScreen,
    navigationOptions: {
      title: "Settings"
    }
  }
};

export default StackNavigator(routeConfigs);
