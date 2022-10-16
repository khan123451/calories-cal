import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import foodDirectory from './directory/directory.json'
import { Ionicons } from '@expo/vector-icons'


function addFood() {
  console.log()
  //setFoodState(currentFood => [...currentFood, enterFoodStateText])
}

function editFood(enterText) {

}

function deleteFood(enterText) {

}

export default function EditDirectory() {

  const [foods, setFood] = useState([])
  
  const AddItem = () => {

    return(
    <View style={styles.addButton}>
      <Ionicons size={45} color="white" name= "add-outline" title="Add Food" onPress={() =>{
          addFood()}}/>
    </View>);
  };

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
          let unit = '';
          switch(item.type){
            case 0:
              unit = 'kg';
              break;
            case 1:
              unit = 'lb';
              break;
            default:
              unit = 'ams';
          }
        return(<View style={styles.listBody}>
                <Text style={styles.row}>{item.name}</Text>
                <Text style={styles.row}>{unit}</Text>
                <Text style={styles.row}>{item.cal}</Text>
                <Ionicons style={styles.row} name= "close-outline" size="large" color="gray"/>
              </View>);
          } 
        }
        keyExtractor={foodDirectory => foodDirectory.id}
      />
        
      <AddItem/>
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
    height:10,
    flex:1
  },
});
