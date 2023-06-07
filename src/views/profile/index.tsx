import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import UploadsTab from '@components/profile/tabs/uploads';
import HistoryTab from '@components/profile/tabs/history';
import PlaylistTab from '@components/profile/tabs/playlist';
import FavoritesTab from '@components/profile/tabs/favorites';
import colors from '@utils/colors';

const Tab = createMaterialTopTabNavigator();

interface Props {}

const ProfileScreen: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
        }}>
        <Tab.Screen name="uploads" component={UploadsTab} />
        <Tab.Screen name="playlist" component={PlaylistTab} />
        <Tab.Screen name="favorites" component={FavoritesTab} />
        <Tab.Screen name="history" component={HistoryTab} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBarStyle: {
    backgroundColor: 'transparent',
    elevation: 0,
    shadowRadius: 0,
    shadowColor: 'transparent',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0,
  },
  tabBarLabelStyle: {
    color: colors.CONTRAST,
    fontSize: 12,
  },
});

export default ProfileScreen;
