import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import login from '../pages/paginas do usuario/login'
import Avaliacao from '../pages/avaliacoes/avaliacao'

import Cadastro from '../pages/paginas do usuario/cadastro'
import viewLocacao from '../pages/locacao/viewLocacao'
import cadastrarLocacao from '../pages/locacao/cadastrarLocacao'
import cadastrarAvaliacao from '../pages/avaliacoes/cadastrarAvaliacao'
import Perfil from '../pages/paginas do usuario/perfil'
import menu from '../pages/menu'
import avaliacaoUsaurios from '../pages/avaliacoes/avaliacoesEspcificasPorusuario'
import cadastrarVistoria from '../pages/vistorias/cadastrarVistoria'
//import Cadastro from '../pages/cadastro'
const stack = createNativeStackNavigator()

const Main = () => {
    return (
        <NavigationContainer independent={true}>
            <stack.Navigator>
                <stack.Screen
                    name='login'
                    component={login}
                    options={{ header: () => null }}
                />
                <stack.Screen
                    name='Cadastro'
                    component={Cadastro}
                    options={{ header: () => null }}
                />
                <stack.Screen
                    name='Avalicao'
                    component={Avaliacao}
                />
                <stack.Screen
                    name='cadastrarAvaliacao'
                    component={cadastrarAvaliacao}
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
                />
                <stack.Screen
                    name='Perfil'
                    component={Perfil}
                />
                <stack.Screen
                    name='avaliacaoUsaurios'
                    component={avaliacaoUsaurios}
                />

            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Main;