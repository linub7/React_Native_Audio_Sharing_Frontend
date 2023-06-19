import {FC, ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import colors from '@utils/colors';

interface Props {
  title: string;
  children: ReactNode;
}

const ProfileSettingsSharedLayout: FC<Props> = ({title, children}) => {
  return (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.settingOptionsContainer}>{children}</View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.SECONDARY,
    paddingBottom: 5,
    marginTop: 15,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: colors.SECONDARY,
  },
  settingOptionsContainer: {
    marginTop: 15,
    paddingLeft: 15,
  },
});

export default ProfileSettingsSharedLayout;
