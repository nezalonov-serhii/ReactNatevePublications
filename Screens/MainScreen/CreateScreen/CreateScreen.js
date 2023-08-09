import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import { Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import {
   View,
   Text,
   StyleSheet,
   Dimensions,
   Image,
   TextInput,
   TouchableOpacity,
   TouchableWithoutFeedback,
   Keyboard,
   KeyboardAvoidingView,
} from "react-native";

export const CreateScreen = ({ navigation }) => {
   const [photoName, setPhotoName] = useState("");
   const [photoLocation, setPhotoLocation] = useState("");
   const [camera, setCamera] = useState(null);
   const [photo, setPhoto] = useState(null);
   const [hasPermission, setHasPermission] = useState(null);

   useEffect(() => {
      (async () => {
         const { status } = await Camera.requestCameraPermissionsAsync();
         await MediaLibrary.requestPermissionsAsync();

         setHasPermission(status === "granted");
      })();
   }, []);

   const keyboardHide = () => {
      Keyboard.dismiss();
   };

   const handelSubmit = () => {
      Keyboard.dismiss();

      navigation.navigate("Posts", {
         photo,
         photoName,
         photoLocation,
      });

      setPhoto(null);
      setPhotoName("");
      setPhotoLocation("");
   };

   const takePhoto = async () => {
      if (camera) {
         const { uri } = await camera.takePictureAsync();
         await MediaLibrary.createAssetAsync(uri);
         setPhoto(uri);
      }
   };

   const pickImage = async () => {
      console.log(camera);
      const result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.Images,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      if (!result.canceled) {
         setPhoto(result.assets[0].uri);
      }
   };

   return (
      <KeyboardAvoidingView
         behavior={Platform.OS == "ios" ? "padding" : "height"}
         style={{ flex: 1 }}
      >
         <TouchableWithoutFeedback onPress={keyboardHide}>
            <View style={styles.container}>
               {photo === null ? (
                  hasPermission ? (
                     <Camera style={styles.camera} ref={setCamera}>
                        {photo && (
                           <View style={styles.takePhotoContainer}>
                              <Image source={{ uri: photo }} style={styles.previewImage} />
                           </View>
                        )}
                        <TouchableOpacity style={styles.iconCamera} onPress={takePhoto}>
                           <Ionicons name="camera" size={24} color={"#BDBDBD"} />
                        </TouchableOpacity>
                     </Camera>
                  ) : (
                     <View style={styles.previewImage}>
                        <Text style={{ marginTop: 32, textAlign: "center" }}>
                           Камера ще недоступна
                        </Text>
                     </View>
                  )
               ) : (
                  <View style={styles.camera}>
                     <View style={styles.takePhotoContainer}>
                        <Image source={{ uri: photo }} style={styles.previewImage} />
                        <TouchableOpacity
                           style={{
                              ...styles.iconCamera,
                              backgroundColor: "rgba(255, 255, 255, 0.30)",
                           }}
                           onPress={() => setPhoto(null)}
                        >
                           <Ionicons name="camera" size={24} color={"#fff"} />
                        </TouchableOpacity>
                     </View>
                  </View>
               )}

               <TouchableOpacity style={styles.uploadBtn} onPress={pickImage}>
                  <Text style={styles.uploadText}>
                     {photo === null ? "Завантажте фото" : "Редагувати фото"}
                  </Text>
               </TouchableOpacity>

               <View>
                  <TextInput
                     placeholder="Назва"
                     style={styles.input}
                     value={photoName}
                     onChangeText={setPhotoName}
                  />

                  <TextInput
                     placeholder="Місцевість"
                     style={styles.inputTitle}
                     value={photoLocation}
                     onChangeText={setPhotoLocation}
                  />

                  <Ionicons
                     style={styles.iconLocation}
                     name="location-outline"
                     size={24}
                     color="#BDBDBD"
                  />

                  <TouchableOpacity
                     onPress={handelSubmit}
                     activeOpacity={0.8}
                     style={styles.submitBtn}
                  >
                     <Text style={styles.submitTitle}>Опубліковати</Text>
                  </TouchableOpacity>
               </View>
            </View>
         </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
   );
};
const styles = StyleSheet.create({
   container: {
      flex: 1,
   },

   camera: {
      width: Dimensions.get("window").width - 32,
      height: 240,
      marginTop: 32,
      marginLeft: 16,
      marginRight: 16,
   },
   iconCamera: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 90,
      borderRadius: 50,
      backgroundColor: "#fff",
      width: 60,
      height: 60,
      alignSelf: "center",
   },
   takePhotoContainer: {
      position: "absolute",
      height: 240,
   },
   previewImage: {
      width: Dimensions.get("window").width - 32,
      height: 240,
   },

   submitBtn: {
      marginRight: 16,
      marginLeft: 16,
      height: 51,
      backgroundColor: "#FF6C00",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      marginBottom: 16,
      marginTop: 43,
   },
   submitTitle: {
      paddingVertical: 16,
      fontFamily: "Roboto-Regular",
      paddingHorizontal: 32,
      color: "#FFFFFF",
      textAlign: "center",
   },
   input: {
      borderBottomWidth: 1,
      borderBottomColor: "#E8E8E8",
      marginLeft: 16,
      marginRight: 16,
      marginTop: 32,
      paddingTop: 16,
      paddingBottom: 15,
      fontSize: 16,
   },
   title: {
      marginLeft: 16,
      marginTop: 8,
      fontSize: 16,
      color: "#BDBDBD",
   },
   uploadBtn: {
      marginLeft: 16,
      marginTop: 8,
      fontSize: 16,
   },
   uploadText: {
      color: "#BDBDBD",
      textDecorationLine: "underline",
   },
   inputTitle: {
      position: "relative",
      marginLeft: 44,
      marginTop: 29,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: "#E8E8E8",
   },
   iconLocation: {
      position: "absolute",
      bottom: 127,
      marginLeft: 14,
   },
});
