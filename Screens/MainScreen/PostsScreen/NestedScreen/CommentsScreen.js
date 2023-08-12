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
import { format } from "date-fns";

export const CommentsScreen = ({ route }) => {
   const [comments, setComments] = useState([]);
   const { id, photo } = route.params;
   const [newComment, setNewComment] = useState("");

   const addComment = async () => {
      Keyboard.dismiss();

      if (newComment.trim() === "") {
         return;
      }
      const data = format(new Date(), "dd MMMM yyyy | HH : mm");
      const comment = {
         newComment,
         data,
      };
      setComments((prev) => [...prev, comment]);
      setNewComment("");
   };

   return (
      <View style={styles.container}>
         <View style={{ marginHorizontal: 16, marginTop: 32 }}>
            <Image source={{ uri: photo }} style={styles.photo} />
         </View>
         <FlatList
            data={comments}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
               <View style={styles.commentWrapper}>
                  <Text style={styles.comment}>{item.newComment}</Text>
                  <Text style={styles.data}>{item.data}</Text>
               </View>
            )}
         />
         <View>
            <TextInput value={newComment} style={styles.input} onChangeText={setNewComment} />
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
      marginLeft: 16,
      marginTop: 32,
      marginBottom: 24,
      width: Dimensions.get("window").width - 32,
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
