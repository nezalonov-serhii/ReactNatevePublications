import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../Screens/Auth/LoginScreen/LoginScreen";
import { RegistrationScreen } from "../Screens/Auth/RegistrationScreen/RegistrationScreen";
import { Home } from "../Screens/Home";

const AuthStack = createStackNavigator();

export const useRouter = (isAuth) => {
   if (!isAuth) {
      return (
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
      );
   }

   return <Home />;
};
