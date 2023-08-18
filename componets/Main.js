import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";

import { selectIsAuth } from "../redux/selectors/selector";
import { useRouter } from "../helpers/useRouter";
import { authStateChangeUser } from "../redux/operations/authOperations";

export const Main = () => {
   const isAuth = useSelector(selectIsAuth);
   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(authStateChangeUser());
   }, []);

   const routing = useRouter(isAuth);
   return <NavigationContainer>{routing}</NavigationContainer>;
};
