import { StackNavigator } from "react-navigation";

import LoginScreen from "./components/LoginScreen";
import HomeScreen from "./components/HomeScreen";
import SettingScreen from "./components/SettingScreen";

const routeConfigs = {
  Login: {
    screen: LoginScreen
  },
  Home: {
    screen: HomeScreen
  },
  Setting: {
    screen: SettingScreen
  }
};

export default StackNavigator(routeConfigs);
