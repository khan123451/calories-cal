import { useState, useRef } from 'react';
import * as FileSystem from 'expo-file-system'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import ProfileFile from './profile/profile.json'
import {Picker} from '@react-native-picker/picker'

function editButton(enterText) {
  console.log(enterText)
}

async function saveData(data) {
  // Requests permissions for external directory
  const permissions = await StorageAccessFramework.requestDirectoryPermissionsAsync();

  if (permissions.granted) {
  // Gets SAF URI from response
  const uri = permissions.directoryUri;

  // Gets all files inside of selected directory
  const files = await StorageAccessFramework.readDirectoryAsync(uri);
  alert(`Files inside ${uri}:\n\n${JSON.stringify(files)}`);
  }
}

export default function EditProfile() {
  const [enterGenderStateText, setGenderStateText] = useState('' +ProfileFile.gender)
  const [enterHeightStateText, setHeightStateText] = useState('' + ProfileFile.height)
  const [enterWeightStateText, setWeightStateText] = useState('' + ProfileFile.weight)
  const [enterAgeStateText, setAgeStateText] = useState('' + ProfileFile.age)
  const [genderState, setGenderState] = useState([])
  const [heightState, setHeightState] = useState([])
  const [weightState, setWeightState] = useState([])
  const [ageState, setAgeState] = useState([])

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

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
        style={styles.TextInput}
        value={enterHeightStateText}
        onChangeText={setHeightStateText}/>
        <Text style={styles.afterText}>Please enter height in cm</Text>
        
        <Text style={styles.contentText}>Weight</Text>
        <TextInput 
        style={styles.TextInput}
        value={enterWeightStateText}
        onChangeText={setWeightStateText}/>
        <Text style={styles.afterText}>Please enter weight is in kg.</Text>


        <Text style={styles.contentText}>Age</Text>
        <TextInput 
        style={styles.TextInput}
        value={enterAgeStateText}
        onChangeText={setAgeStateText}/>
        <Text></Text>
        <Button style={styles.buttonContainer} title= 'Edit'/>
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
