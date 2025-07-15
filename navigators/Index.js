import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import Eventos from '../screens/Eventos'; 
import Favoritos from '../screens/Favoritos';
import Perfil from '../screens/Perfil';
import DetalhesEvento from '../screens/DetalhesEvento';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator para Eventos
function EventosStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="EventosLista" component={Eventos} />
      <Stack.Screen name="DetalhesEvento" component={DetalhesEvento} />
    </Stack.Navigator>
  );
}

export default function Index() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'dodgerblue',
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Eventos"
        component={EventosStack} 
        options={{
          tabBarLabel: 'Eventos',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={Favoritos}
        options={{
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="star" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
