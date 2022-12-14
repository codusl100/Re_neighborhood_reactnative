import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

const CustomButton2 = ({onPress, text, type="PRIMARY", bgColor, fgColor}) => {
    return ( 
        <Pressable 
            onPress={onPress} 
            style={[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {},
            ]}>
            <Text 
                style={[
                    styles.text, 
                    styles[`text_${type}`],
                    fgColor ? {color: fgColor} : {},
                ]}>
                {text}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '90%',

        padding: 15,
        marginVertical: 10,

        alignSelf: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },

    container_PRIMARY: {
        backgroundColor: '#32cd32',
    },

    container_SECONDARY: {
        borderColor: '#3B71F3',
        borderWidth: 2,
    },

    container_TERTIARY: {
        
    },


    text: {
        fontWeight: 'bold',
        color: 'white',
    },

    text_SECONDARY: {
        color: '#3B71F3'
    },

    text_TERTIARY: {
        color: '#32cd32',
    },
});

export default CustomButton2;