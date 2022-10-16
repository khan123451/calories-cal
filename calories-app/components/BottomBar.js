import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CameraMenu from './CameraMenu';
import MainMenu from './MainMenu';
import SettingsMenu from './SettingsMenu';

function CameraScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'stretch' }}>
        <CameraMenu />
      </View>
    );
}

function MenuScreen() {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'stretch' }}>
      <MainMenu />
    </View>
  );
}



function SettingsScreen() {
  return (
    <SettingsMenu />
  );
}

const Tab = createBottomTabNavigator();

export default function BottomBar() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
        let iconName
        if (route.name === 'Camera'){
            iconName = focused ? 'ios-camera'
            : 'ios-camera-outline'
        } else if (route.name === 'Menu') {
            iconName = focused ? 'ios-menu'
            : 'ios-menu-outline'
        } else if (route.name === 'Settings') {
            iconName = focused ? 'ios-settings' : 'ios-settings-outline'
        }
        return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen style={styles.appIcon} name="Camera" component={CameraScreen} options={{unmountOnBlur: true}} />
        <Tab.Screen style={styles.appIcon} name="Menu" component={MenuScreen} options={{unmountOnBlur: true}} />
        <Tab.Screen style={styles.appIcon} name="Settings" component={SettingsScreen} options={{unmountOnBlur: true}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    appIcon: {
        position: "relative",
        backgroundColor: '#000fff',
    },
    appText:{
    },
    bottomBar:{
  
    }
  });