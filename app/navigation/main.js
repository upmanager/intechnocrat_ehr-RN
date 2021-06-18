import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Account from "@screens/Account";
import Devices from "@screens/Devices";
import Summary from "@screens/Summary";
import React from "react";
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabNavigator = (props) => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Devices"
        options={{
          tabBarLabel: "Devices",
          tabBarIcon: ({ focused, color, size }) => <Icon name={'devices'} size={size} color={color} type={'material-community'} />
        }}
        component={Devices}
      />
      <Tab.Screen
        name="Summary"
        options={{
          tabBarLabel: "Summary",
          tabBarIcon: ({ focused, color, size }) => <Icon name={'analytics'} size={size} color={color} type={'material'} />
        }}
        component={Summary}
      />
      <Tab.Screen
        name="Account"
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ focused, color, size }) => <Icon name={'user-cog'} size={size} color={color} type={'font-awesome-5'} />
        }}
        component={Account}
      />


    </Tab.Navigator>
  )
}
const mapStateToProps = (state) => (state)
const TabNavigatorComponent = connect(mapStateToProps, null)(TabNavigator);

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="TabNavigator" component={TabNavigatorComponent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
