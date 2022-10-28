import AsyncStorage from '@react-native-async-storage/async-storage'
import Directory from '../Items/List/list.json'
import { useState } from 'react'

const [menuState, setMenuState] = useState([])

Date.prototype.toShortFormat = function() {

  const monthNames = ["JAN", "FEB", "MAR", "APR",
                      "MAY", "JUN", "JUL", "AUG",
                      "SEP", "OCT", "NOV", "DEC"];
  
  const day = this.getDate();
  
  const monthIndex = this.getMonth();
  const monthName = monthNames[monthIndex];
  
  const year = this.getFullYear();
  
  return day + "-" + monthName + "-" + year;  
}

async function saveData(value) {
  try{
    const jsonVal = JSON.stringify(value)
    await AsyncStorage.setItem('menu', jsonVal)
    let keyVal = await AsyncStorage.getItem('menu')
  } catch(e) {
    console.log(e)
  }
}

async function getData() {
  try{
    const jsonVal = JSON.parse(await AsyncStorage.getItem('menu'))
    setMenuState(jsonVal)
  } catch(e) {
    console.log(e)
  }

}

function addFood (Date, Meal, food, qty) {
  var jsonfileData = menuState
  var hasDate = false
  var MealVal = Meal == "" ? "Meal Scan" : Meal
  var DateVal = Date == "" ? new Date().toShortFormat() : Date
  
  for (var i in jsonfileData.list){
    console.log(jsonfileData.list[i])
    if(jsonfileData.list[i].date == DateVal){
      hasDate = true
      for(var j in jsonfileData.list[i].meals){
        if(jsonfileData.list[i].meals[j].name == "Meal Scan" && Meal == ""){
          var foodJson = {
                  "id": 0,
                  "name":food,
                  "type": 0,
                  "amount": qty,
                  "cal": getCal(food)
          }
          jsonfileData.list[i].meals[j].foods.append(foodJson)
        } else{
          var mealJson = {
            "id": 0,
            "name": MealVal,
            "foods":[{
                    "id": 0,
                    "name":food,
                    "type": 0,
                    "amount": qty,
                    "cal": getCal(food)
            }]
          }
          jsonfileData.list[i].meals[j].meals.append(mealJson)
        }
      }
    }
  }
  if (!hasDate){
    var dateJson = [{
      "id": 0,
      "date": DateVal,
      "meals": [{
          "id": 0,
          "name": MealVal,
          "foods":[{
                  "id": 0,
                  "name":food,
                  "type": 0,
                  "amount": qty,
                  "cal": getCal(food)
          }]
        }]
    }]
    jsonfileData.list.append(dateJson)
  }
  saveData(jsonfileData)
}

function getCal(food){
 for(var i in Directory){
  if(Directory[i].name = food){
    return Directory[i].cal
  }
 }
}

function addMeal(Date, Meal){

}

