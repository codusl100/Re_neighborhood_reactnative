import UploadScreen from './UploadScreen';

const Stack = createNativeStackNavigator();

function RootStack() {
  (...)

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            name="MainTab"
            component={MainTab}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Upload"
            component={UploadScreen}
            options={{title: '새 게시물', headerBackTitle: '뒤로가기'}}
          />
        </>
      ) : (...)}
    </Stack.Navigator>
  );
}

export default RootStack;