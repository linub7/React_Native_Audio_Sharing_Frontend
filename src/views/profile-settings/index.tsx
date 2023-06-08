import AppHeader from '@components/profile/app-header';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const ProfileSettingsScreen: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <AppHeader title="Profile > Settings" />
      <Text style={{color: 'white'}}>PRofile settings screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default ProfileSettingsScreen;
