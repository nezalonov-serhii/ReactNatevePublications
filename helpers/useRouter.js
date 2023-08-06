import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../Screens/Auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "../Screens/Auth/RegistrationScreen/RegistrationScreen";
import { Home } from "../Screens/Home";

const AuthStack = createStackNavigator();

export const useRoute = (isAuth, setIsAuth) => {
   if (!isAuth) {
      return (
         <AuthStack.Navigator>
            <AuthStack.Screen
               options={{ headerShown: false }}
               name="Login"
               component={LoginScreen}
               initialParams={{ setIsAuth: setIsAuth }}
            />
            <AuthStack.Screen
               options={{ headerShown: false }}
               name="Register"
               component={RegistrationScreen}
               initialParams={{ setIsAuth: setIsAuth }}
            />
         </AuthStack.Navigator>
      );
   }

   return <Home setIsAuth={setIsAuth}></Home>;
};
