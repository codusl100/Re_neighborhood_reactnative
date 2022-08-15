import {useRoute} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';
import {
    getModel,
    convertBase64ToTensor,
    startPrediction,
    populateData,
  } from "../components/DLhelpers";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TradeWriteScreen from './TradeWriteScreen';
import TrashOutScreen from './TrashOutScreen';

useEffect(() => {
    const predictDigits = async () => {
      const model = await getModel();
      const tensor = await convertBase64ToTensor(res);
      const typedArray = await startPrediction(model, tensor);
      setGraphData(populateData(typedArray));
    };
    predictDigits();
  }, [res]);

function CheckScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  return (
    <View style={styles.block}>  
        <Image
            source={{uri: res.assets[0]?.uri}}
            style={[styles.image, {height: width}]}
            resizeMode="cover"
            />
        <TextInput
            style={styles.input}
            multiline={true}
            placeholder="폐기물 종류 분석"
            textAlignVertical="top"
            />
            <View style = {styles.buttons}>
            <Button style={styles.button}
                    title="거래"
                    onPress={() => navigation.navigate('Trade')}
                />
                <Button style={styles.button}
                    title="처리"
                    onPress={() => navigation.navigate('TrashOut')}
                />
            </View>
        </View>
    );
}
const Stack = createNativeStackNavigator();

function ProductCheckScreen() {
  return (
            <Stack.Navigator>
                <Stack.Screen name="Check" component={CheckScreen} />
                <Stack.Screen name="Trade" component={TradeWriteScreen} />
                <Stack.Screen name="TrashOut" component={TrashOutScreen} />
            </Stack.Navigator>
    )
};

const styles = StyleSheet.create({
    block: {
        flex: 1,
    },
        image: {width: '100%'},
        input: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
        flex: 1,
        fontSize: 16,
    },
});


export default ProductCheckScreen;