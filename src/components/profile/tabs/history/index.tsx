import {FC, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';

import AudioListLoadingUI from '@ui/audio-list-loading';
import EmptyRecords from '@ui/empty-records';
import {useFetchHistoriesByProfile} from 'src/hooks/query';
import HistoryItem from '@ui/history-item';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {clearHistoriesHandler} from 'src/api/history';
import {HistoryAudio, HistoryByProfile} from 'src/@types/history';
import colors from '@utils/colors';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const [historyIds, setHistoryIds] = useState<string[]>([]);
  const navigation = useNavigation();

  const {data, isLoading} = useFetchHistoriesByProfile();
  const queryClient = useQueryClient();

  const removeMutate = useMutation({
    mutationFn: histories => removeHistories(histories),
    onMutate: (histories: string[]) => {
      queryClient.setQueryData<HistoryByProfile[]>(
        ['my-histories'],
        oldData => {
          let newData: HistoryByProfile[] = [];
          if (!oldData) return newData;

          for (let data of oldData) {
            const filteredData = data.audios.filter(
              item => !histories.includes(item.id),
            );
            if (filteredData.length) {
              newData.push({date: data.date, audios: filteredData});
            }
          }

          return newData;
        },
      );
    },
  });

  useEffect(() => {
    const unSelectHistories = () => setHistoryIds([]);

    navigation.addListener('blur', unSelectHistories);

    return () => {
      navigation.removeListener('blur', unSelectHistories);
    };
  }, []);

  const removeHistories = async (historiesArray: string[]) => {
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token) return;
    const {err, data} = await clearHistoriesHandler(
      JSON.stringify(historiesArray),
      token,
    );
    if (err) {
      return Toast.show({type: 'error', text1: err});
    }
    queryClient.invalidateQueries({queryKey: ['my-histories']});
    console.log(data);
    Toast.show({type: 'success', text1: 'Histories deleted successfully!'});
  };

  const handleSingleHistoryRemove = async (item: HistoryAudio) => {
    removeMutate.mutate([item.id]);
  };

  const handleDeleteMultipleHistories = async () => {
    setHistoryIds([]);
    removeMutate.mutate(historyIds);
  };

  const handleMultipleHistoriesRemove = async (item: HistoryAudio) => {
    setHistoryIds([...historyIds, item.id]);
  };

  const handleDeselectHistory = (item: HistoryAudio) => {
    const filterIds = historyIds.filter(el => el !== item.id);

    setHistoryIds(filterIds);
  };

  if (isLoading) return <AudioListLoadingUI />;

  if (!data || !data[0]?.audios.length)
    return <EmptyRecords title="There is no history Yet!" />;

  return (
    <>
      {historyIds.length > 0 && (
        <Pressable
          style={styles.removeBtn}
          onPress={handleDeleteMultipleHistories}>
          <Ionicons name="trash-outline" size={24} color={colors.CONTRAST} />
        </Pressable>
      )}
      <ScrollView style={styles.container}>
        {data?.map((item, i) => (
          <HistoryItem
            key={item.date + i}
            item={item}
            onPress={handleSingleHistoryRemove}
            onLongPress={handleMultipleHistoriesRemove}
            selectedHistories={historyIds}
            onOuterPress={handleDeselectHistory}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
  removeBtn: {
    padding: 10,
    alignSelf: 'flex-end',
  },
  removeBtnText: {
    color: colors.CONTRAST,
  },
});

export default HistoryTab;
