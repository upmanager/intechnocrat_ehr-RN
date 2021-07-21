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
import QRCodeScan from "@screens/QRCodeScan";
import ConnectDevice from "@screens/ConnectDevice";
import { HS2S, ScaleResult } from "@screens/MeasureDevices";
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
  const _NAVIGATIONS = {
    TabNavigator: TabNavigatorComponent,
    AddDevice: AddDevice,
    Global: Global,
    Units: Units,
    About: About,
    Profile: Profile,
    QRCodeScan: QRCodeScan,
    ConnectDevice: ConnectDevice,
    HS2S: HS2S,
    ScaleResult: ScaleResult,
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {Object.entries(_NAVIGATIONS).map(([key, value]) => <Stack.Screen name={key} key={key} component={value} options={horizontalAnimation} />)}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
