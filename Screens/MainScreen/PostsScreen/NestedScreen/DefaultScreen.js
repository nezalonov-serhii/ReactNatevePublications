import React, { useEffect, useState } from "react";
import { EvilIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import {
   View,
   FlatList,
   Image,
   Dimensions,
   TouchableOpacity,
   Text,
   StyleSheet,
} from "react-native";

export const DefaultScreen = ({ navigation, route }) => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      if (route.params) setPosts((prevState) => [...prevState, route.params]);
   }, [route.params]);

   return (
      <View style={{ flex: 1 }}>
         <FlatList
            data={posts}
            keyExtractor={(item, indx) => indx.toString()}
            renderItem={({ item }) => (
               <View
                  style={{
                     marginHorizontal: 16,
                     marginBottom: 32,
                     marginTop: 32,
                  }}
               >
                  <Image
                     source={{ uri: item.photo }}
                     style={{
                        width: Dimensions.get("window").width - 32,
                        height: (Dimensions.get("window").width * 60) / 100,
                        borderRadius: 8,
                     }}
                  />
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
                        style={{
                           flexDirection: "row",
                        }}
                        onPress={() =>
                           navigation.navigate("Comments", {
                              photo: item.photo,
                           })
                        }
                     >
                        <EvilIcons name="comment" size={24} color="#BDBDBD" />
                        <Text
                           style={{
                              marginLeft: 6,
                           }}
                        >
                           1
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity
                        style={{
                           flexDirection: "row",
                        }}
                        onPress={() =>
                           navigation.navigate("Maps", {
                              location: item.photoLocation,
                              title: item.photoName,
                           })
                        }
                     >
                        <Feather name="map-pin" size={24} color="#BDBDBD" />
                        <Text style={{ marginLeft: 6 }}>{item.locationInfo}</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            )}
         />
      </View>
   );
};

const styles = StyleSheet.create({
   title: {
      marginTop: 8,
      fontSize: 16,
      color: "#212121",
      fontFamily: "Roboto-Regular",
   },
});
