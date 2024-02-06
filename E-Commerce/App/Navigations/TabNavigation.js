import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Fav from '../Screen/Fav';
import Home from '../Screen/Home';
import Search from '../Screen/Search';
import Profile from '../Screen/Profile';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

export default function TabNavigation() {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{
            headerShown:false
        }}>
            <Tab.Screen name="Home" component={Home} options={
                {
                    tabBarLabel:'Home',
                    tabBarIcon: ({color, size}) => {
                        return <Ionicons name="home" size={size} color={color} />
                    }
                }
            }/>
            <Tab.Screen name="Search" component={Search} options={
                {
                    tabBarLabel:'Search',
                    tabBarIcon: ({color, size}) => {
                        return <Ionicons name="search" size={size} color={color} />
                    }
                }
            }/>
            <Tab.Screen name="Fav" component={Fav} options={
                {
                    tabBarLabel:'Fav',
                    tabBarIcon: ({color, size}) => {
                        return <Ionicons name="heart-outline" size={size} color={color} />
                    }
                }
            }/>
            <Tab.Screen name="Profile" component={Profile} options={
                {
                    tabBarLabel:'Profile',
                    tabBarIcon: ({color, size}) => {
                        return <FontAwesome name="user" size={size} color={color} />
                    }
                }
            }/>
        </Tab.Navigator>
    )
}