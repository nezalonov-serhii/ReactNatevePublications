import { Dimensions, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "center",
   },
   form: {
      marginHorizontal: 40,
      width: "100%",
      backgroundColor: "#FFFFFF",
      alignItems: "center",
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingTop: 92,
   },

   formAvatar: {
      position: "absolute",
      top: -60,
      width: 120,
      height: 120,
      backgroundColor: "#F6F6F6",
      borderRadius: 16,
   },
   add: {
      position: "absolute",
      top: 81,
      right: -10,
   },

   image: {
      flex: 1,
      justifyContent: "flex-end",
      resizeMode: "cover",
      alignItems: "center",
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
   },
   submitBtn: {
      width: Dimensions.get("window").width - 32,
      height: 51,
      backgroundColor: "#FF6C00",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 100,
      marginBottom: 16,
      marginTop: 43,
   },
   submitTitle: {
      fontFamily: "Roboto-Medium",
      paddingHorizontal: 32,
      color: "#FFFFFF",
      textAlign: "center",
   },
   input: {
      width: Dimensions.get("window").width - 32,
      height: 50,
      padding: 16,
      marginBottom: 16,
      backgroundColor: "#F6F6F6",
      borderRadius: 8,
      borderWidth: 1,
      borderColor: "#E8E8E8",
      fontFamily: "Roboto-Regular",
   },
   inputTitle: {
      fontStyle: "normal",
      fontWeight: "500",
      fontSize: 30,
      lineHeight: 35,
      textAlign: "center",
      letterSpacing: 0.01,
      color: "#212121",
      marginBottom: 33,
      fontFamily: "Roboto-Medium",
   },

   secureWrap: {
      position: "relative",
      top: 0,
      left: 0,
   },

   secure: {
      position: "absolute",
      top: 15,
      right: 16,
      color: "#1B4371",
   },
   isAuth: {
      fontStyle: "normal",
      fontWeight: "400",
      fontSize: 16,
      lineHeight: 19,
      textAlign: "center",
      color: "#1B4371",
      fontFamily: "Roboto-Regular",
   },
});
