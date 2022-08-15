import  React, {useEffect, useRef, useState, useCallback} from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, Platform, StyleSheet, Button,  View, Text } from 'react-native';
import MyProfileStack from './MyProfileStack';
import TradeBoardStack from './TradeBoardStack';
import CameraButton from '../components/CameraButton';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import UploadModeModal from '../components/UploadModeModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const TABBAR_HEIGHT = 49;

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

const HomeScreen = ({ navigation, route }) => {
    const insets = useSafeAreaInsets();
    const [modalVisible, setModalVisible] = useState(false);

    const onPickImage = res => {
        if (res.didCancle || !res) {
        return;
        }
        console.log(res);
        navigation.push('Check', {res});
    };

    const onLaunchCamera = () => {
        launchCamera(imagePickerOption, onPickImage);
    };

    const onLaunchImageLibrary = () => {
        launchImageLibrary(imagePickerOption, onPickImage);
    };

    const onPress = () => {
        if (Platform.OS === 'android') {
        setModalVisible(true);
        return;
        }

    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ['카메라로 촬영하기', '사진 선택하기', '취소'],
        cancelButtonIndex: 2,
      },
      buttonIndex => {
        if (buttonIndex === 0) {
          // console.log('카메라 촬영');
          onLaunchCamera();
        } else if (buttonIndex === 1) {
          // console.log('사진 선택');
          onLaunchImageLibrary();
        }
      },
    );
  };
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.subHeader}>Re:웃주민</Text>
            <View style={styles.buttons}>
                <Button title="폐기물 촬영"
                    style={styles.button}
                    onPress={onPress}/>
                <UploadModeModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onLaunchCamera={onLaunchCamera}
                onLaunchImageLibrary={onLaunchImageLibrary}
              />
                <Button style={styles.button}
                    title="거래게시판"
                    onPress={() => navigation.navigate('Trade')}
                />
                <Button style={styles.button}
                    title="마이페이지"
                    onPress={() => navigation.navigate('Profile')}
                />
            </View>
        </View>
    );
};


const Stack = createNativeStackNavigator();

function MainTab() {
  return (
            <Stack.Navigator>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Camera" component={CameraButton} />
                <Stack.Screen name="Trade" component={TradeBoardStack} />
                <Stack.Screen name="Profile" component={MyProfileStack} />
            </Stack.Navigator>
    )
};
   

export default MainTab;

const styles = StyleSheet.create({
    buttonsContainer: {
      background: "#23b9d1",
      borderRadius: 50
    }
  });