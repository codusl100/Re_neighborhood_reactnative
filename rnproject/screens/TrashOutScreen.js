import React, {useState} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import CustomInput2 from '../components/CustomInput2';
import CustomButton2 from '../components/CustomButton2';

const TrashOutScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [number,setNumber] = useState('');
    const [address,setAddress] = useState('');
    
    const{height} = useWindowDimensions();

    const onNextPressed = () => {
        console.warn('onNextPressed');
        navigation.push('./')
    };
    
    const onBeforePressed = () => {
        console.warn('onBeforePressed')
        navigation.push('Check')
    }

    return (
        <View style={StyleSheet.root}>
            <Text style={styles.title}>예약자 정보 입력</Text>

            <CustomInput2
                placeholder="이름"
                value={name}
                setvalue={setName}
            />

            <CustomInput2
                placeholder="휴대폰 번호"
                value={number}
                setvalue={setNumber}
            />

            <CustomInput2
                placeholder="주소"
                value={address}
                setvalue={setAddress}
            />

            <Text> </Text>
            <CustomButton2 text="다음" onPress={onNextPressed} />
            <CustomButton2 text="뒤로" onPress={onBeforePressed} type="TERTIARY" />
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#228b22',
        margin: 40,
        alignSelf: 'center',
    },
    text: {
        color:'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075'
    },
});

export default TrashOutScreen;