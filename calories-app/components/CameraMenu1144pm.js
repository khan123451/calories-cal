import { Camera } from 'expo-camera'
import { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, Image , SafeAreaView} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

export default function CameraMenu() {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasLibraryPermission, setHasLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

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

  if (photo) {

    let scanPhoto = () => {
      MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    return (
      <SafeAreaView style={styles.container}>
        <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
        {hasLibraryPermission ? <Button title="Scan" onPress={scanPhoto} /> : undefined}
        <Button title="Discard" onPress={() => setPhoto(undefined)} />
      </SafeAreaView>
    );
  }

  return (
    <Camera style={styles.container} ref={cameraRef}>
      <View style={styles.buttonContainer}>
        <Ionicons style={styles.camButton} size={72} name= {iconName} title="Take Picture" onPress={() =>{
          takePic()}} />
      </View>
      <StatusBar style="auto" />
    </Camera>
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
  inputContainer:{

  },
  buttonContainer: {
    backgroundColor: 'transparent',
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column-reverse',
  },
  preview: {
    alignSelf: 'stretch',
    flex: 1
  },
  camButton: {
    color: 'white',
  }
});
