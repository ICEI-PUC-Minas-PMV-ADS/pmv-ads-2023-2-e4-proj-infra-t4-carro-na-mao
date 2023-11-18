import React, {useState,useEffect} from "react";
import { TextInput,View,Text,StyleSheet, } from "react-native";
import { RecuperaToken } from './Autenticação/autenticacao';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Main from "./navegacao/main";
import  Menu  from "./pages/menu";
import Login from "././pages/paginas do usuario/login";

const Stack = createStackNavigator();


export default function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen
              name="Menu"
              component={Menu}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

