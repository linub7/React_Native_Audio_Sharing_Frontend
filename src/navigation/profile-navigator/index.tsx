import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileScreen from '@views/profile';
import ProfileSettingsScreen from '@views/profile-settings';

const Stack = createNativeStackNavigator();

interface Props {}

const ProfileNavigator: FC<Props> = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="profile" component={ProfileScreen} />
      <Stack.Screen name="profile-settings" component={ProfileSettingsScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
