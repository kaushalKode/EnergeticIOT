import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Splash from './screens/Splash';
import Home from './screens/Home';
import DetailPage from './screens/DetailPage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './components/CustomDrawer';
import PlantSearch from './screens/PlantSearch';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='Splash'
                component={Splash}
                options={{headerShown: false}}
            />
            
            <Stack.Screen
            name='Main'
            component={DrawerNavigator}
            options={{ headerShown: false }}
            />
            <Stack.Screen
            name='DetailPage'
            component={DetailPage}
            options={{
                headerShown: true ,
                headerTitle : 'Sensor Detail Page'
            }}
            />
        </Stack.Navigator>
    </NavigationContainer>    
  )
}


const DrawerNavigator = () => {
    return(
        <Drawer.Navigator 
            drawerContent={props => <CustomDrawer {...props} />}
        >
            <Drawer.Screen 
                name='PlantSearch'
                component={PlantSearch}
                options={{
                    headerShown: true,
                    drawerPosition:'left',
                    
                    headerStyle: {
                        opacity:100,
                        backgroundColor:'#50A7C2',
                        
                    },
                }}
            />
            <Drawer.Screen
                name='Sensors'
                component={Home}
                options={{
                    headerTitle : 'EverEnviro Devices',
                    headerShown: true,
                    drawerPosition:'left',
                    
                    headerStyle: {
                        opacity:100,
                        backgroundColor:'#50A7C2',
                        
                    },

                    
                }}
            />
            {/* <Drawer.Screen
                name='DetailPage'
                component={DetailPage}
                options={{headerShown: true}}
            /> */}
        </Drawer.Navigator>
    )
}

export default AppNavigator

const styles = StyleSheet.create({})