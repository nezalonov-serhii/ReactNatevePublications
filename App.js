import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // Добавьте эту строку

import { useRoute } from "./helpers/useRouter";
import { useState } from "react";

export default function App() {
   const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
      "Roboto-Medium": require("./assets/font/Roboto-Medium.ttf"),
      "Roboto-Bold": require("./assets/font/Roboto-Bold.ttf"),
   });

   const [isAuth, setIsAuth] = useState(false);

   if (!fontsLoaded) {
      return null;
   }

   if (fontsLoaded) {
      return (
         <GestureHandlerRootView style={{ flex: 1 }}>
            <NavigationContainer>{useRoute(isAuth, setIsAuth)}</NavigationContainer>
         </GestureHandlerRootView>
      );
   }

   return <></>;
}
