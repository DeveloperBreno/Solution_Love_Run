
import 'react-native-gesture-handler';

import React from 'react';
import { Button, View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from '../styles/index';

//telas dentro do TabNavigator
import ExploreScreen from '../pages/Explore';
import MatchesScreen from '../pages/Matches';
import ChatScreen from '../pages/Chat';
import ProfileScreen from '../pages/Profile';

// https://icons.expo.fyi/
import { SimpleLineIcons, FontAwesome, MaterialCommunityIcons, Feather, AntDesign, Entypo, Ionicons,  MaterialIcons, FontAwesome5, Octicons} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();


export default function MyTabs() {
  return(
    <Tab.Navigator>

      <Tab.Screen 
        name="Encontrar" 
        component={ExploreScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const iconFocused = focused ? "#f7b900" : "#5f6368";
            return ( 
              <Text style={[styles.iconMenu, {color: iconFocused}]}>
                <AntDesign name="find" size={25} style={{color: iconFocused}} />
              </Text>
            );
          }
        }}
       />
       
      <Tab.Screen 
        name="MATCHES" 
        component={MatchesScreen}
        options={{
          tabBarIcon: ({focused}) => {
            const iconFocused = focused ? "#f7b900" : "#5f6368";
            return (
              <Text style={[styles.iconMenu, {color: iconFocused}]}>
                <AntDesign name="hearto" size={25} style={{color: iconFocused}} />
              </Text>
            );
          }
        }} 
      />

      <Tab.Screen
        name="CHAT" 
        component={ChatScreen} 
        options={{
          tabBarIcon: ({focused}) => {
            const iconFocused = focused ? "#f7b900" : "#5f6368";
            return (
              <Text style={[styles.iconMenu, {color: iconFocused}]}>
                <MaterialIcons name="chat-bubble-outline" size={25} style={{color: iconFocused}} />
              </Text>
            );
          }
        }} 
      />

      <Tab.Screen
        name="PROFILE" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({focused}) => {
            const iconFocused = focused ? "#f7b900" : "#5f6368";
            return (
              <Text style={[styles.iconMenu, {color: iconFocused}]}>
                <AntDesign name="user" size={24} style={{color: iconFocused}} />
              </Text>
            );
          }
        }} 
      />       
      
    </Tab.Navigator>
  );
}