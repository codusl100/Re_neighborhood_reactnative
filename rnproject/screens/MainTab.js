import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useUserContext} from '../contexts/UserContext';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

function MainTab() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#6200ee',
        }}>
        {/* TODO: 화면 추가 */}
      </Tab.Navigator>
    );
  }
  
  export default MainTab;