import React, {useState} from 'react';
import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../assets/images/Logo_1.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton'; 

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {height} = useWindowDimensions();

    const onSignInPressed = () => {
        console.warn('Sign in');
    };

    const onForgotPasswordPressed = () => {
        console.warn('onForgotPasswordPressed');
    };

    const onSignInNaver = () => {
        console.warn('onSignInNaver');
    };

    const onSignInGoogle = () => {
        console.warn('onSignInGoogle');
    };

    const onSignInKakao = () => {
        console.warn('onSignInKakao');
    };

    const onSignUpPress = () => {
        console.warn('onSignUpPress');
    };

    return (
        <ScrollView>
        <View style={styles.root}>
            <Image 
                source={Logo} 
                style={[styles.logo, {height: height * 0.3}]} 
                resizeMode="contain" 
            />

            <CustomInput 
                placeholder="Email" 
                value={username} 
                setValue={setUsername} 
            />
            <CustomInput 
                placeholder="Password" 
                value={password} 
                setValue={setPassword}
                secureTextEntry
            />

            <CustomButton text="LogIn" onPress={onSignInPressed} />

            <CustomButton 
                text="Forgot password?" 
                onPress={onForgotPasswordPressed}
                type="TERTIARY" 
            />

            <CustomButton 
                text="Sign In with Naver" 
                onPress={onSignInNaver}
                bgColor="#98fb98"
                fgColor="#2e8b57" 
            />
            <CustomButton 
                text="Sign In with Google" 
                onPress={onSignInGoogle}
                bgColor="#FAE9EA"
                fgColor="#ff7f50" 
            />
            <CustomButton 
                text="Sign In with Kakao" 
                onPress={onSignInKakao}
                bgColor="#ffd700"
                fgColor="#8b4513" 
            />

            <CustomButton 
                text="Don't have an account? Create one" 
                onPress={onSignUpPress}
                type="TERTIARY" 
            />
        </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});
export default SignInScreen;