import AsyncStorage from '@react-native-async-storage/async-storage'
import Directory from '../Items/List/list.json'

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

export async function saveData(value) {
  try{
    const jsonVal = JSON.stringify(value)
    await AsyncStorage.setItem('menu', jsonVal)
  } catch(e) {
    console.log(e)
  }
}

export async function defaultVal(){
  let defaultMenu = {
    name: 'My Dietary',
    list:[]
  }
  const jsonVal = JSON.stringify(defaultMenu)
  await AsyncStorage.setItem('menu', jsonVal)
}

export async function getData() {
  try{
    const jsonVal = JSON.parse(await AsyncStorage.getItem('menu'))
    if(jsonVal == null){
      await defaultVal()
      jsonVal = JSON.parse(await AsyncStorage.getItem('menu'))
      return jsonVal
    }

    return jsonVal
  } catch(e) {
    console.log(e)
  }

}

export async function removeDate(dateVal) {
  try{
    let fullJSON= await getData()
    fullJSON.list = fullJSON.list.filter(function(e){
        return (e.date !== dateVal)
    });
    saveData(fullJSON);
  }
  catch(error){
      console.log(error)
  }
}

export async function removeMeal(dateVal, nameVal) {
  try{
    let fullJSON= await getData();
    let listJSON = fullJSON.list
    let alteredList = listJSON.filter(function(e){
        return (e.date == dateVal)
    });
    let alteredDate = alteredList.meals.filter(function(e){
      return (e.name !== nameVal)
    });
    saveData(fullJSON);
  }
  catch(error){
      console.log(error)
  }
}

export async function removeFood(dateVal, mealVal, foodVal) {
  try{
    let fullJSON= await getData()
    fullJSON.list.filter(function(e){
      if (e.date == dateVal){
        e.meals.filter(function(f){
          if(f.name == mealVal){
            f.foods = f.foods.filter(
              function(g){
                if(g.name !== foodVal){
                  return g
                }
              }
            )
          }
          return f
        })
      }
      return e
  });
    saveData(fullJSON);
  }
  catch(error){
      console.log(error)
  }
}

export async function addDate(dateVal) {
  if (dateVal == ''){
    dateVal = new Date().toShortFormat()
  }
  const jsonVal = await getData()
  let dateCheck = jsonVal.list.filter(function(e){
    try{
      return (e.date == dateVal)
    } catch{
      return '';
    }
  });
  if(JSON.stringify(dateCheck) != '[]'){
    alert('Date already existed!')
  } else {
    let newDate = {
      date: dateVal,
      meals:[]
    }
    jsonVal.list.push(newDate)
    saveData(jsonVal)
  }
}


export async function addMeal(dateVal, nameVal){
  if (dateVal == ''){
    dateVal = new Date().toShortFormat()
  }
  if (nameVal == ''){
    alert('Meal cannot be none!')
    return ;
  }
  var jsonVal = await getData();

  var dateCheck = jsonVal.list.filter(function(e){
    return (e.date == dateVal)
  })

  if(dateCheck == ''){
    alert('Date has not been created! Please create date first')
  }

  jsonVal.list.filter(function(e){
    if (e.date == dateVal){
      var mealCheck = e.meals.filter(function(f) {
        return f.name == nameVal
      })
      if(mealCheck ==''){
        let newMeal = {
          name: nameVal,
          foods:[]
        }
        e.meals.push(newMeal)
      } else{
        alert('Meal already existed!')
      }
    }
    return e;
  })
  saveData(jsonVal)
}

export async function addFood (dateVal, mealVal, foodVal, qtyVal, calVal) {
  if(dateVal == ""){
    dateVal = new Date().toShortFormat()
  }

  if(mealVal == ""){
    mealVal = "Meal Scan"
  }

  if (foodVal == ''){
    alert('Food name cannot be none!')
    return ;
  }

  if (qtyVal == ''){
    alert('Quantity cannot be none!')
    return ;
  }

  if (calVal == ''){
    calVal = getCal(foodVal)
    if (!calVal){
      alert('Calorie cannot be none!')
      return ;
    }
  }
  var jsonVal = await getData()

  var dateCheck = jsonVal.list.filter(function(e){
    return (e.date == dateVal)
  })

  if(dateCheck == ''){
    addDate(dateVal)
  }

  var mealCheck = jsonVal.list.filter(function(e){
    if (e.date == dateVal){
      return e.meals.filter(function(f) {
        return f.name == mealVal
      })
    }
  })
  if(JSON.stringify(mealCheck) == '[]'){
    addMeal(dateVal, mealVal)
  }

  jsonVal.list.filter(function (e){
    if (e.date == dateVal){ 
      e.meals.filter(function(f){
        if(f.name == mealVal){
          var foodCheck = f.foods.filter(function (g){
              return (g.name == foodVal)})
          if (foodCheck == ''){
            let newFood = {
              name: foodVal,
              type: 0,
              amount: qtyVal,
              cal: calVal
            }
            f.foods.push(newFood)
          } else {
            alert('Food already existed!')
          }
        }
        return f
      })
    }
    return e
  })
  saveData(jsonVal)
}

function getCal(food){
 for(var i in Directory){
  if(Directory[i].name = food){
    return Directory[i].cal
  }
 }
 return 0
}


