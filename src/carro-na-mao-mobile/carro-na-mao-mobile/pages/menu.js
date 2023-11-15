
import * as React from 'react';
import { BottomNavigation} from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import perfil from '../pages/paginas do usuario/perfil'
import Avaliacao from '../pages/avaliacoes/avaliacao';
import { NavigationContainer } from '@react-navigation/native';
import Vistorias from "../pages/vistorias/cadastrarVistoria";
import Perfil from "../pages/paginas do usuario/perfil";

const Menu =()=>{
const [index, setIndex] = React.useState(0);
const [routes] = React.useState([
  { key: 'T', title: '', focusedIcon: 'credit-card-outline',color:'#3F51B5' },
  { key: 'av', title: 'Avaliacao', focusedIcon: 'credit-card-outline' }
 
]);

const renderScene = BottomNavigation.SceneMap({
  T:perfil,
  av:Avaliacao
});

return (
  <SafeAreaProvider>
  <BottomNavigation
    color = "green"
    navigationState={{ index, routes }}
    activeColor='green'
    inactiveColor='blue'
    onIndexChange={setIndex}
     renderScene={renderScene}
     barStyle={{ backgroundColor: 'blue' }}
/>
  </SafeAreaProvider>
);
};

export default Menu