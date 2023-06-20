import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import GridView from '@ui/grid-view';
import RecentlyPlayedItem from '@ui/recently-played-item';
import colors from '@utils/colors';
import {useFetchGetMyRecentlyPlayedHistoryByProfile} from 'src/hooks/query';
import PulseAnimationContainer from '@ui/pulse-animation-container';

interface Props {}

const dummyData = new Array(4).fill('');

const RecentlyPlayed: FC<Props> = props => {
  const {data = [], isLoading} = useFetchGetMyRecentlyPlayedHistoryByProfile();

  if (isLoading)
    return (
      <PulseAnimationContainer>
        <View style={styles.dummyTitleView} />
        <GridView
          data={dummyData}
          renderItem={() => <View style={styles.gridViewItem} />}
        />
      </PulseAnimationContainer>
    );
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Recently Played</Text>
      <GridView
        data={data || []}
        renderItem={item => (
          <View style={styles.listStyle}>
            <RecentlyPlayedItem
              title={item.title}
              poster={item.poster}
              onPress={() => {}}
            />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  label: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  title: {
    color: colors.CONTRAST,
    fontWeight: '500',
    fontSize: 16,
    marginTop: 5,
  },
  image: {width: '100%', aspectRatio: 1, borderRadius: 7},
  listStyle: {marginBottom: 10},
  gridViewItem: {
    height: 50,
    backgroundColor: colors.INACTIVE_CONTRAST,
    borderRadius: 5,
    marginBottom: 10,
  },
  dummyTitleView: {
    height: 20,
    width: 150,
    backgroundColor: colors.INACTIVE_CONTRAST,
    marginBottom: 15,
    borderRadius: 5,
  },
});

export default RecentlyPlayed;
