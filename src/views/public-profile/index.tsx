import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

import {HomeNavigatorStackParamList} from 'src/@types/navigation';
import AppView from '@components/app-view';

type Props = NativeStackScreenProps<
  HomeNavigatorStackParamList,
  'public-profile'
>; // must be type! NOT interface!

const PublicProfileScreen: FC<Props> = ({route: {params}}) => {
  const {profileId} = params;
  return (
    <AppView>
      <View style={styles.container}>
        <Text>Public PRofile - {profileId}</Text>
      </View>
    </AppView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default PublicProfileScreen;
