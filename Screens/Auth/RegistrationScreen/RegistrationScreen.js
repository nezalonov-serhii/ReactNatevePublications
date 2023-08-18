import { StatusBar } from "expo-status-bar";
import {
   Image,
   ImageBackground,
   Keyboard,
   KeyboardAvoidingView,
   Text,
   TextInput,
   TouchableOpacity,
   TouchableWithoutFeedback,
   View,
} from "react-native";
import { styles } from "../Auth.styled";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { authSingUpUser } from "../../../redux/operations/authOperations";

export function RegistrationScreen({ navigation }) {
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [login, setLogin] = useState("");
   const [showPassword, setShowPassword] = useState(true);

   const dispatch = useDispatch();

   const keyboardHide = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
   };

   const handelSubmit = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();

      dispatch(authSingUpUser({ email, password, login }));
      // console.log({ email, password, login });

      setEmail("");
      setPassword("");
      setLogin("");
   };

   const handelShowPassword = () => {
      setShowPassword(!showPassword);
   };

   useEffect(() => {
      const keyboardDidShow = Keyboard.addListener("keyboardDidShow", () => {
         setIsShowKeyboard(true);
      });

      const keyboardDidHide = Keyboard.addListener("keyboardDidHide", () => {
         setIsShowKeyboard(false);
      });

      return () => {
         keyboardDidShow.remove();
         keyboardDidHide.remove();
      };
   }, []);

   return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
         <View style={styles.container}>
            <StatusBar style="auto" />
            <ImageBackground
               source={require("../../../assets/image/bgAuth.jpg")}
               style={styles.image}
            >
               <View style={styles.form}>
                  <View style={styles.formAvatar}>
                     <TouchableOpacity activeOpacity={0.8}>
                        <Image style={{ width: 120, height: 120, borderRadius: 16 }} />
                        <Image
                           source={require("../../../assets/image/add.png")}
                           style={styles.add}
                        />
                     </TouchableOpacity>
                  </View>
                  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                     <Text style={styles.inputTitle}>Реєстрація</Text>
                     <View>
                        <TextInput
                           onFocus={() => setIsShowKeyboard(true)}
                           onChangeText={(value) => setLogin(value)}
                           value={login}
                           style={styles.input}
                           placeholder="Логін"
                           placeholderTextColor="#BDBDBD"
                        />
                     </View>
                     <View>
                        <TextInput
                           onFocus={() => setIsShowKeyboard(true)}
                           onChangeText={(value) => setEmail(value)}
                           value={email}
                           style={styles.input}
                           placeholder="Адреса електронної пошти"
                           placeholderTextColor="#BDBDBD"
                        />
                     </View>
                     <View style={styles.secureWrap}>
                        <TextInput
                           onFocus={() => setIsShowKeyboard(true)}
                           onChangeText={(value) => setPassword(value)}
                           value={password}
                           style={styles.input}
                           placeholder="Пароль"
                           placeholderTextColor="#BDBDBD"
                           secureTextEntry={showPassword}
                        />
                        <Text onPress={handelShowPassword} style={styles.secure}>
                           {showPassword ? "Показати" : "Приховати"}
                        </Text>
                     </View>
                     <TouchableOpacity
                        onPress={handelSubmit}
                        activeOpacity={0.8}
                        style={styles.submitBtn}
                     >
                        <Text style={styles.submitTitle}>Зареєстуватися</Text>
                     </TouchableOpacity>
                  </KeyboardAvoidingView>
                  <TouchableOpacity
                     activeOpacity={0.6}
                     onPress={() => navigation.navigate("Login")}
                  >
                     <Text style={{ ...styles.isAuth, marginBottom: isShowKeyboard ? -116 : 78 }}>
                        Вже є акаунт? <Text style={styles.isAuthLink}>Увійти</Text>
                     </Text>
                  </TouchableOpacity>
               </View>
            </ImageBackground>
         </View>
      </TouchableWithoutFeedback>
   );
}
