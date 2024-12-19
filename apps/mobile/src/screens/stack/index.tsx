import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import { ProvedorSessao } from '@/src/data/contexts/ContextoSessao'
import { ProvedorAgendamento } from '@/src/data/contexts/ContextoAgendamento'
import Abas from '../tabs'
import Autenticacao from './Autenticacao'
import Sumario from './Sumario'

const Stack = createNativeStackNavigator()

export function App() {
    return (
        <ProvedorSessao>

            <ProvedorAgendamento>
            
                <NavigationContainer>
                    
                    {/* <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Text>Stack</Text>
                    </View> */}

                    <Stack.Navigator initialRouteName="Autenticacao">                   
                        
                        <Stack.Screen 
                            name='Autenticacao' 
                            component={Autenticacao} 
                            options={{headerShown: false}}                        
                        />

                        <Stack.Screen
                            name="Abas"
                            component={Abas}
                            options={{
                                headerShown: false,
                            }}
                        />

                        <Stack.Screen
                            name="Sumario"
                            component={Sumario}
                            options={{
                                title: 'Confirmar Agendamento',
                                headerBackTitle: 'Voltar',
                                headerShown: true,
                                headerStyle: { backgroundColor: '#333' },
                                headerTintColor: '#FFF',
                            }}
                        />                    
                        
                    </Stack.Navigator>               

                </NavigationContainer>

            </ProvedorAgendamento>
        
        </ProvedorSessao>
    )
}

/* import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Autenticacao from './Autenticacao'
import Abas from '../tabs'
import { ProvedorSessao } from '@/src/data/contexts/ContextoSessao'
import { ProvedorAgendamento } from '@/src/data/contexts/ContextoAgendamento'
import Sumario from './Sumario'

const Stack = createNativeStackNavigator()

export default function App() {
    return (
        <ProvedorSessao>
            <ProvedorAgendamento>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Autenticacao">
                        <Stack.Screen
                            name="Autenticacao"
                            component={Autenticacao}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="Abas"
                            component={Abas}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <Stack.Screen
                            name="Sumario"
                            component={Sumario}
                            options={{
                                title: 'Confirmar Agendamento',
                                headerBackTitle: 'Voltar',
                                headerShown: true,
                                headerStyle: { backgroundColor: '#333' },
                                headerTintColor: '#FFF',
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </ProvedorAgendamento>
        </ProvedorSessao>
    )
} */