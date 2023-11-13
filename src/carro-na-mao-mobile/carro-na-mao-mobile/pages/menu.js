import * as React from "react";
import { BottomNavigation, Text } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Avaliacao from "../pages/avaliacoes/avaliacao";
import Perfil from "../pages/paginas do usuario/perfil";

const menu =()=>{
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'A', title: '', focusedIcon: 'credit-card-outline',color:'' },
      {key: 'P',title: 'Perfil', focusedIcon: 'credit-card-outline'}
      
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      A:Avaliacao,
      P:Perfil
      
    });
  
    return (
      <SafeAreaProvider>
      <BottomNavigation
        color = "green"
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
         renderScene={renderScene}
    />
      </SafeAreaProvider>
    );
  };
export default menu;