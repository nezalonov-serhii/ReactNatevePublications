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

import { db } from "../../../firebase/config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import { authSingOutUser } from "../../../redux/operations/authOperations";

const width = Dimensions.get("window").width;

export const ProfileScreen = ({ navigation }) => {
   const [image, setImage] = useState(null);
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
   const [posts, setPosts] = useState([]);
   const dispatch = useDispatch();
   const { userId, nickName } = useSelector((state) => state.auth);

   useEffect(() => {
      const getUserPost = async () => {
         const postsRef = collection(db, "post");
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

      // console.log(result);

      if (!result.canceled) {
         setImage(result.assets[0].uri);
      } else {
         setImage(null);
      }
   };

   return (
      <TouchableWithoutFeedback onPress={closeKeyboard}>
         <ImageBackground source={require("../../../assets/image/bgAuth.jpg")} style={styles.image}>
            <TouchableWithoutFeedback onPress={closeKeyboard}>
               <View style={{ ...styles.wrapper, flex: isShowKeyboard ? 0.8 : 0.7 }}>
                  <View style={{ ...styles.avatarWrapper, left: (width - 120) / 2 }}>
                     <TouchableOpacity onPress={pickImage}>
                        {image && (
                           <Image
                              source={{ uri: image }}
                              style={{ width: 120, height: 120, borderRadius: 16 }}
                           />
                        )}
                        {!image && (
                           <Image
                              fadeDuration={0}
                              style={styles.add}
                              source={require("../../../assets/image/add.png")}
                           />
                        )}

                        {image && (
                           <Image
                              fadeDuration={0}
                              style={styles.remove}
                              source={require("../../../assets/image/remove.png")}
                           />
                        )}
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
                        <View style={styles.postContainer}>
                           <Image source={{ uri: item.photo }} style={styles.photo} />

                           <View>
                              <Text style={styles.description}>{item.photoLocation}</Text>
                              <Text style={styles.title}>{item.photoTitle}</Text>
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
                              >
                                 <EvilIcons name="comment" size={24} color="#BDBDBD" />
                              </TouchableOpacity>
                              <TouchableOpacity
                                 onPress={() =>
                                    navigation.navigate("Maps", { location: item.location })
                                 }
                              >
                                 <Feather name="map-pin" size={24} color="#BDBDBD" />
                              </TouchableOpacity>
                           </View>
                        </View>
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
      borderWidth: 1,
      borderColor: "#E1E1E1",
      borderRadius: 10,
      padding: 10,
      // marginTop: 60,
   },
   photo: {
      width: 343,
      height: 240,
   },
   locationBox: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 10,
      marginLeft: 200,
      flex: 0.6,
   },
   title: {
      marginRight: 310,
      marginBottom: 8,
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
   },
   description: {
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
