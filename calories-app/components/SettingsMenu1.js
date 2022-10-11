import * as React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EditProfile from './settings/EditProfile';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BottomTabBarHeightCallbackContext } from '@react-navigation/bottom-tabs';

function ProfileScreen() {
  return (
    <View style={styles.subview}>
      <EditProfile />
    </View>
  );
}


function DirectoryScreen() {
  return (
    <View style={styles.subview}>
      <Text>Screen</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function SettingsMenu() {
    return (
      <>
        <Text>Test2</Text>
        <NavigationContainer>
          <Stack.Navigator style={styles.navigator}>
            <Stack.Screen style={styles.screen} name="Profile Settings" component={ProfileScreen} />
            <Stack.Screen style={styles.screen} name="Directory Settings" component={DirectoryScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
    borderRadius: 10,
  },
  navigator: {
    flex: 1
    
  },
  subview: {
    flex: 1, 
    backgroundColor: 'black',
    justifyContent: 'center',
  }
});
