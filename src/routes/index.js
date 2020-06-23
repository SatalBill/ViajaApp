import React from 'react';
import Login from '../pages/Login'
import CadastroUsuario from '../pages/CadastroUsuario'
import EsqueceuSenha from '../pages/EsqueceuSenha'
import Roteiro from '../pages/Roteiro'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'remote-redux-devtools'
import reduxThunk from 'redux-thunk'
import rootReducer from '../redux/reducers'

import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import Colors from '../assets/styles/index'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

console.disableYellowBox = true;

const enhance = composeWithDevTools({realtime:true, hostname:"localhost", port:8000})

const store = createStore(rootReducer, enhance(applyMiddleware(reduxThunk)))


function Log() {
    return (
        <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen name="Roteiro" component={Roteiro} />
        </Drawer.Navigator>
    )
}

export default function Routes() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Login">
                    <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                    <Stack.Screen name="CadastroUsuario" component={CadastroUsuario} options={{ cardStyle: { backgroundColor: Colors.backgroundGreen }, title: '' }} />
                    <Stack.Screen name="EsqueceuSenha" component={EsqueceuSenha} options={{ cardStyle: { backgroundColor: Colors.backgroundGreen }, title: '' }} />
                    <Stack.Screen name="Roteiro" component={Log} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
