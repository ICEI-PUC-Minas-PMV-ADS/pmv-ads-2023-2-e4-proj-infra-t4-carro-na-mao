import {createNativeStackNavigator} from'@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import login from '../pages/paginas do usuario/login'
import Avaliacao from '../pages/avaliacoes/avaliacao'

import Cadastro from '../pages/paginas do usuario/cadastro'
import cadastrarAvaliacao from '../pages/avaliacoes/cadastrarAvaliacao'
import CadastrarVistoria from '../pages/vistorias/cadastrarVistoria'
import Perfil from '../pages/paginas do usuario/perfil'
import Menu from '../pages/menu'
import avaliacaoUsaurios from '../pages/avaliacoes/avaliacoesEspcificasPorusuario'
import cadastrarVistoria from '../pages/vistorias/cadastrarVistoria'
//import Cadastro from '../pages/cadastro'
const stack = createNativeStackNavigator()

const Main= ()=>{
    return(
        <NavigationContainer independent={true}>
            <stack.Navigator
              screenOptions={{
                    headerStyle: {
                        backgroundColor: '#1F2024', // Substitua 'blue' pela cor desejada
                    },
                    headerTintColor: 'white', // Cor do texto do cabeçalho
                    }}      
            >
                <stack.Screen
                    name='login'
                    component={login}
                    options={{header:()=>null}}
                />
                <stack.Screen
                    name='Cadastro'
                    component={Cadastro}
                    options={{header:()=>null}}
                />
                <stack.Screen
                    name='menu'
                    component={Menu}
                    options={{header:()=>null}}
                />
                <stack.Screen
                    name='Avalicao'
                    component={Avaliacao}
                    options={{ title: 'Avaliações' }}
                />
                 <stack.Screen
                    name='cadastrarAvaliacao'
                    component={cadastrarAvaliacao}
                    options={{ title: 'Adicionar nova avaliação' }}
                />
                 <stack.Screen
                    name='cadastrarVistoria'
                    component={cadastrarVistoria}
                />
                 <stack.Screen
                    name='Perfil'
                    component={Perfil}
                />
               

            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Main;