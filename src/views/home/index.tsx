import {FC} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

import {
  Keys,
  clearAsyncStorage,
  getFromAsyncStorage,
} from '@utils/asyncStorage';
import {signoutHandler} from 'src/api/auth';
import {updateProfileAction} from 'src/store/auth';
import {updateLoggedInStateAction} from 'src/store/auth';

interface Props {}

const HomeScreen: FC<Props> = props => {
  const dispatch = useDispatch();

  const handleSignout = async () => {
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token)
      return Toast.show({type: 'error', text1: 'OOPS, something went wrong!'});
    await signoutHandler(undefined, token);
    await clearAsyncStorage();
    dispatch(updateProfileAction({profile: null}));
    dispatch(updateLoggedInStateAction({loggedInState: false}));

    Toast.show({type: 'success', text1: 'Signed Out'});
  };
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button title="Signout" onPress={handleSignout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
