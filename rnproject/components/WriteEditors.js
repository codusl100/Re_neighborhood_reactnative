import React, {useEffect, useRef, useState, useCallback} from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    Animated,
    Keyboard,
    useWindowDimensions,
    Platform,
    KeyboardAvoidingView,} 
    from 'react-native';
import WriteEditor from '../components/WriteEditors';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
import storage from '@react-native-firebase/storage';
import {useUserContext} from '../contexts/UserContext';
import {v4} from 'uuid';
import {createPost} from '../lib/posts';

function WriteEditor({title, body, onChangeTitle, onChangeBody}) {
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
  }, []); 

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
    <View style={styles.block}>
      <Animated.Image
          source={{uri: res.assets[0]?.uri}}
          style={[styles.image, {height: animation}]}
          resizeMode="cover"
        />
      <TextInput
        placeholder="제목을 입력하세요"
        style={styles.titleInput}
        returnKeyType="next"
        onChangeText={onChangeTitle}
        value={title}
      />
      <TextInput
        placeholder="카테고리를 작성해주세요 "
        style={styles.categoryInput}

      />
      <TextInput
        placeholder="게시글 내용을 작성해주세요"
        style={styles.bodyInput}
        multiline={true}
        textAlignVertical="top"
        onChangeText={setDescription}
        value={description}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: { flex: 1, padding: 16 },
  titleInput: {
    paddingVertical: 0,
    fontSize: 18,
    marginBottom: 16,
    color: "#263238",
    fontWeight: "bold",
  },
  categoryInput: {
    paddingVertical: 0,
    fontSize: 16,
    marginBottom: 16,
    color: "#263238",

    },
  bodyInput: {
    flex: 10,
    fontSize: 16,
    paddingVertical: 0,
    color: "#263238",
  },
});

export default WriteEditor;