import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedListScreen from './FeedListScreen';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ChairScreen from './category/ChairScreen';
import SofaScreen from './category/SofaScreen';


const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function TradeBoardStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedList" component={FeedListScreen} />
      <Drawer.Navigator>
            <Drawer.Screen name="Sofa" component={SofaScreen} />
            <Drawer.Screen name="Chair" component={ChairScreen} />
        </Drawer.Navigator>
    </Stack.Navigator>
  );
}
                      
export default TradeBoardStack;