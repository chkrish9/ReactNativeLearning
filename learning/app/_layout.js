// **** Navigation component ****
import React from 'react'; 
import {
    View,
    Button,
    Text, 
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'; 

import Home from './home'; 
import Detail from './detail';

const Drawer = createNativeStackNavigator();

function Navigation() {
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Detail" component={Detail} />
        </Drawer.Navigator>
    ); 
}


function App() {   
    return (
        <NavigationContainer>
            <Navigation />
        </NavigationContainer>   
    ); 
}

export default App;