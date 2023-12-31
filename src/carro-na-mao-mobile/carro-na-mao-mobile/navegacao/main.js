import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import login from '../pages/paginas do usuario/login'
import Avaliacao from '../pages/avaliacoes/avaliacao'
import Cadastro from '../pages/paginas do usuario/cadastro'
import cadastrarAvaliacao from '../pages/avaliacoes/cadastrarAvaliacao'
import Perfil from '../pages/paginas do usuario/perfil'
import viewLocacao from '../pages/locacao/viewLocacao'
import cadastrarLocacao from '../pages/locacao/cadastrarLocacao'
import editarLocacao from '../pages/locacao/editarLocacao'
import Menu from '../pages/menu'
import avaliacaoUsaurios from '../pages/avaliacoes/avaliacoesEspcificasPorusuario'
import cadastrarVistoria from '../pages/vistorias/cadastrarVistoria'
import Localizacao from '../pages/localizacao/localizacao'
import Historico from '../pages/Historico/Historico'

import menu from '../pages/menu'

const stack = createNativeStackNavigator()

function Main() {
    return (
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
                    options={{ header: () => null }}
                />

                <stack.Screen
                    name='Cadastro'
                    component={Cadastro}
                    options={{ header: () => null }}
                />
                <stack.Screen
                    name='menu'
                    component={Menu}
                    options={{ header: () => null }}
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
                    options={{ title: 'Minhas Reservas' }}

                />
                <stack.Screen
                    name='cadastrarLocacao'
                    component={cadastrarLocacao}
                    options={{title: 'Cadastrar Nova Reserva'}}
                />
                <stack.Screen
                    name='editarLocacao'
                    component={editarLocacao}
                    options={{title: 'Editar Locação'}}
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
                    name='Localização'
                    component={Localizacao}
                />
                <stack.Screen
                    name='Historico'
                    component={Historico}
                />

            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Main;