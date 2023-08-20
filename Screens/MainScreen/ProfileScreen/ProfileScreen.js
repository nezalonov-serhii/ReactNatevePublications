import React, { useEffect, useState } from "react";
import { Feather, EvilIcons } from "@expo/vector-icons";
import {
   View,
   StyleSheet,
   Text,
   Image,
   FlatList,
   TouchableOpacity,
   ImageBackground,
   Dimensions,
   TouchableWithoutFeedback,
   Keyboard,
} from "react-native";

import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { authSingOutUser, userUpdateAvatar } from "../../../redux/operations/authOperations";
import { db, storage } from "../../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const width = Dimensions.get("window").width;

export const ProfileScreen = ({ navigation }) => {
   const [image, setImage] = useState(null);
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
   const [posts, setPosts] = useState([]);
   const dispatch = useDispatch();
   const { userId, nickName, avatarUser } = useSelector((state) => state.auth);

   useEffect(() => {
      console.log("qwe");
      const getUserPost = async () => {
         const postsRef = collection(db, "posts");
         const queryRef = query(postsRef, where("userId", "==", userId));

         const unsubscribe = onSnapshot(queryRef, (snapshot) => {
            const data = snapshot.docs.map((doc) => ({
               id: doc.id,
               ...doc.data(),
            }));
            setPosts(data);
         });

         return () => unsubscribe();
      };

      getUserPost();
   }, [userId]);

   const singOut = () => {
      dispatch(authSingOutUser());
   };

   const closeKeyboard = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
   };

   const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
         mediaTypes: ImagePicker.MediaTypeOptions.All,
         allowsEditing: true,
         aspect: [4, 3],
         quality: 1,
      });

      if (!result.canceled) {
         const avatar = await uploadImageAndSaveToFirestore(result.assets[0].uri);

         dispatch(userUpdateAvatar({ avatar }));
      } else {
         setImage(null);
      }
   };

   uriToBlob = async (uri) => {
      return await new Promise((resolve, reject) => {
         const xhr = new XMLHttpRequest();
         xhr.onload = function () {
            // return the blob
            resolve(xhr.response);
         };
         xhr.onerror = function () {
            reject(new Error("uriToBlob failed"));
         };
         xhr.responseType = "blob";
         xhr.open("GET", uri, true);

         xhr.send(null);
      });
   };

   const uploadImageAndSaveToFirestore = async (imageUri) => {
      try {
         const imageBlob = await uriToBlob(imageUri);
         const uniqueAvatarId = Date.now().toString();
         const storageImageRef = ref(storage, `avatar/${uniqueAvatarId}`);

         await uploadBytes(storageImageRef, imageBlob);

         const imageUrl = await getDownloadURL(storageImageRef);

         const avatarData = {
            avatar: imageUrl,
         };

         await addDoc(collection(db, "avatar"), avatarData);

         return imageUrl;
      } catch (error) {
         console.log(error);
         return null;
      }
   };
   return (
      <TouchableWithoutFeedback onPress={closeKeyboard}>
         <ImageBackground source={require("../../../assets/image/bgAuth.jpg")} style={styles.image}>
            <TouchableWithoutFeedback onPress={closeKeyboard}>
               <View style={{ ...styles.wrapper, flex: isShowKeyboard ? 0.8 : 0.7 }}>
                  <View style={{ ...styles.avatarWrapper, left: (width - 120) / 2 }}>
                     <TouchableOpacity onPress={pickImage}>
                        <Image
                           source={{ uri: avatarUser }}
                           style={{ width: 120, height: 120, borderRadius: 16 }}
                        />

                        <Image
                           fadeDuration={0}
                           style={styles.add}
                           source={require("../../../assets/image/add.png")}
                        />
                     </TouchableOpacity>
                  </View>
                  <Text style={styles.name}>{nickName}</Text>
                  <TouchableOpacity style={styles.logoutButton} onPress={singOut}>
                     <Feather name="log-out" size={24} color="#BDBDBD" />
                  </TouchableOpacity>
                  <FlatList
                     data={posts}
                     keyExtractor={(item) => item.id}
                     renderItem={({ item }) => (
                        <TouchableOpacity style={styles.postContainer} activeOpacity={1}>
                           <Image source={{ uri: item.photo }} style={styles.photo} />

                           <View>
                              <Text style={styles.title}>{item.photoName}</Text>
                           </View>
                           <View
                              style={{
                                 flexDirection: "row",
                                 justifyContent: "space-between",
                                 marginTop: 8,
                              }}
                           >
                              <TouchableOpacity
                                 onPress={() =>
                                    navigation.navigate("Comments", {
                                       id: item.id,
                                       photo: item.photo,
                                    })
                                 }
                                 style={{
                                    flexDirection: "row",
                                 }}
                              >
                                 <EvilIcons name="comment" size={24} color="#BDBDBD" />
                                 <Text>{item.commentCount ? item.commentCount : "0"}</Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                 style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    marginTop: 8,
                                 }}
                                 onPress={() =>
                                    navigation.navigate("Maps", { location: item.photoLocation })
                                 }
                              >
                                 <Feather name="map-pin" size={24} color="#BDBDBD" />
                                 <Text style={styles.description}>{item.locationInfo}</Text>
                              </TouchableOpacity>
                           </View>
                        </TouchableOpacity>
                     )}
                  />
               </View>
            </TouchableWithoutFeedback>
         </ImageBackground>
      </TouchableWithoutFeedback>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingTop: 100,
   },
   form: {
      marginHorizontal: 40,
      width: 427,
      height: "100%",
      resizeMode: "cover",
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      marginTop: 103,
   },

   image: {
      flex: 1,
      justifyContent: "flex-end",
      resizeMode: "cover",
      alignItems: "center",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
   },
   postContainer: {
      marginBottom: 20,
      padding: 10,
   },
   photo: {
      width: "100%",
      height: 240,
      marginBottom: 8,
      borderRadius: 10,
   },
   locationBox: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 200,
      flex: 0.6,
   },
   title: {
      width: "100%",
      marginRight: 310,
      marginBottom: 8,
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
   },
   description: {
      marginLeft: 8,
      fontSize: 14,
      color: "#212121",
      fontSize: 16,
      textDecorationLine: "underline",
   },
   logoutButton: {
      position: "absolute",
      top: 0,
      right: 40,
      marginTop: 20,
   },

   wrapper: {
      backgroundColor: "#FFFFFF",
      position: "relative",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
   },
   text: {
      textAlign: "center",
      color: "#212121",
      paddingTop: 92,
      fontSize: 30,
   },
   imageWrapper: {
      position: "absolute",
      top: -60,
      borderRadius: 16,
      width: 120,
      height: 120,
      backgroundColor: "#F6F6F6",
   },
   avatar: {
      width: 120,
      height: 120,
      borderRadius: 16,
   },
   inputWrapper: {
      marginHorizontal: 30,
      gap: 16,
      paddingTop: 32,
      paddingBottom: 43,
   },

   add: {
      position: "absolute",
      top: 81,
      right: -10,
   },
   remove: {
      position: "absolute",
      top: 81,
      right: -18,
   },

   avatarWrapper: {
      top: -60,
      position: "absolute",
      width: 120,
      height: 120,
      backgroundColor: "#F6F6F6",
      borderRadius: 16,
      zIndex: 999,
   },
   image: {
      flex: 1,
      justifyContent: "center",
      resizeMode: "cover",
      justifyContent: "flex-end",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
   },

   name: {
      fontSize: 30,
      marginTop: 92,
      marginBottom: 33,
      textAlign: "center",
      color: "#212121",
   },
});
