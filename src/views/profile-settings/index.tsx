import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const ProfileSettingsScreen: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={{color: 'white'}}>PRofile settings screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ProfileSettingsScreen;
