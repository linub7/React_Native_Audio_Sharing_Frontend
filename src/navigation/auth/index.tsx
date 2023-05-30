import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LostPasswordScreen from '@views/auth/lost-password';
import SigninScreen from '@views/auth/signin';
import SignUpScreen from '@views/auth/signup';
import VerifyEmail from '@views/auth/verify-email';
import {AuthStackParamList} from 'src/@types/navigation';

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="signin" component={SigninScreen} />
      <Stack.Screen name="signup" component={SignUpScreen} />
      <Stack.Screen name="verify-email" component={VerifyEmail} />
      <Stack.Screen name="lost-password" component={LostPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
