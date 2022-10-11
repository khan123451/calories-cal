import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import foodDirectory from './directory/directory.json'

export default function EditDirectory() {

  const [foods, setFood] = useState([])
  


  function addFood(enterText) {
    console.log(enterText)
    setFoodState(currentFood => [...currentFood, enterFoodStateText])
  }

  function editFood(enterText) {

  }

  function deleteFood(enterText) {

  }

  return (
    <View style={styles.body}>
      <View style={styles.listBody}>
        <Text style={styles.headRow}>Name</Text>
        <Text style={styles.headRow}>Type</Text>
        <Text style={styles.headRow}>Calories</Text>
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
              </View>);
          } 
        }
        keyExtractor={foodDirectory => foodDirectory.id}
        //editHandler={editHandler}
      />
        
      
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
  }
});
