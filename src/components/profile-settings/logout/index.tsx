import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import colors from '@utils/colors';
import ProfileSettingsSharedLayout from '../shared-layout';

interface Props {
  handleLogout(fromAll?: boolean): void;
}

const ProfileSettingsLogout: FC<Props> = ({handleLogout}) => {
  return (
    <ProfileSettingsSharedLayout title="Log out">
      <Pressable onPress={() => handleLogout(true)} style={styles.logoutBtn}>
        <AntDesign name="logout" size={20} color={colors.CONTRAST} />
        <Text style={styles.logoutBtnTitle}>Log out from all</Text>
      </Pressable>
      <Pressable onPress={() => handleLogout(false)} style={styles.logoutBtn}>
        <AntDesign name="logout" size={20} color={colors.CONTRAST} />
        <Text style={styles.logoutBtnTitle}>Log out</Text>
      </Pressable>
    </ProfileSettingsSharedLayout>
  );
};

const styles = StyleSheet.create({
  container: {},

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  logoutBtnTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5,
  },
});

export default ProfileSettingsLogout;
