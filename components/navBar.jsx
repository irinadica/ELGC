import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import HomeScreen from "../app/(tabs)/home";
import Basket from "../app/(tabs)/basket";
import Profile from "../app/(tabs)/profile";
import Menu from "../app/(tabs)/menu";
import { NavigationContainer } from "@react-navigation/native";

export default function Navigation(){

    const Tab=createBottomTabNavigator();

return(
    <NavigationContainer independent={true}>
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Basket' component={Basket}/>
      <Tab.Screen name='Menu' component={Menu}/>
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  </NavigationContainer>
)
}