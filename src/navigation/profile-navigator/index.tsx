import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from '@views/profile';
import ProfileSettingsScreen from '@views/profile-settings';
import VerifyEmail from '@views/auth/verify-email';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';

const Stack = createNativeStackNavigator<ProfileNavigatorStackParamList>();

interface Props {}

const ProfileNavigator: FC<Props> = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="profile-settings" component={ProfileSettingsScreen} />
      <Stack.Screen name="verify-email" component={VerifyEmail} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
