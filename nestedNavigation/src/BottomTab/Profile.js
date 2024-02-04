

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const Profile = () => {
    let cameraRef = useRef();
    const [hasCameraPermission, setHasCameraPermission] = useState();
    const [hasMediaPermission, setHasMediaPermission] = useState();
    const [photo, setPhoto] = useState();

    useEffect(()=>{
        (async ()=>{
            const cameraPermission = await Camera.requestCameraPermissionsAsync();
            const mediaPermission = await MediaLibrary.requestPermissionsAsync();
            setHasCameraPermission(cameraPermission.status === 'granted');
            setHasMediaPermission(mediaPermission.status === 'granted');
        })();
    }, []);

    if(hasCameraPermission === undefined){
        return <Text>Requesting Permission....</Text>
    }else if(!hasCameraPermission){
        return <Text>Permission for camera not granted</Text>
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
    
      if (photo) {
        let sharePic = () => {
          shareAsync(photo.uri).then(() => {
            setPhoto(undefined);
          });
        };
    
        let savePhoto = () => {
          MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
            setPhoto(undefined);
          });
        };
    
        return (
          <SafeAreaView style={styles.container}>
            <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />
            <Button title="Share" onPress={sharePic} />
            {hasMediaPermission ? <Button title="Save" onPress={savePhoto} /> : undefined}
            <Button title="Discard" onPress={() => setPhoto(undefined)} />
          </SafeAreaView>
        );
      }
    
      return (
        <Camera style={styles.container} ref={cameraRef}>
          <View style={styles.buttonContainer}>
            <Button title="Take Pic" onPress={takePic} />
          </View>
          <StatusBar style="auto" />
        </Camera>
      );
}

export default Profile;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonContainer: {
      backgroundColor: '#fff',
      alignSelf: 'flex-end'
    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    }
  });