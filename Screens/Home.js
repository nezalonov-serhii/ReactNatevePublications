import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { PostsScreen } from "../Screens/MainScreen/PostsScreen/PostsScreen";
import { CreateScreen } from "../Screens/MainScreen/CreateScreen/CreateScreen";
import { ProfileScreen } from "../Screens/MainScreen/ProfileScreen/ProfileScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";

const MainTab = createBottomTabNavigator();

export const Home = () => {
   return (
      <MainTab.Navigator
         screenOptions={{
            tabBarStyle: {
               alignItems: "center",
               paddingHorizontal: 60,
               paddingTop: 17,
               paddingBottom: 22,
               height: 83,
            },
         }}
      >
         <MainTab.Screen
            name="Posts"
            component={PostsScreen}
            options={{
               tabBarHideOnKeyboard: true,
               tabBarShowLabel: false,
               headerShown: false,

               tabBarIcon: ({ focused, size, color }) => {
                  return (
                     <View
                        style={{
                           backgroundColor: focused ? "#FF6C00" : "transparent",

                           borderRadius: 50,
                           paddingLeft: 28,
                           paddingRight: 28,
                           paddingBottom: 8,
                           paddingTop: 8,
                           height: 40,
                        }}
                     >
                        <Ionicons
                           name="grid-outline"
                           size={24}
                           color={focused ? "#fff" : "#212121"}
                        />
                     </View>
                  );
               },
            }}
         />
         <MainTab.Screen
            name="Create"
            component={CreateScreen}
            options={({ navigation }) => ({
               headerLeft: () => (
                  <TouchableOpacity
                     activeOpacity={0.8}
                     style={{ paddingLeft: 16 }}
                     onPress={() => {
                        navigation.goBack();
                     }}
                  >
                     <Ionicons name="arrow-back" color="#BDBDBD" size={24} />
                  </TouchableOpacity>
               ),
               title: "Створити публікацію",
               headerTintColor: "#212121",
               headerTitleAlign: "center",
               headerTitleStyle: {
                  fontWeight: 500,
                  fontSize: 17,
                  lineHeight: 22,
                  letterSpacing: -0.408,
               },
               tabBarShowLabel: false,
               tabBarHideOnKeyboard: true,
               tabBarIcon: ({ focused, color, size }) => {
                  return (
                     <View
                        style={{
                           backgroundColor: focused ? "#FF6C00" : "transparent",

                           borderRadius: 50,
                           paddingLeft: 28,
                           paddingRight: 28,
                           paddingBottom: 8,
                           paddingTop: 8,
                           height: 40,
                        }}
                     >
                        <Ionicons name="add" size={24} color={focused ? "#FFF" : "#212121CC"} />
                     </View>
                  );
               },
            })}
         />
         <MainTab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{
               headerShown: false,
               tabBarHideOnKeyboard: true,
               tabBarShowLabel: false,
               tabBarIcon: ({ focused, size, color }) => {
                  return (
                     <View
                        style={{
                           backgroundColor: focused ? "#FF6C00" : "transparent",

                           borderRadius: 50,
                           paddingLeft: 28,
                           paddingRight: 28,
                           paddingBottom: 8,
                           paddingTop: 8,
                           height: 40,
                        }}
                     >
                        <Ionicons
                           name="person-outline"
                           size={24}
                           color={focused ? "#fff" : "#212121"}
                        />
                     </View>
                  );
               },
            }}
         />
      </MainTab.Navigator>
   );
};
