import { createSwitchNavigator, createAppContainer } from "react-navigation";

// Switch Nav
import SplashScreen from "../screens/Splash";
import TableNumScreen from "../screens/TableNum";
import FinishedScreen from "../screens/Finished";
import HomeScreen from "../screens/Main/Home";

const RootNav = createSwitchNavigator({
  Splash: {
    screen: SplashScreen
  },
  TableNum: {
    screen: TableNumScreen
  },
  Main: {
    screen: HomeScreen
  },
  Finished: {
    screen: FinishedScreen
  }
}, {
  initialRouteName: 'Splash',
});

export default createAppContainer(RootNav);

