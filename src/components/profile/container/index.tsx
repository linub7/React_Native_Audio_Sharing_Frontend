import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AvatarField from '@ui/avatar-field';
import colors from '@utils/colors';
import {UserProfile} from 'src/@types/auth';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {ProfileNavigatorStackParamList} from 'src/@types/navigation';

interface Props {
  profile?: UserProfile | null;
}

const ProfileContainer: FC<Props> = ({profile}) => {
  const {navigate} =
    useNavigation<NavigationProp<ProfileNavigatorStackParamList>>();

  if (!profile) return null;
  return (
    <View style={styles.container}>
      <AvatarField source={profile?.avatar} />

      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileName}>{profile.name}</Text>
        <View style={styles.flexRow}>
          <Text style={styles.email}>{profile.email}</Text>
          <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
        </View>

        <View style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {profile.followers} Followers
          </Text>
          <Text style={styles.profileActionLink}>
            {profile.followings} Followings
          </Text>
        </View>
      </View>

      <Pressable
        onPress={() => navigate('profile-settings')}
        style={styles.settingsBtn}>
        <AntDesign name="setting" size={22} color={colors.CONTRAST} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoContainer: {
    paddingLeft: 10,
  },
  profileName: {
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: '700',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 5,
  },
  profileActionLink: {
    backgroundColor: colors.SECONDARY,
    color: colors.PRIMARY,
    paddingHorizontal: 4,
    paddingVertical: 2,
    margin: 5,
  },
  settingsBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileContainer;
