import {FC} from 'react';
import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import AvatarField from '@ui/avatar-field';
import colors from '@utils/colors';

interface Props {}

const ProfileSettingsInfo: FC<Props> = props => {
  return (
    <View style={styles.settingOptionsContainer}>
      <View style={styles.avatarContainer}>
        <AvatarField />
        <Pressable style={styles.paddingLeft}>
          <Text style={styles.linkText}>Update Profile Image</Text>
        </Pressable>
      </View>
      <TextInput style={styles.nameInput} />
      <View style={styles.emailContainer}>
        <Text style={styles.email}>fake@abc.com</Text>
        <MaterialIcons name="verified" size={15} color={colors.SECONDARY} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paddingLeft: {
    paddingLeft: 15,
  },
  nameInput: {
    color: colors.CONTRAST,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.CONTRAST,
    borderRadius: 7,
    marginTop: 15,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  email: {
    color: colors.CONTRAST,
    marginRight: 10,
  },
  linkText: {
    color: colors.SECONDARY,
    fontStyle: 'italic',
  },
});

export default ProfileSettingsInfo;
