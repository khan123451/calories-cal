import { useState, useRef, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import {Picker} from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function EditProfile() {
  const [enterHeightStateText, setHeightStateText] = useState('')
  const [enterWeightStateText, setWeightStateText] = useState('')
  const [enterAgeStateText, setAgeStateText] = useState('')
  const [genderState, setGenderState] = useState([])

  const pickerRef = useRef();

  const saveData = async(value) => {
    try{
      const jsonVal = JSON.stringify(value)
      await AsyncStorage.setItem('key', jsonVal)
    } catch(e) {
      console.log(e)
    }
  }

  const getData = async() => {
    try{
      const jsonVal = JSON.parse(await AsyncStorage.getItem('key'))
      setAgeStateText(jsonVal.enterAgeStateText)
      setHeightStateText(jsonVal.enterHeightStateText)
      setWeightStateText(jsonVal.enterWeightStateText)
      setGenderState(jsonVal.genderState)
    } catch(e) {
      console.log(e)
    }

  }

  useEffect(() => {getData()}, []);

  return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.contentText}>Gender</Text>
        <Picker
          ref={pickerRef}
          selectedValue={genderState}
          onValueChange={(itemValue, itemIndex) =>
            setGenderState(itemValue)
          }>
          <Picker.Item label="" value="0" />
          <Picker.Item label="Male" value="1" />
          <Picker.Item label="Female" value="2" />
          <Picker.Item label="Other" value="3" />
        </Picker>
        
        <Text style={styles.contentText}>Height</Text>
        <TextInput 
        keyboardType="numeric"
        style={styles.TextInput}
        value={enterHeightStateText}
        onChangeText={setHeightStateText}/>
        <Text style={styles.afterText}>Please enter height in cm</Text>
        
        <Text style={styles.contentText}>Weight</Text>
        <TextInput 
        keyboardType="numeric"
        style={styles.TextInput}
        value={enterWeightStateText}
        onChangeText={setWeightStateText}/>
        <Text style={styles.afterText}>Please enter weight is in kg.</Text>


        <Text style={styles.contentText}>Age</Text>
        <TextInput 
        keyboardType="numeric"
        style={styles.TextInput}
        value={enterAgeStateText}
        onChangeText={setAgeStateText}/>
        <Text></Text>
        <Button style={styles.buttonContainer} title= 'Edit' onPress={() => saveData({enterHeightStateText, enterWeightStateText, enterAgeStateText, genderState })}/>
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
    backgroundColor:'#fff'
  },
  contentText:{
    margin: 10, 
    borderWidth: 2, 
    borderColor: '#fff',
    fontWeight: 'bold'
  }, 
  TextInput: {
    backgroundColor: 'lightyellow'
  },
  buttonContainer:{
  }
});
