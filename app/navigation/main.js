import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Account from "@screens/Account";
import Devices from "@screens/Devices";
import Summary from "@screens/Summary";
import AddDevice from "@screens/AddDevice";
import Global from "@screens/Global";
import Units from "@screens/Units";
import Profile from "@screens/Profile";
import About from "@screens/About";
import React from "react";
import { Icon } from 'react-native-elements';
import { connect } from "react-redux";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const horizontalAnimation = {
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};
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
        <Stack.Screen name="AddDevice" component={AddDevice} options={horizontalAnimation} />
        <Stack.Screen name="Global" component={Global} options={horizontalAnimation} />
        <Stack.Screen name="Units" component={Units} options={horizontalAnimation} />
        <Stack.Screen name="About" component={About} options={horizontalAnimation} />
        <Stack.Screen name="Profile" component={Profile} options={horizontalAnimation} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}
