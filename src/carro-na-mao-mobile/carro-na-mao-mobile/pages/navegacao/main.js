import {createNativeStackNavigator} from'@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import login from '../login'
import Avaliacao from '../avaliacao'
import Cadastro from '../cadastro'

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
            </stack.Navigator>
        </NavigationContainer>
    )
}

export default Main;