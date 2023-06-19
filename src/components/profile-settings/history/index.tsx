import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProfileSettingsSharedLayout from '../shared-layout';
import colors from '@utils/colors';

interface Props {
  onPress?(): void;
}

const ProfileSettingsHistory: FC<Props> = ({onPress}) => {
  return (
    <ProfileSettingsSharedLayout title="History">
      <Pressable onPress={onPress} style={styles.ButtonContainer}>
        <MaterialCommunityIcons
          name="broom"
          size={20}
          color={colors.CONTRAST}
        />
        <Text style={styles.buttonTitle}>Clear All</Text>
      </Pressable>
    </ProfileSettingsSharedLayout>
  );
};

const styles = StyleSheet.create({
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  buttonTitle: {
    color: colors.CONTRAST,
    fontSize: 18,
    marginLeft: 5,
  },
});

export default ProfileSettingsHistory;
