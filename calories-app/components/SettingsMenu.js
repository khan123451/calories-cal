import * as React from 'react';
import { View, Text, Button } from 'react-native';
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

function App() {
  const ref = React.useRef(null);

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer ref={ref} independent={true}>
        <Stack.Navigator initialRouteName="Empty">
          <Stack.Screen name="Empty" component={EmptyScreen} />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Directory" component={DirectoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Button
        onPress={() => ref.current && ref.current.navigate('Profile')}
        title="Edit Profile"
      />

      <Button
        onPress={() => ref.current && ref.current.navigate('Directory')}
        title="Edit Directory"
      />
    </View>
  );
}

export default App;
