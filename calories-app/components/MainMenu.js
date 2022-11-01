import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, FlatList, TextInput, Button, Pressable } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { addFood, addMeal, addDate, getData, removeDate, removeMeal, removeFood } from './data/MenuController'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

function addDateHelper(date) {
  //Call add food function
  return addDate(date)
}

function addMealHelper(date, meal){
  //Call add meal function
  return addMeal(date, meal)
}

function addFoodHelper(date, meal, food, qty, cal) {
  //Call add food function
  return addFood(date, meal, food, qty, cal)
}

function removeDateHelper(date) {
  //Call remove food function
  return removeDate(date)
}

function removeMealHelper(date, meal){
  //Call remove meal function
  return removeMeal(date, meal)
}

function removeFoodHelper(date, meal, food) {
  //Call remove food function
  return removeFood(date, meal, food)
}

export default function MainMenu() {
  const ref = React.useRef(null)
  const [menuVal, setMenu] = useState([])

  //console.log('test: ' + JSON.stringify(menuVal))
  const jsonfile = menuVal.list
  const listName = menuVal.name
  const [reload, setReload] = useState(0)
  const [dateButtonShow, setDateButtonShow] = useState(false);
  useEffect(() => {
    getData().then(menuVal => setMenu(menuVal))
  }, [reload])

  const AddFoodScreen = ({ dateVal, mealVal }) => {
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
                  keyboardType="numeric"
                  style={styles.TextInput}
                  value={foodQtyState}
                  onChangeText= { val => 
                    setFoodQtyState(val)}/>
      </View>
      <View>
        <Text>Food Calories</Text>
        <TextInput 
                  blurOnSubmit
                  keyboardType="numeric"
                  style={styles.TextInput}
                  value={foodCalState}
                  onChangeText= { val => 
                    setFoodCalState(val)}/>
      </View>
      <Button color="green" title="Add Food" onPress={() => {
                      addFoodHelper(dateVal, mealVal, foodNameState, foodQtyState, foodCalState).then(() => {
                        setReload((r)=>r+1)
                      });
                      }} />
    </View>);
  };

  const AddFoodView = ({ dateVal, mealVal }) => {
    const Stack = createStackNavigator()


    return(
      <View styel={styles.AddFoodScreen}>
        <AddFoodScreen dateVal={dateVal} mealVal={mealVal}/>
      <NavigationContainer ref={ref} independent={true}>
        <Stack.Navigator style={{ flex: 1 }} >
          <Stack.Screen name="AddFood" component={AddFoodScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>);
  };

  const AddMealScreen = ({ dateVal }) => {

    const [mealState, setMealState] = useState('');

    return(
    <View style={styles.addMealScreen}>
      <Text>Meal</Text>
      <TextInput 
                blurOnSubmit
                style={styles.TextInput}
                value={mealState}
                onChangeText= { val => 
                  setMealState(val)}/>
      <Button color="green" title="Add Meal" onPress={() => {
                      addMealHelper(dateVal, mealState).then(() => {
                        setReload((r)=>r+1)
                      });
                      }} />
    </View>);
  };

  const AddMealView = ({ dateVal }) => {
    const Stack = createStackNavigator()

    return(
      <View styel={styles.AddMealScreen}>
        <AddMealScreen dateVal={dateVal}/>
      <NavigationContainer ref={ref} independent={true}>
        <Stack.Navigator style={{ flex: 1 }} >
          <Stack.Screen name="AddMeal" component={AddMealScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>);
  };

  const AddDateScreen = () => {

    const [dateState, setDateState] = useState('');
    return(
    <View style={styles.AddDateScreen}>
      <Text>Date</Text>
      <TextInput 
                blurOnSubmit
                style={styles.TextInput}
                value={dateState}
                onChangeText= { val => 
                  setDateState(val)}/>
      <Button color="green" title="Add Date" onPress={() => {
                      addDateHelper(dateState).then(() => {
                        setReload((r)=>r+1)
                      });
                      }} />
    </View>);
  };

  const AddDateView = () => {
    const Stack = createStackNavigator()

    return(
      <View styel={styles.AddDateScreen}>
        <AddDateScreen />
      <NavigationContainer ref={ref} independent={true}>
        <Stack.Navigator style={{ flex: 1 }} >
          <Stack.Screen name="AddDate" component={AddDateScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
      </View>);
  };

  const Food = ({ date, meal, name, amount, type, totAmount}) => {
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
      <Ionicons style={styles.deleteFood} name= "close-outline" size={20} color="gray" onPress = { () => {
                  removeFoodHelper(date, meal, name).then(() => {
                    setReload((r)=>r+1)
                  });
                }}/>
    </View>);
  };

  const MealList = ({ date, title, foods }) => {

  const [foodButtonShow, setFoodButtonShow] = useState(false);

    return (
      <View style={styles.viewContainer}>
        <View style={styles.mealContainer}>
          <Text style={styles.mealText}>{title}</Text>
          <Ionicons style={styles.deleteMeal} name= "close-outline" size={20} color="gray" onPress = { () => {
                  removeMealHelper(date, title).then(() => {
                    setReload((r)=>r+1)
                  });
                }}/>
        </View>
        {
          foods && foods.map(function(object, i) {
            let totalCal = object.cal * object.amount;
            return (<Food style={styles.foodContainer} date={date} meal={title} name={object.name} amount={object.amount} type= {object.type} totAmount = {totalCal} />);
          })
        }
        <View>
          <View style={styles.foodContainer}>
            {foodButtonShow? <AddFoodView dateVal={date} mealVal={title}/>:
          <View style={styles.addFood}>
            <Pressable
                    style={styles.addButton}
                    onPress={() => {
                      setFoodButtonShow(!foodButtonShow)
                      ref.current && ref.current.navigate('AddFood')}}
                    >
            <Text>+ Food</Text>
            </Pressable>
            </View>}
          </View>
        </View>
      </View>);
  }

  const DateList = ({ title, meals }) => {
    const [mealButtonShow, setMealButtonShow] = useState(false);

    return (
    <View style={styles.sectionContainer}>
    <View style={styles.dateContainer}>
      <Text style={styles.dateText}>{title}</Text>
      <Ionicons style={styles.deleteDate} name= "close-outline" size={20} color="gray" onPress = { () => {
          removeDateHelper(title).then(() => {
            setReload((r)=>r+1)
          });
        }}/>
    </View>
    { meals && meals.map(function(object, i) {
      return (<MealList style={styles.mealContainer} date={title} title={object.name} foods={object.foods}/>);
      })
    }
    <View>
      <View style={styles.mealContainer}>
        {mealButtonShow? <AddMealView dateVal={title}/>:
      <View style={styles.addMeal}>
        <Pressable
                style={styles.addButton}
                onPress={() => {
                  setMealButtonShow(!mealButtonShow)
                  ref.current && ref.current.navigate('AddMeal')}}
              >
        <Text>+ Meal</Text>
        </Pressable>
        </View>}
      </View>
    </View>
    </View>);}

  const renderItem = ({ item }) => {
    return (
    <DateList title={item.date} meals={item.meals}/>);
    };

  return (
    <>
    <View style={styles.fullContainer}>
      <FlatList
        data={jsonfile} 
        renderItem={renderItem} 
        keyExtractor={item => item.date}
        ListHeaderComponent={() => (
          <View style={styles.listHeader}>
            <Text style={styles.listName}>{listName}</Text>
            {/*<Ionicons style={styles.listButton} name="pencil-outline" size={20}/>*/}
          </View>
        )}
        ListHeaderComponentStyle={styles.listName}
      />
      <View style={styles.dateContainer}>
      {dateButtonShow? <AddDateView/>:
      <View style={styles.addDate}>
        <Pressable
                style={styles.addButton}
                onPress={() => {
                  setDateButtonShow(!dateButtonShow)
                  ref.current && ref.current.navigate('AddDate')}}
              >
        <Text>+ Date</Text>
        </Pressable>
        </View>}
      </View>
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
  viewContainer: {
    padding: 10,
    paddingBottom:10
  },
  sectionContainer:{
    padding: 10,
    paddingBottom:10
  },
  dateContainer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  dateText:{
    fontSize: 24,
    fontWeight:'bold',
    color: '#333',
    fontFamily:'Roboto'
  },
  mealText: {
    fontSize: 20,
    color: 'gray',
    fontWeight: 'bold'
  },
  mealContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    Color: 'grey',
    padding: 5,
    paddingVertical:10,
    marginHorizontal:60,
    marginVertical:10,
    borderRadius: 10,
    flexWrap:'nowrap'
  },
  foodScreen: {
    marginHorizontal: 10,
    flexDirection:'row',
    flexWrap:'nowrap'
  },
  foodContainer: {
    padding: 15,
    justifyContent: 'center',
    flexWrap:'nowrap'
  },
  foodBody: {
    flexDirection:'column',
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: 'lightblue',
    padding: 20,
    marginHorizontal:15,
    marginVertical:10,
    borderRadius: 10
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
    borderRadius: 10
  },
  dateContainer: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    Color: 'grey',
    padding: 5,
    paddingVertical:10,
    marginHorizontal:60,
    marginVertical:10,
    borderRadius: 10,
    flexWrap:'nowrap'
  },
  AddDateScreen:{
    marginBottom:50,
    width:100
  },
  deleteDate:{
    flexWrap:'nowrap'
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
  },
  AddMealScreen:{
    position:'absolute'
  },
  addButton:{
    backgroundColor: 'lightpink',
    padding: 15,
    marginVertical:5,
    marginHorizontal:50,
    fontFamily: 'Roboto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  }
});
