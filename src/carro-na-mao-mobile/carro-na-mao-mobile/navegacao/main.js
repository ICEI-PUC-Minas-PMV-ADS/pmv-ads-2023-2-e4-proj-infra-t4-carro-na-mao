import {createNativeStackNavigator} from'@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import login from '../pages/login'
import Avaliacao from '../pages/avaliacao'
import Cadastro from '../pages/cadastro'
import cadastrarAvaliacao from '../pages/cadastrarAvaliacao'
//import Cadastro from '../pages/cadastro'
const stack = createNativeStackNavigator()

const Main= ()=>{
    return(
        <NavigationContainer independent={true}>
            <stack.Navigator>
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
                    name='Avalicao'
                    component={Avaliacao}
                />
                 <stack.Screen
                    name='cadastrarAvaliacao'
                    component={cadastrarAvaliacao}
                />
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Main;