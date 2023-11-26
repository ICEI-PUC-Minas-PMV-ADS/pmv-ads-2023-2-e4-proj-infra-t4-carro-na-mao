import React, {useState,useEffect} from "react";
import { TextInput,View,Text,StyleSheet, } from "react-native";
import { RecuperaToken } from './Autenticação/autenticacao';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./navegacao/main";
import  Menu  from "./pages/menu";
import Login from "././pages/paginas do usuario/login";
import registerNNPushToken from 'native-notify';

const Stack = createStackNavigator();


export default function App() {
  registerNNPushToken(15111, 'yM7rxy4aracvZo2dZmI275');

  return (
    <NavigationContainer>
     <Main></Main>
    </NavigationContainer>
  );
}

