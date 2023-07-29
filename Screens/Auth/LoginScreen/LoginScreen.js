import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
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

export default function LoginScreen() {
   const [isShowKeyboard, setIsShowKeyboard] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [showPassword, setShowPassword] = useState(true);

   const keyboardHide = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();
   };

   const handelSubmit = () => {
      setIsShowKeyboard(false);
      Keyboard.dismiss();

      console.log({ email, password });

      setEmail("");
      setPassword("");
   };

   const handelShowPassword = () => {
      setShowPassword(!showPassword);
   };

   return (
      <TouchableWithoutFeedback onPress={keyboardHide}>
         <View style={styles.container}>
            <StatusBar style="auto" />
            <ImageBackground
               source={require("../../../assets/image/bgAuth.jpg")}
               style={styles.image}
            >
               <View style={styles.form}>
                  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                     <Text style={styles.inputTitle}>Увійти</Text>
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
                        <Text style={styles.submitTitle}>Увійти</Text>
                     </TouchableOpacity>
                  </KeyboardAvoidingView>

                  <Text style={{ ...styles.isAuth, marginBottom: isShowKeyboard ? -120 : 144 }}>
                     Немає акаунту? Зареєструватися
                  </Text>
               </View>
            </ImageBackground>
         </View>
      </TouchableWithoutFeedback>
   );
}
