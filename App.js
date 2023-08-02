import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { useFonts } from "expo-font";

import { LoginScreen } from "./Screens/Auth/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen/RegistrationScreen";

const AuthStack = createStackNavigator();

export default function App() {
   const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
      "Roboto-Medium": require("./assets/font/Roboto-Medium.ttf"),
      "Roboto-Bold": require("./assets/font/Roboto-Bold.ttf"),
   });

   if (!fontsLoaded) {
      return null;
   }

   if (fontsLoaded) {
      return (
         <NavigationContainer>
            <AuthStack.Navigator>
               <AuthStack.Screen
                  options={{ headerShown: false }}
                  name="Login"
                  component={LoginScreen}
               />
               <AuthStack.Screen
                  options={{ headerShown: false }}
                  name="Register"
                  component={RegistrationScreen}
               />
            </AuthStack.Navigator>
         </NavigationContainer>
      );
   }

   return <></>;
}
