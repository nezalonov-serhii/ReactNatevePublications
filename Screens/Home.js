import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { PostsScreen } from "../Screens/MainScreen/PostsScreen/PostsScreen";
import { CreateScreen } from "../Screens/MainScreen/CreateScreen/CreateScreen";
import { ProfileScreen } from "../Screens/MainScreen/ProfileScreen/ProfileScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from "react-redux";
import { logoutAuth } from "../redux/slices/authSlice";

const MainTab = createBottomTabNavigator();

export const Home = () => {
   const dispatch = useDispatch();
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
            options={{
               headerTitle: "Публікації",
               headerTitleAlign: "center",
               tabBarHideOnKeyboard: true,
               tabBarShowLabel: false,
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
            name="Posts"
            component={PostsScreen}
         />
         <MainTab.Screen
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
            name="Create"
            component={CreateScreen}
         />
         <MainTab.Screen
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
            name="ProfileScreen"
            component={ProfileScreen}
         />
      </MainTab.Navigator>
   );
};
