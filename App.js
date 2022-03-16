// package imports
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Contants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

// file imports
import Home from './screens/Home';
import CreateEmployee from './screens/CreateEmployee';
import Profile from './screens/Profile';

const Stack = createStackNavigator(); 

function App() {

  const myOptions = {
              title:"Home",
              headerTintColor:"white",
              headerStyle:{
                backgroundColor:"#006aff"
              }
  }

  return (  
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
            options={myOptions} 
         />
        <Stack.Screen name="Create" component={CreateEmployee}
            options={{...myOptions, title:"Create Employee"}} 
        />
        <Stack.Screen name="Profile" component={Profile} 
          options={{...myOptions, title:"Profile"}} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </View>
  );
}

export default ()=>{
  return(
    <NavigationContainer>
      <App/>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});
