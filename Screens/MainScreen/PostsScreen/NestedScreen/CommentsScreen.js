import React, { useState } from "react";
import {
   View,
   Text,
   StyleSheet,
   TextInput,
   TouchableOpacity,
   FlatList,
   Image,
   Keyboard,
   Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { format, parse, compareDesc } from "date-fns";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
   collection,
   addDoc,
   query,
   onSnapshot,
   doc,
   updateDoc,
   increment,
} from "firebase/firestore";
import { db } from "../../../../firebase/config";

export const CommentsScreen = ({ route }) => {
   const [comments, setComments] = useState([]);
   const [text, setText] = useState("");
   const titleTextHandler = (text) => setText(text);

   const { id, photo } = route.params;
   const { nickName, userId, avatarUser } = useSelector((state) => state.auth);

   useEffect(() => {
      getAllComments();
   }, []);

   // В функции getAllComments
   const getAllComments = async () => {
      const commentRef = query(collection(doc(db, "post", id), "comments"));
      onSnapshot(commentRef, (snapshot) => {
         const formattedComments = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
         const sortedComments = formattedComments.sort(compareDates);
         setComments(sortedComments);
      });
   };

   const compareDates = (commentA, commentB) => {
      const dateA = parse(commentA.data, "dd MMMM yyyy | HH : mm", new Date());
      const dateB = parse(commentB.data, "dd MMMM yyyy | HH : mm", new Date());
      return compareDesc(dateB, dateA);
   };

   const addComment = async () => {
      Keyboard.dismiss();
      if (text.trim() === "") {
         return;
      }
      const data = format(new Date(), "dd MMMM yyyy | HH : mm");
      const comment = {
         text,
         data,
         nickName,
         userId,
         avatarUser,
      };

      const docRef = await addDoc(collection(doc(db, "post", id), "comments"), comment);

      await updateDoc(doc(db, "posts", id), {
         commentCount: increment(1),
      });

      setText("");
   };

   return (
      <View style={styles.container}>
         <View style={{ marginHorizontal: 16, marginTop: 32, marginBottom: 32 }}>
            <Image source={{ uri: photo }} style={styles.photo} />
         </View>
         <FlatList
            data={comments}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
               <View style={{ flexDirection: "row" }}>
                  {item.userId === userId ? (
                     <>
                        <View
                           style={{
                              ...styles.commentWrapper,
                              marginLeft: 16,
                              backgroundColor: "#35b1ff2b",
                           }}
                        >
                           <Text style={{ marginTop: -10, marginBottom: 5, fontSize: 18 }}>
                              {item.nickName}
                           </Text>
                           <Text style={{ ...styles.comment, marginBottom: 10 }}>{item.text}</Text>
                           <Text style={styles.data}>{item.data}</Text>
                        </View>
                        <View style={{ marginLeft: 16, marginRight: 16 }}>
                           <Image
                              source={{ uri: item.avatarUser }}
                              style={{
                                 width: 30,
                                 height: 30,
                                 borderRadius: 50,
                                 backgroundColor: "#fff",
                              }}
                           />
                        </View>
                     </>
                  ) : (
                     <>
                        <View style={{ marginLeft: 16, marginRight: 16 }}>
                           <Image
                              source={{ uri: item.avatarUser }}
                              style={{
                                 width: 30,
                                 height: 30,
                                 borderRadius: 50,
                                 backgroundColor: "#fff",
                              }}
                           />
                        </View>
                        <View style={styles.commentWrapper}>
                           <Text style={{ marginTop: -10, marginBottom: 5, fontSize: 18 }}>
                              {item.nickName}
                           </Text>
                           <Text style={styles.comment}>{item.text}</Text>
                           <Text style={styles.data}>{item.data}</Text>
                        </View>
                     </>
                  )}
               </View>
            )}
         />
         <View>
            <TextInput value={text} style={styles.input} onChangeText={titleTextHandler} />
         </View>
         <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.iconContainer} onPress={addComment}>
               <Ionicons name="arrow-up" size={24} color="#fff" />
            </TouchableOpacity>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   input: {
      backgroundColor: "#F6F6F6",
      borderRadius: 100,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      marginTop: 16,
      fontFamily: "Roboto-Regular",
      fontSize: 16,
      lineHeight: 19,
      color: "#212121",
      padding: 16,
      marginHorizontal: 16,
   },

   iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#FF6C00",
      width: 34,
      height: 34,
      borderRadius: 50,
      top: -46,
      left: 30,
   },
   inputContainer: {
      flexDirection: "row-reverse",
   },
   commentWrapper: {
      padding: 16,
      marginBottom: 24,
      width: Dimensions.get("window").width - 78,
      flexShrink: 0,
      borderRadius: 6,
      backgroundColor: "#F6F6F6",
   },
   comment: {
      color: "#212121",
      fontSize: 13,
      fontStyle: "normal",
      lineHeight: 18,
   },
   data: {
      fontFamily: "Roboto-Regular",
      fontSize: 10,
      color: "#BDBDBD",
      textAlign: "right",
   },
   photo: {
      width: "100%",
      height: 240,
      marginBottom: 8,
      borderRadius: 8,
   },
});
