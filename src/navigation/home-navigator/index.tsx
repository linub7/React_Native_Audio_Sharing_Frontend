import {FC} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {HomeNavigatorStackParamList} from 'src/@types/navigation';
import HomeScreen from '@views/home';
import PublicProfileScreen from '@views/public-profile';

const Stack = createNativeStackNavigator<HomeNavigatorStackParamList>();

interface Props {}

const HomeNavigator: FC<Props> = props => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="public-profile" component={PublicProfileScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigator;
