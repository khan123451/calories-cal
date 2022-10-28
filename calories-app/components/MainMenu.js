import { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import * as FileSystem from 'expo-file-system'
import DATA from './Items/List/list.json'
import { Ionicons } from '@expo/vector-icons'

function addFood() {
  //Call add food function

}

function addMeal(){
  //Call add meal function

}

function addFoodHelper() {
  const [foodNameState, setFoodNameState] = useState('')
  const [foodQtyState, setFoodQtyState] = useState('')
  const [foodCalState, setFoodCalState] = useState('')

  return(
<View>
    <View>
      <Text>Food Name</Text>
      <TextInput 
                blurOnSubmit
                style={styles.TextInput}
                value={foodNameState}
                onChangeText= { val => 
                  setFoodNameState(val)}/>
    </View>
    <View>
      <Text>Food Amount</Text>
      <TextInput 
                blurOnSubmit
                style={styles.TextInput}
                value={foodQtyState}
                onChangeText= { val => 
                  setFoodQtyState(val)}/>
    </View>
    <View>
      <Text>Food Calories</Text>
      <TextInput 
                blurOnSubmit
                style={styles.TextInput}
                value={foodCalState}
                onChangeText= { val => 
                  setFoodCalState(val)}/>
    </View>
    <Button color="green" title="Add" onPress={() => {
                    addFood(foodNameState, foodQtyState, foodCalState)}} />
  </View>);
}

function addMealHelper(){

  const [mealState, setMealState] = useState('');
  return(
  <View>
    <Text>Meal name</Text>
    <TextInput 
              blurOnSubmit
              style={styles.TextInput}
              value={mealState}
              onChangeText= { val => 
                setMealState(val)}/>
    <Button color="green" title="Add" onPress={() => {
                    addMeal(mealState)}} />
  </View>);
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

  const [mealState, setMealState] = useState('')

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
      <Text style={styles.foodText}>{name} </Text>
      <Text style={styles.foodText}>{amount} {unit} </Text>
      <Text style={styles.foodText}>{totAmount} Cal</Text>
    </View>);
  };

  const AddFoodIcon = () => {

    return(
    <View style={styles.addBody}>
      <></>
      <Ionicons size={36} color="white" name= "add-outline" title="Add Food" onPress={() =>{
          addFoodHelper()}}/>
      <></>
    </View>);
  };

  const AddMealIcon = () => {

    return(
    <View style={styles.mealContainer}>
      <></>
      <Ionicons size={20} color="white" name= "add-outline" title="Add Food" onPress={() =>{
          addMealHelper()}}/>
      <></>
    </View>);
  };

  const MealList = ({ title, foods }) => {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.mealContainer}>
          <Text style={styles.mealText}>{title}</Text>
        </View>
        <View style={styles.foodScreen}>
          {
            foods.map(function(object, i) {
              let totalCal = object.cal * object.amount;
              return (<Food style={styles.foodContainer} key={i} name={object.name} amount={object.amount} type= {object.type} totAmount = {totalCal} />);
            })
          }
          <View>
            <AddFoodIcon />
          </View>
        </View>
      </View>);
  }

  const DateList = ({ title, meals }) => {
    
    return (
    <View style={styles.sectionContainer}>
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{title}</Text>
    </View>
    { meals.map(function(object, i) {
      return (<MealList style={styles.mealContainer} title={object.name} foods={object.foods} key={i}/>);
      })
    }
    <View>
      <AddMealIcon />
    </View>
    </View>);}

  const renderItem = ({ item }) => {
    return (
    <DateList title={item.date} meals={item.meals} key={item.id}/>);
    };
  
  return (
    <>
    <View style={styles.fullContainer}>
      <FlatList
        data={jsonfile} 
        renderItem={renderItem} 
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.listName}>{listName}</Text>
            {/*<Ionicons style={styles.listButton} name="pencil-outline" size={20}/>*/}
          </View>
        )}
        ListHeaderComponentStyle={styles.listName}
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
  fullContainer: {
  },
  title: {
    textAlign: 'left',
    left:0,
    fontSize: 20,
  },
  sectionContainer:{
    padding: 10,
    paddingBottom:20
  },
  dateContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dateText:{
    fontSize: 24,
    fontWeight:'bold',
    color: '#333',
    fontFamily:'Roboto'
  },
  mealText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold'
  },
  mealContainer: {
    backgroundColor: 'lightpink',
    borderStyle: 'dotted',
    padding: 20,
    marginVertical:5,
    marginHorizontal:50,
    fontFamily: 'Roboto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  foodScreen: {
    marginHorizontal: 10,
    flexDirection:'row',
    flexWrap:'nowrap'
  },
  foodContainer: {
    padding: 15,
    justifyContent: 'flex-end'
  },
  foodBody: {
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'lightblue',
    padding: 20,
    marginHorizontal:15,
    marginVertical:10,
    borderRadius: 10,
    flexDirection:'column'
  },
  foodText:{
    fontWeight: 'bold',
    color: 'white',
  },
  addBody: {
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'lightblue',
    padding: 20,
    paddingVertical:40,
    marginHorizontal:15,
    marginVertical:10,
    borderRadius: 10,
    flexDirection:'column'
  },
  listName: {
    fontWeight:'bond',
    color: 'gray',
    justifyContent: 'center',
    alignItems:'center',
    fontSize:40,
    padding: 10,
    flexWrap:'nowrap'
  },
  listButton: {
    fontWeight:'bond',
    color: 'gray',
    justifyContent: 'center',
    alignItems:'center',
    paddingTop:30,
    padding: 10,
    flexWrap:'nowrap'
  },
  listHeader:{
    flexDirection:'row'
  }
});
