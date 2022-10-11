import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import * as FileSystem from 'expo-file-system';

export default function MainMenu() {

  const [enterDateStateText, setDateStateText] = useState('')
  const [enterMealStateText, setMealStateText] = useState('')
  const [enterFoodStateText, setFoodStateText] = useState('')
  const [foodState, setFoodState] = useState([])

  const localtext = {};

  function addDate(enterText) {

  }

  function addMeal(enterText) {

  }

  function addFood(enterText) {
    console.log(enterText)
    setFoodState(currentFood => [...currentFood, enterFoodStateText])
  }

  function editDate(enterText) {

  }

  function editMeal(enterText) {

  }

  function editFood(enterText) {

  }

  function deleteDate(enterText) {

  }

  function deleteMeal(enterText) {

  }

  function deleteFood(enterText) {

  }

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.TextInput}
        placeholder="The name of the food"/>

        <TextInput 
        style={styles.TextInput}
        placeholder="The calorie of the food"/>
        
        <TextInput 
        style={styles.TextInput}
        placeholder="The calorie of the food"/>

        <Button title= 'Add a food'/>
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer:{

  },
  contentText:{
    margin: 10, 
    borderWidth: 2, 
    borderColor: '#fff',
  }
});
