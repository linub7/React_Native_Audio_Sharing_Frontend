import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {FC, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  getAuthState,
  updateLoadingStateAction,
  updateLoggedInStateAction,
  updateProfileAction,
} from 'src/store/auth';
import AuthenticatedTabNavigator from './authenticated';
import AuthNavigator from './auth';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {getMeHandler} from 'src/api/auth';
import colors from '@utils/colors';
import CustomLoader from '@ui/loader';

interface Props {}

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.PRIMARY,
    primary: colors.CONTRAST,
  },
};

const AppNavigator: FC<Props> = props => {
  const {
    auth: {loggedIn, loading},
  } = useSelector(getAuthState);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchAuthInfo();
  }, []);

  const fetchAuthInfo = async () => {
    dispatch(updateLoadingStateAction({loadingState: true}));
    try {
      const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
      if (!token)
        return dispatch(updateLoadingStateAction({loadingState: false}));
      const {err, data} = await getMeHandler(token);
      if (err) {
        console.log(err);
        return;
      }

      console.log('auth profile: ', data?.user);
      dispatch(updateProfileAction({profile: data?.user}));
      dispatch(updateLoggedInStateAction({loggedInState: true}));
      dispatch(updateLoadingStateAction({loadingState: false}));
    } catch (error) {
      console.log(error);
      dispatch(updateLoadingStateAction({loadingState: false}));
    }
  };

  return (
    <NavigationContainer theme={AppTheme}>
      {loading ? (
        <View style={styles.loadingContainer}>
          <CustomLoader />
        </View>
      ) : null}
      {loggedIn ? <AuthenticatedTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    // position: 'absolute',
    // top: 0,
    // bottom: 0,
    // right: 0,
    // left: 0,
    backgroundColor: colors.OVERLAY,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default AppNavigator;
