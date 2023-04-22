import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Pressable,Text} from "react-native"
import Details from './screen/Details';
import List from './screen/List';
import Main from './screen/Main';

const Stack = createNativeStackNavigator();//

const Navigation = () => {
 

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ contentStyle: { backgroundColor: 'white' } }}
      >
        <Stack.Screen name="List" component={List}
        options={({ navigation }) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('Main')}
              style={{ flexDirection: 'row' }}
            >
              
              <Text style={{ }}>
                Move
              </Text>
            </Pressable>
          ),
        })}

         />
       
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ presentation: 'modal' }}
        />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
