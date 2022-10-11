import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import BottomBar from './components/BottomBar'
//import SettingsMenu from './components/SettingsMenu'
//import MainMenu from './components/MainMenu'
//import CameraMenu from './components/CameraMenu';

export default function App() {

  return (
    <View style={styles.container}>
      <BottomBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});