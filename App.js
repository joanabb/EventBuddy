import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

import Login from './screens/Login';
import Registo from './screens/Register';
import RecuperarPass from './screens/RecuperarPass';
import Index from './navigators/Index'; 
import DetalhesEvento from './screens/DetalhesEvento';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registo" component={Registo} />
        <Stack.Screen name="RecuperarPass" component={RecuperarPass} />
        <Stack.Screen name="Index" component={Index} />
        <Stack.Screen name="DetalhesEvento" component={DetalhesEvento} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
