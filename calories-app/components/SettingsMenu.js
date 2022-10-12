import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import EditProfile from './settings/EditProfile';
import EditDirectory from './settings/EditDirectory';

const Stack = createStackNavigator();

function ProfileScreen() {
  return (
    <EditProfile />
  );
}

function EmptyScreen() {
  return (
    <></>
  );
}

function DirectoryScreen() {
  return (
    <EditDirectory/>
  );
}

function SettingsMenu() {
  const ref = React.useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.buttonView}>
      <Button
        style={styles.settingButton}
        onPress={() => ref.current && ref.current.navigate('Profile')}
        title="Edit Profile"
      />
      <Text></Text>
      <Button
        style={styles.settingButton}
        onPress={() => ref.current && ref.current.navigate('Directory')}
        title="Edit Directory"
      />
      </View>
      <NavigationContainer ref={ref} independent={true}>
        <Stack.Navigator initialRouteName="Empty" >
          <Stack.Screen name="Empty" component={EmptyScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Profile" component={ProfileScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Directory" component={DirectoryScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  settingButton: {
    padding:10,
    backgroundColor: '#fff'
  },
  buttonView: {
    padding:10,
    backgroundColor: '#fff'
  }
});

export default SettingsMenu;
