import { View, Text, Image } from 'react-native';
import React from 'react';
import {icons} from '../../constants';
import { createMaterialBottomTabNavigator } from 'react-native-paper/react-navigation';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './home';
import Profile from './profile';
import Basket from './basket';
import Menu from './menu';
import { NavigationContainer } from '@react-navigation/native';
import AdultsInfo from '../(content)/adultsInfo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import KidsInfo from '../(content)/kidsInfo';
import Booking from '../(content)/bookings';
import Hire from '../(content)/hire';
import HolidayCamp from '../(content)/holidayCamp';
import Membership from '../(content)/membership';
import Parties from '../(content)/parties';
import Softplay from '../(content)/softplay';
import KidsEnrol from '../(content)/kidsEnrol';
import Contact from '../(content)/contact';
import KidsEnrol_Info from '../(content)/kidsEnrol_kidInfo';
import Classes from '../(content)/classes';





const TabIcon=({icon, color, name, focused})=>{
  return(
    <View className="items-center justify-center gap-2">
      <Image source={icon}
      resizeMode="contain"
      style={{tintColor: color}}
      className='w-8 h-6'/>
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-s`} style={{color:color}}>{name}</Text>
    </View>
  )
}
const Tab=createBottomTabNavigator();
const StackNav=createStackNavigator();

function TabNavigator(){
  return (

    <Tab.Navigator
    screenOptions={{
      tabBarShowLabel: false,
      tabBarActiveTintColor: '#0E578A',
      tabBarInactiveTintColor: '#3b82f6',
      tabBarShowLabel: false,
      tabBarStyle:{
          backgroundColor: '#bfdbfe80',
          borderTopWidth:1,
          borderTopColor: "#9CC6F740",
          height: 84,
          padding: 3
      }
  }}
    >
      <Tab.Screen name='Home' component={StackNavigator} 
      options={{
        title: 'Home',
        headerShown: false,
        tabBarIcon: ({color, focused})=>(
          <TabIcon
          icon={icons.home}
          color={color}
          name="Home"
          focused={focused}
          />
        ),
      }}/>
      <Tab.Screen name='Profile' component={Profile} 
      options={{
        title: 'Profile',
        headerStyle:{backgroundColor: '#bfdbfe80' },
        tabBarIcon: ({color, focused})=>(
          <TabIcon
          icon={icons.user}
          color={color}
          name="Profile"
          focused={focused}
          />
        ),
      }}/>
      <Tab.Screen name='Cart' component={Basket}
      options={{
        title: 'Cart',
        headerStyle:{backgroundColor: '#bfdbfe80' },
        tabBarIcon: ({color, focused})=>(
          <TabIcon
          icon={icons.basket}
          color={color}
          name="Cart"
          focused={focused}
          />
        ),
      }}/>
      <Tab.Screen name='Menu' component={Menu}
      options={{
        title: 'Menu',
        headerStyle:{backgroundColor: '#bfdbfe80' },
        tabBarIcon: ({color, focused})=>(
          <TabIcon
          icon={icons.menu}
          color={color}
          name="Menu"
          focused={focused}
          />
        ),
      }}/>
    </Tab.Navigator>
    )
}
function StackNavigator(){
  return(
    <StackNav.Navigator screenOptions={{headerStyle:{backgroundColor: '#bfdbfe80' }}}>
      <StackNav.Screen name='home' component={HomeScreen} options={{headerTitle: 'Home'}}/>
      <StackNav.Screen name='profile' component={Profile} options={{headerTitle: 'Profile'}}/>
      <StackNav.Screen name='basket' component={Basket} options={{headerTitle: 'Cart'}}/>
      <StackNav.Screen name='menu' component={Menu} options={{headerTitle: 'Menu'}}/>
      <StackNav.Screen name='kidsInfo' component={KidsInfo} options={{headerTitle: 'Kids Gymnastics'}}/>
      <StackNav.Screen name='bookings' component={Booking} options={{headerTitle: 'Bookings'}}/>
      <StackNav.Screen name='hire' component={Hire} options={{headerTitle: 'Hire'}}/>
      <StackNav.Screen name='holidayCamp' component={HolidayCamp} options={{headerTitle: 'Holiday Camp'}}/>
      <StackNav.Screen name='membership' component={Membership} options={{headerTitle: 'Membership'}}/>
      <StackNav.Screen name='parties' component={Parties} options={{headerTitle: 'Parties'}}/>
      <StackNav.Screen name='softplay' component={Softplay} options={{headerTitle: 'Softplay'}}/>
      <StackNav.Screen name='adultsInfo' component={AdultsInfo} options={{headerTitle: 'Adult Gymnastics'}}/>
      <StackNav.Screen name='kidsEnrol' component={KidsEnrol} options={{headerTitle: 'Enrolment'}}/>
      <StackNav.Screen name='kidsEnrol_kidInfo' component={KidsEnrol_Info} options={{headerTitle: 'Enrolment'}}/>
      <StackNav.Screen name='contact' component={Contact} options={{headerTitle: 'Contact Us'}}/>
      <StackNav.Screen name='classes' component={Classes} options={{headerTitle: 'Classes'}}/>
    </StackNav.Navigator>
  )
}

const MainLayout = () => {
  return (
    <NavigationContainer independent='true'>
      <TabNavigator/>
    </NavigationContainer>
    )
  }
export default MainLayout

