import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Pressable,Text} from "react-native"


import Post from './screen/Post';
import Login from './screen/Login';

const Stack = createNativeStackNavigator();//

const Navigation = () => {
 

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
      >
        <Stack.Screen name="First" component={Post}
        options={({ navigation }) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={{ flexDirection: 'row' }}
            >
              
              <Text style={{ }}>
                Form
              </Text>
            </Pressable>
          ),
        })}

         />
       
        
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
