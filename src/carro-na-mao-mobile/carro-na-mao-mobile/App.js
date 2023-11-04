import React, {useState,useEffect} from "react";
import { TextInput,View,Text,StyleSheet, } from "react-native";
import { RecuperaToken } from './Autenticação/autenticacao';
import { NavigationContainer } from "@react-navigation/native";
import Main from "./navegacao/main";
export default function App() {
  return (
    <NavigationContainer>
      <Main/>
    </NavigationContainer>
  );
}

