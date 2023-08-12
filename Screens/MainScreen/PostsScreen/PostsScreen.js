import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import { MapScreen } from "./NestedScreen/MapScreen";
import { CommentsScreen } from "./NestedScreen/CommentsScreen";
import { DefaultScreen } from "./NestedScreen/DefaultScreen";
import { useDispatch } from "react-redux";
import { logoutAuth } from "../../../redux/slices/authSlice";

const NestedScreen = createStackNavigator();

export const PostsScreen = () => {
   const dispatch = useDispatch();

   return (
      <NestedScreen.Navigator>
         <NestedScreen.Screen
            name="DefaultScreen"
            component={DefaultScreen}
            options={{
               headerTitle: "Публікації",
               headerTitleAlign: "center",
               headerRight: () => (
                  <Ionicons
                     name="log-out-outline"
                     size={24}
                     color="black"
                     style={{ marginRight: 16 }}
                     onPress={() => {
                        dispatch(logoutAuth());
                     }}
                  />
               ),
            }}
         />
         <NestedScreen.Screen
            name="Maps"
            component={MapScreen}
            options={{
               headerTitle: "Карти",
               headerTitleAlign: "center",
            }}
         />
         <NestedScreen.Screen
            name="Comments"
            component={CommentsScreen}
            options={{
               headerTitle: "Коментарі",
               headerTitleAlign: "center",
            }}
         />
      </NestedScreen.Navigator>
   );
};
