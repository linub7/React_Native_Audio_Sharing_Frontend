import GridView from '@ui/grid-view';
import RecentlyPlayedItem from '@ui/recently-played-item';
import colors from '@utils/colors';
import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useFetchGetMyRecentlyPlayedHistoryByProfile} from 'src/hooks/query';

interface Props {}

const RecentlyPlayed: FC<Props> = props => {
  const {data = [], isLoading} = useFetchGetMyRecentlyPlayedHistoryByProfile();
  console.log(data);
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
});

export default RecentlyPlayed;
