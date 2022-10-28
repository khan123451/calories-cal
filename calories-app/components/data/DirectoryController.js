import AsyncStorage from '@react-native-async-storage/async-storage'

export async function addDirectory(nameVal, typeVal, calVal){
    let newFood = {
        name: nameVal,
        type: typeVal,
        cal: calVal
    }
    const jsonVal = await getData();
    let foodCheck = jsonVal.filter(function(e){
      return (e.name == nameVal && e.type == typeVal)
    });
    if(JSON.stringify(foodCheck) != '[]'){
      alert('Already existed!')
    } else {
      jsonVal.push(newFood)
      saveData(jsonVal)
    }
}

export async function removeDirectory(nameVal, typeVal, calVal){
    try{
        let foodJSON= await getData();
        let alteredFood = foodJSON.filter(function(e){
            return (e.name !== nameVal || e.type !== typeVal || e.cal !== calVal)
        });
        console.log(alteredFood);
        saveData(alteredFood);
    }
    catch(error){
        console.log(error)
    }
}

export async function saveData(value) {
  try{
    const jsonVal = JSON.stringify(value)
    await AsyncStorage.setItem('directory', jsonVal)
  } catch(e) {
    console.log(e)
  }
}
  
export async function getData() {
  try{
    const jsonVal = JSON.parse(await AsyncStorage.getItem('directory'))
    if (!Array.isArray(jsonVal)) return [];
    return jsonVal
  } catch(e) {
    console.log(e)
  }
}