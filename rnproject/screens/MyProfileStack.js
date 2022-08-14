import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import { StyleSheet, Button,  View, Text } from 'react-native';
import MyTradeScreen from './MyTradeScreen';
import MyPostScreen from './MyPostScreen';

const MyProfileScreen = ({ navigation, route }) => {
  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.subHeader}>마이 페이지</Text>
          <View style={styles.buttonsContainer}>
              <Button style={styles.button}
                  title="나의 거래 현황"
                  onPress={() => navigation.navigate('MyTrade')}
              />
              <Button style={styles.button}
                  title="내가 쓴 게시물"
                  onPress={() => navigation.navigate('MyPost')}
              />
          </View>
      </View>
  );
};

const Stack = createNativeStackNavigator();

function MyProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="MyProfile" component={MyProfileScreen} />
      <Stack.Screen
        name="MyTrade" component={MyTradeScreen} options={{title: '거래 현황'}}
      />
      <Stack.Screen
        name="MyPost" component={MyPostScreen} options={{title: '내가 쓴 게시물'}}
      />
    </Stack.Navigator>
  );
}

export default MyProfileStack;

const styles = StyleSheet.create({
  buttonsContainer: {
    background: "#23b9d1",
    borderRadius: 50
  }
});