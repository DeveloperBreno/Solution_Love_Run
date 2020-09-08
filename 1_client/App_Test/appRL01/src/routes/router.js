
import 'react-native-gesture-handler';

import React from 'react'

//responsavel por conter as telas da aplicação
import { NavigationContainer } from '@react-navigation/native';

//tipo de navegação entre as telas
import { createStackNavigator } from '@react-navigation/stack';

// telas e componentes que serão renderizados
import Login from '../pages/Login';

import Cadastrar from '../pages/Cadastrar';
import MyTabs from '../components/TabNavigator';

const Stack = createStackNavigator();

export default function Routes(){
    return(
        <NavigationContainer>
            {/* a primeira rota pode ser definida utilizando a propriedade initial... 
            caso não possua irá ser iniciada a primeira da lista */}
            <Stack.Navigator initialRouteName="Login">

            <Stack.Screen 
                name="Login" 
                component={Login}
                // retira o cabeçalho  e botão de retorno padrão
                options={ { headerShown: false } } 
            />

            <Stack.Screen 
                name="Cadastrar" 
                component={Cadastrar}
                // retira o cabeçalho  e botão de retorno padrão
                options={ { headerShown: false } } 
            />

            <Stack.Screen 
                name="MyTabs" 
                component={MyTabs} 
                // retira o cabeçalho  e botão de retorno padrão
                options={ { headerShown: false } }
            />


            </Stack.Navigator>
        </NavigationContainer>
     
    );

}