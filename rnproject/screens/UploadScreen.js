import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Animated,
  Keyboard,
  useWindowDimensions,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';
import {v4} from 'uuid';
import {createPost} from '../lib/posts';

function UploadScreen() {
  const route = useRoute();
  if (route) console.log('[route] : ' + JSON.stringify(route));
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const {user} = useUserContext();
  const onSubmit = useCallback(async () => {
    // TODO: 포스트 작성 로직 구현
    navigation.pop();
    const asset = res.assets[0];

    const extension = asset.fileName.split('.').pop();
    const reference = storage().ref(`/photo/${user.id}/${v4()}.${extension}`);
    if (Platform.OS === 'android') {
      await reference.putString(asset.base64, 'base64', {
        contentType: asset.type,
      });
    } else {
      await reference.putFile(asset.uri);
    }
    const photoURL = await reference.getDownloadURL();
    await createPost({description, photoURL, user});

    // TODO : 포스트 목록 새로고침
  }, [res, user, description, navigation]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []); // 컴포넌트가 화면에 나타날 때 이벤트를 등로갛고, 사라질 때 이벤트를 해제해야 하므로 deps 배열은 비워둠

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton onPress={onSubmit} name="send" />,
    });
  }, [navigation, onSubmit]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.select({ios: 'height'})}
      style={styles.block}
      keyboardVerticalOffset={Platform.select({
        ios: 180, // iOS 에서 텍스트 입력 시, 'enter'를 많이 입력하면 텍스트가 화면 밖에 보이는 현상 방지
      })}>
      <View style={styles.block}>
        <Animated.Image
          source={{uri: res.assets[0]?.uri}}
          style={[styles.image, {height: animation}]}
          resizeMode="cover"
        />
        <TextInput
          style={styles.input}
          multiline={true}
          placeholder="이 사진에 대한 설명을 입력하세요..."
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  block: {flex: 1},
  image: {width: '100%'},
  input: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    flex: 1,
    fontSize: 16,
  },
});

export default UploadScreen;