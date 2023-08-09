import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { selectIsAuth } from "../redux/selectors/selector";
import { useRouter } from "../helpers/useRouter";

export const Main = () => {
   const isAuth = useSelector(selectIsAuth);
   const routing = useRouter(isAuth);
   return <NavigationContainer>{routing}</NavigationContainer>;
};
