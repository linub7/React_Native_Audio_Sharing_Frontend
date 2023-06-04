import {FC} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import LatestUploads from '@components/home/latest-uploads';
import RecommendedAudios from '@components/home/recommended-audios';

interface Props {}

const HomeScreen: FC<Props> = props => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LatestUploads />
      <RecommendedAudios />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default HomeScreen;
