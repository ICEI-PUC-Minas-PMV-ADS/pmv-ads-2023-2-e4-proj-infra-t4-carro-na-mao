import {createNativeStackNavigator} from'@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import login from '../pages/paginas do usuario/login'
import Avaliacao from '../pages/avaliacoes/avaliacao'
import Cadastro from '../pages/paginas do usuario/cadastro'
import cadastrarAvaliacao from '../pages/avaliacoes/cadastrarAvaliacao'
import Perfil from '../pages/paginas do usuario/perfil'
import viewLocacao from '../pages/locacao/viewLocacao'
import cadastrarLocacao from '../pages/locacao/cadastrarLocacao'
import Menu from '../pages/menu'
import avaliacaoUsaurios from '../pages/avaliacoes/avaliacoesEspcificasPorusuario'
import cadastrarVistoria from '../pages/vistorias/cadastrarVistoria'
import Localizacao from '../pages/localizacao/localizacao'
import menu from '../pages/menu'
//import Cadastro from '../pages/cadastro'
const stack = createNativeStackNavigator()

function Main() {
    return(
        <NavigationContainer independent={true}>
            <stack.Navigator
            initialRouteName='login'     
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
                    name='Avaliacao'
                    component={Avaliacao}
                    options={{ title: 'Avaliações' }}
                />
                 <stack.Screen
                    name='cadastrarAvaliacao'
                    component={cadastrarAvaliacao}
                    options={{ title: 'Adicionar nova avaliação' }}
                />
                <stack.Screen
                    name='viewLocacao'
                    component={viewLocacao}
                />
                <stack.Screen
                    name='cadastrarLocacao'
                    component={cadastrarLocacao}
                 />
                 <stack.Screen
                    name='cadastrarVistoria'
                    component={cadastrarVistoria}
                    options={{ title: 'Registro de Vistoria' }}
                />
                 <stack.Screen
                    name='Perfil'
                    component={Perfil}
                />
                <stack.Screen
                    name='avaliacaoUsaurios'
                    component={avaliacaoUsaurios}
                />
                 <stack.Screen
                    name='Localizacao'
                    component={Localizacao}
                />
               

            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Main;