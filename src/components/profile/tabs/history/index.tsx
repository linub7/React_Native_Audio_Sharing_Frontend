import {FC} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import AudioListLoadingUI from '@ui/audio-list-loading';
import EmptyRecords from '@ui/empty-records';
import {useFetchHistoriesByProfile} from 'src/hooks/query';
import HistoryItem from '@ui/history-item';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const {data, isLoading} = useFetchHistoriesByProfile();

  if (isLoading) return <AudioListLoadingUI />;

  if (!data || !data[0]?.audios.length)
    return <EmptyRecords title="No Histories Yet!" />;

  return (
    <ScrollView style={styles.container}>
      {data?.map((item, i) => (
        <HistoryItem key={item.date + i} item={item} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HistoryTab;
