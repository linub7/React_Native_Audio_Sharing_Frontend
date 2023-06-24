import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import {
  HomeNavigatorStackParamList,
  PublicProfileTabParamList,
} from 'src/@types/navigation';
import AppView from '@components/app-view';
import {useFetchPublicProfile} from 'src/hooks/query';
import PublicProfileContainer from '@components/public-profile/container';
import colors from '@utils/colors';
import PublicProfileUploadsTab from '@components/public-profile/tabs/uploads';
import PublicProfilePlaylistTab from '@components/public-profile/tabs/playlist';

type Props = NativeStackScreenProps<
  HomeNavigatorStackParamList,
  'public-profile'
>; // must be type! NOT interface!

const Tab = createMaterialTopTabNavigator<PublicProfileTabParamList>();

const PublicProfileScreen: FC<Props> = ({route: {params}}) => {
  const {profileId} = params;

  const {data} = useFetchPublicProfile(profileId);
  return (
    <AppView>
      <View style={styles.container}>
        <PublicProfileContainer profile={data} />
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: styles.tabBarStyle,
            tabBarLabelStyle: styles.tabBarLabelStyle,
          }}>
          <Tab.Screen
            name="public-uploads"
            component={PublicProfileUploadsTab}
            options={{tabBarLabel: 'Uploads'}}
            initialParams={{profileId}}
          />
          <Tab.Screen
            name="public-playlist"
            component={PublicProfilePlaylistTab}
            options={{tabBarLabel: 'Playlist'}}
            initialParams={{profileId}}
          />
        </Tab.Navigator>
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  tabBarStyle: {
    marginBottom: 20,
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

export default PublicProfileScreen;
