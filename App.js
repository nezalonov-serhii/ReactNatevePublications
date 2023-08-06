import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { Main } from "./componets/Main";

export default function App() {
   const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
      "Roboto-Medium": require("./assets/font/Roboto-Medium.ttf"),
      "Roboto-Bold": require("./assets/font/Roboto-Bold.ttf"),
   });

   if (!fontsLoaded) return null;

   if (fontsLoaded) {

      return (
         <GestureHandlerRootView style={{ flex: 1 }}>
            <Provider store={store}>
               <Main />
            </Provider>
         </GestureHandlerRootView>
      );
   }
}
