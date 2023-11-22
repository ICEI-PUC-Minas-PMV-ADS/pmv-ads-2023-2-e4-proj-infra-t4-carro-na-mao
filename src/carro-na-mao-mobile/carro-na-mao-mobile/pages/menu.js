
import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Avaliacao from '../pages/avaliacoes/avaliacao';
import Perfil from '../pages/paginas do usuario/perfil';
import Locacao from '../pages/locacao/viewLocacao' 
import { NavigationContainer } from '@react-navigation/native'
import {createNativeStackNavigator} from'@react-navigation/native-stack' // Ajuste na importação
import Vistorias from "../pages/vistorias/cadastrarVistoria";
const stack = createNativeStackNavigator()

const Menu =()=>{
const [index, setIndex] = React.useState(0);
const [routes] = React.useState([
  { key: 'av', title: 'Avaliacao', focusedIcon: 'star-outline' },
  { key: 'V', title: 'Vistorias', focusedIcon: '' },
  { key: 'L', title: 'Locacao', focusedIcon: ''},
  { key: 'T', title: 'Perfil', focusedIcon: 'account' },
]);


const renderScene = BottomNavigation.SceneMap({
  av:Avaliacao,
  T:Perfil,
  L:Locacao,
  V:Vistorias,

});

  return (
    <SafeAreaProvider>
      <BottomNavigation
        color="#8F9098"
        navigationState={{ index, routes }}
        activeColor="#8F9098"
        inactiveColor="#fff"
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#1F2024' }}
        options={{ headerShown: true }}
      />
    </SafeAreaProvider>
  );
};

export default Menu