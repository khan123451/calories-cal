import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import * as FileSystem from 'expo-file-system'
import DATA from './Items/List/list.json'

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

export default function MainMenu() {

  /*
  const [enterDateStateText, setDateStateText] = useState('')
  const [enterMealStateText, setMealStateText] = useState('')
  const [enterFoodStateText, setFoodStateText] = useState('')
  const [foodState, setFoodState] = useState([])
  */

  const jsonfile = DATA.list;
  const listName = DATA.name;

  const Food = ({ name, amount, type, totAmount}) => {
    let unit = '';
    switch(type){
      case 0:
        unit = 'kg';
        break;
      case 1:
        unit = 'lb';
        break;
      default:
        unit = 'ams';
    }

    return(
    <View style={styles.foodBody}>
    <Text>Name: {name} </Text>
    <Text>Quantity: {amount} {unit} </Text>
    <Text>Total Calories: {totAmount} </Text>
    </View>);
  };

  const MealList = ({ title, foods }) => {
    return (
      <>
      <Text style={styles.mealText}>{title}</Text>
      {
        foods.map(function(object, i) {
          let totalCal = object.cal * object.amount;
          return (<Food style={styles.foodContainer} key={i} name={object.name} amount={object.amount} type= {object.type} totAmount = {totalCal} />);
        })
      }
      </>);
  }
  
  /*
  const editDateHandler = (todoKey, newText) => {
    const newTodos = [...todos];
    const index = newTodos.findIndex(todos => todos.key === todoKey);
    newTodos[index] = Object.assign(newTodos[index], { value: newText });
  
    setTodos(newTodos);
  };
  */

  const DateList = ({ title, meals }) => {
    
    return (
    <>
    <Text style={styles.dateContainer}>{title}</Text>
    { meals.map(function(object, i) {
      return (<MealList style={styles.mealContainer} title={object.name} foods={object.foods} key={i}/>);
      })
    }
    </>);}

  const renderItem = ({ item }) => {
    return (
    <DateList title={item.date} meals={item.meals} key={item.id}/>);
    };
  
  return (
    <>
    <View>
    <Text style={styles.listName}>{listName}</Text>
      <FlatList
        data={jsonfile} 
        renderItem={renderItem} 
        keyExtractor={item => item.id}
        //editHandler={editHandler}
      />
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  item: {
    left:0,
    backgroundColor: '#fff',
    marginVertical: 8,
    marginHorizontal: 200,
  },
  title: {
    textAlign: 'left',
    left:0,
    fontSize: 20,
  },
  dateContainer: {
    fontSize: 24
  },
  mealText: {
    fontSize: 20,
    color: 'orange',
    fontWeight: 'bold'
  },
  mealContainer: {
    backgroundColor: 'red',
    padding: 20,
  },
  foodContainer: {
    padding: 15,
    justifyContent: 'flex-end'
  },
  foodBody: {
    backgroundColor: 'lightblue',
    marginHorizontal:15,
    marginVertical:10,
    flexDirection:'column'
  },
  listName: {
    fontWeight:'bond',
    fontSize:40,
    padding: 10
  }
});
