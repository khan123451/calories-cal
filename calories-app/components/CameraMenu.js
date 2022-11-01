import { Camera } from 'expo-camera'
import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, StyleSheet, Text, View, Button, TextInput, Image , SafeAreaView} from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Picker } from '@react-native-picker/picker'
import Directory from './settings/directory/directory.json'
//import { addFood } from './data/MenuController'

function addFoodHelper (food, qty) {
  addFood('', '', food, qty, '')
}

export default function CameraMenu() {
  let cameraRef = useRef()
  const [hasCameraPermission, setHasCameraPermission] = useState()
  const [hasLibraryPermission, setHasLibraryPermission] = useState()
  const [photo, setPhoto] = useState()
  const [loadingState, setLoadingState] = useState(false)
  const [resultState, setResultState] = useState([])
  const [foodState, setFoodState] = useState([])
  const [qtyState, setQtyState] = useState('' + 0)
  const [showResult, setShowResult] = useState(false)
  
  


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const libraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasLibraryPermission(libraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting for the camera permissions</Text>
  } else if (!hasCameraPermission) {
    return <Text>Invalid Camera Permission.</Text>
  }


  let takePic = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };
    let newPhoto = await cameraRef.current.takePictureAsync(options);

    setPhoto(newPhoto);
  };

  let iconName = "aperture-outline";

  const handleUploadPhoto = (uri) => {
    const data = new FormData();
    const file = {uri, name: uri.split('/')[uri.split('/').length - 1], type: 'image/jpeg'};
    data.append('file', file);
    const str_res = fetch('https://yolo-v5z-tndcixcleq-uc.a.run.app/upload', {
      method: 'POST',
      body: data
    })
      .then((response) => response.text())
      .then((response) => {
        var res = []
        var foodDirectory = []
        const j = JSON.parse(response);
        Directory.map((item) =>{
          foodDirectory.push(item.name)
        })

        var res_list =j.result
        res_list.map((item) =>{
          if (foodDirectory.includes(item)) {
            res.push(item)
          }
        })

        setResultState(res)
        setShowResult(true)
      })
      .catch((error) => {
        console.log('error', error)
        setResultState([])
        setShowResult(true)
      })
  };

  const PopupResult = () => {
    const pickerRef = useRef()

    const itemList = (resultVal) => {
      return resultVal.map((product) => {
        return (
            <Picker.Item label={product} value={product} key={product} />
         )
      })
    }

    return(
      <>
        {resultState == ""? 
          <View style={styles.returnContainer}>
            <Text size={70}>No item Found. Please Retry. </Text>
            <View style= {styles.returnButtonContainer}>
              <Button color="green" title="Retry" onPress={() => {
                setLoadingState(false)
                setShowResult(false)
                setPhoto(undefined)
              }} />
            </View>
          </View> :
        <View style={styles.returnContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Select item</Text>
            <Text style={styles.titleText}>Quantity</Text>
          </View>
          <View style={styles.bodyContainer}>
            <Picker
              style={{ height: 50, width: 150 }}
              selectedValue={foodState}
              onValueChange={(itemValue, itemIndex) => {setFoodState(itemValue)}}>
            <Picker.Item label='Please select an option...' value='0' />
                {itemList(resultState)}
            </Picker>
            <TextInput 
              keyboardType='numeric'
              blurOnSubmit
              style={styles.TextInput}
              value={qtyState}
              onChangeText= { val => 
                setQtyState(val)}/>
              
          </View>
          <View style= {styles.returnButtonContainer}>
            <View style= {styles.addButtonContainer}>
              <Button color="green" title="Add" onPress={() => {
                    setLoadingState(false)
                    addFoodHelper(foodState, qtyState)
                    setPhoto(undefined)}} />
            </View>

            <View style= {styles.addButtonContainer}>
              <Button color="green" title="Discard" onPress={() => {
                    setLoadingState(false)
                    setShowResult(false)
                    setPhoto(undefined)}} />
            </View>
          </View>
        </View>
        }
        </>
            )
  }

  if (photo) {

    let scanPhoto = async () => {
      setLoadingState(true);
      await MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        handleUploadPhoto(photo.uri);
      }).then(()=>{
        setPhoto(undefined);
      })
    };


    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        <View style={styles.resultContainer}>
          <View style={styles.buttonContainer}>
          {hasLibraryPermission ? <Button color="green" title="Scan" onPress={scanPhoto} /> : undefined}
          </View>
          <ActivityIndicator style={styles.loadingContainer} size={70} animating={!loadingState} />
          <View style={styles.buttonContainer}>
            <Button color="green" title="Discard" onPress={() => setPhoto(undefined)} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <>
    {showResult? <PopupResult /> :
      <Camera style={styles.container} ref={cameraRef}>
        <View style={styles.camContainer}>
        <ActivityIndicator style={styles.loadingContainer} size={70} animating={loadingState} />
          {!loadingState? <Ionicons style={styles.camButton} size={72} name= {iconName} title="Take Picture" onPress={() =>{
            takePic()}} />: undefined}
        </View>
        <StatusBar style="auto" />
      </Camera>}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemContainer: {
    backgroundColor: 'lightpink',
    borderStyle: 'dotted',
    padding: 20,
    paddingHorizontal:100,
    marginVertical:5,
    marginHorizontal:50,
    fontFamily: 'Roboto',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  titleContainer:{
    flexDirection:'row',
    flexWrap:'nowrap'
  },
  titleText:{
    padding:10
  },
  bodyContainer:{
    flexDirection:'row',
    position:'relative',
    flexWrap:'nowrap',
    padding:10,
    paddingHorizontal:50
  },
  TextInput:{
    backgroundColor:'lightyellow',
    width:100,
    borderRadius:10,
    paddingHorizontal:10
  },
  loadingContainer:{
    position:'absolute',
    alignItems:'center',
    justifyContent:'center',
    top:300,
    flex:0
  },
  pickerItem:{
    backgroundColor:'transparent',
    flex:1,
    borderRadius:10,
    right:100,
    lignItems: "center"
  },
  camContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column-reverse',
  },
  resultContainer:{
    position:'absolute',
    flex: 0,
    bottom:150
  },
  buttonContainer: {
    position:'relative',
    backgroundColor: 'transparent',
    alignSelf: 'center',
    padding:0,
    width:'200%',
    height:'100%',
    flexDirection: 'column-reverse',
  },
  returnButtonContainer: {
    padding:20
  },
  addButtonContainer: {
    padding:20,
    width: 200

  },
  returnContainer: {
    alignItems:'center',
  },
  selectContainer:{
    alignItems:'center',
    width:300,
    justifyContent:'center',
    position:'absolute',
    bottom:150
  },
  textContainer:{
    alignItems:'center',
    width:300,
    justifyContent:'center',
    position:'absolute',
    bottom:150
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  camButton: {
    color: 'white',
  },
  pickerItem:{
    flex: 1
  }
});
