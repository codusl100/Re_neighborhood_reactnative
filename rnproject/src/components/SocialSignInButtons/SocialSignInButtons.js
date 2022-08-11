import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
    const onSignInNaver = () => {
        console.warn('onSignInNaver');
    };

    const onSignInGoogle = () => {
        console.warn('onSignInGoogle');
    };

    const onSignInKakao = () => {
        console.warn('onSignInKakao');
    };

    return (
        <>
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
        </>
    );
};

export default SocialSignInButtons;