import { useFonts } from "expo-font";
import LoginScreen from "./Screens/Auth/LoginScreen/LoginScreen";
import RegistrationScreen from "./Screens/Auth/RegistrationScreen/RegistrationScreen";

export default function App() {
   const [fontsLoaded] = useFonts({
      "Roboto-Regular": require("./assets/font/Roboto-Regular.ttf"),
      "Roboto-Medium": require("./assets/font/Roboto-Medium.ttf"),
      "Roboto-Bold": require("./assets/font/Roboto-Bold.ttf"),
   });

   if (!fontsLoaded) {
      return null;
   }

   // if (fontsLoaded) {
   //    return <LoginScreen />;
   // }

   if (fontsLoaded) {
      return <RegistrationScreen />;
   }

   return <></>;
}
