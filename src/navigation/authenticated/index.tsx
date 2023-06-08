import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@utils/colors';
import HomeScreen from '@views/home';
import UploadScreen from '@views/upload';
import ProfileNavigator from '../profile-navigator';

const Tab = createBottomTabNavigator();

const AuthenticatedTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.PRIMARY,
        },
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: props => (
            <AntDesign name="home" size={props.size} color={props.color} />
          ),
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="profile-navigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: props => (
            <AntDesign name="user" size={props.size} color={props.color} />
          ),
          tabBarLabel: 'Profile',
        }}
      />
      <Tab.Screen
        name="upload"
        component={UploadScreen}
        options={{
          tabBarIcon: props => (
            <MaterialCommunityIcons
              name="account-music-outline"
              size={props.size}
              color={props.color}
            />
          ),
          tabBarLabel: 'Upload',
        }}
      />
    </Tab.Navigator>
  );
};

export default AuthenticatedTabNavigator;
