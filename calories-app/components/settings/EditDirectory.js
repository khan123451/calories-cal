import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TextInput, Button, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { addDirectory, removeDirectory, getData as getDirData } from '../data/DirectoryController'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'


function addDirectoryHelper(name, type, cal) {
  return addDirectory(name, type, cal)
}

function removeDirectoryHelper(name, unit, cal) {
  removeDirectory(name, unit, cal)
}

export default function EditDirectory() {
  const [nameState, setNameState] = useState('')
  const [typeState, setTypeState] = useState('')
  const [calState, setCalState] = useState('')
  const [buttonShow, setButtonShow] = useState(false);
  const [reload, setReload] = useState(0);
  const ref = React.useRef(null)
  const [foodDirectory, setFood] = useState([]);
  useEffect(() => {
    getDirData().then(food => setFood(food))
  }, [reload])
  
  const AddItem = () => {
    const Stack = createStackNavigator()

    return(
      <View>
        <AddDirectoryScreen />
      <NavigationContainer ref={ref} independent={true}>
        <Stack.Navigator style={{ flex: 1 }} >
          <Stack.Screen name="Add" component={AddDirectoryScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>);
  };

  const AddDirectoryScreen = () => {
    
    return (
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <Text style={styles.contentText}>Name</Text>
        <TextInput 
        style={styles.TextInput}
        value={nameState}
        onChangeText={txt => setNameState(txt)}/>
      </View>
        
      <View style={styles.inputContainer}>
        <Text style={styles.contentText}>Type</Text>
        <TextInput 
        style={styles.TextInput}
        value={typeState}
        onChangeText={txt => setTypeState(txt)}/>
      </View>
      
      <View style={styles.inputContainer}>
        <Text style={styles.contentText}>Calories</Text>
        <TextInput 
        keyboardType="numeric"
        style={styles.TextInput}
        value={calState}
        onChangeText={txt => setCalState(txt)}/>
      </View>
      <Text></Text>
      <Button style={styles.buttonContainer} title= 'Add To Directory' onPress={() => 
        {
          addDirectoryHelper(nameState, typeState, calState).then(() => {
            setReload((r)=>r+1)
          });
  
        }}/>
    </View>
    );
  }

  return (
    <View style={styles.body}>
      <View style={styles.listBody}>
        <Text style={styles.headRow}>Name</Text>
        <Text style={styles.headRow}>Type</Text>
        <Text style={styles.headRow}>Calories</Text>
        <Text style={styles.headRow}></Text>
      </View>
      <FlatList
        data={foodDirectory} 
        renderItem={({ item }) => {
          //console.log(item);
          let unit = '';
          switch(item.type){
            case 0:
              unit = 'kg';
              break;
            case 1:
              unit = 'lb';
              break;
            default:
              unit = 'qty';
          }
        return(<View style={styles.listBody}>
                <Text style={styles.row}>{item.name}</Text>
                <Text style={styles.row}>{unit}</Text>
                <Text style={styles.row}>{item.cal}</Text>
                <Ionicons style={styles.row} name= "close-outline" size="large" color="gray" onPress = { () => {
                  removeDirectoryHelper(item.name, item.type, item.cal)
                  setReload((r)=>r+1)
                }}/>
              </View>);
          } 
        }
        keyExtractor={foodDirectory => foodDirectory.name}
      />
      <View style={styles.bottomView}>
        {buttonShow? <AddItem/>:
        <Pressable
                style={styles.addButton}
                onPress={() => {
                  setButtonShow(!buttonShow)
                  ref.current && ref.current.navigate('Add')}}
              >
        <Text>+</Text>
        </Pressable>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: '#fff'
  },
  listBody:{
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: 0.5
  },
  headRow:{
    borderColor: '#fff',
    flex:1,
    fontSize:14,
    fontWeight: 'bold',
    paddingHorizontal: 4,
    paddingVertical:15
  },
  row:{
    borderColor: '#fff',
    flex:1,
    fontSize:12,
    paddingHorizontal:2,
    paddingVertical:15
  },
  addButton: {
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor:'lightblue',
    marginTop:250,
    height:50,
    paddingHorizontal:100,
    flex:1
  },
  addItem: {
    flex:1,
    alignItems: 'center',
    justifyContent:'center'
  }, 
  appContainer: {
    flex:1,
    marginTop:0,
    padding:100,
    position:'absolute',
    left:-100

  },
  inputContainer: {
    flex:1,
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center'
  }, 
  TextInput: {
    backgroundColor:'lightyellow',
    width:200
  },
  bottomView: {
    position:'absolute',
    left:100,
    marginTop: 400
  }
});
