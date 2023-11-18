import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Avaliacao from '../pages/avaliacoes/avaliacao';
import Perfil from '../pages/paginas do usuario/perfil';  // Ajuste na importação

const Menu = () => {  // Nome mais descritivo para o componente
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'av', title: 'Avaliação', icon: 'star-outline' },  // Correção na propriedade 'focusedIcon'
    { key: 'T', title: 'Perfil', icon: 'account' },            // Correção na propriedade 'focusedIcon'
  ]);

  const renderScene = BottomNavigation.SceneMap({
    av: Avaliacao,
    T: Perfil,
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
      />
    </SafeAreaProvider>
  );
};

export default Menu;
