import colors from '@utils/colors';
import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {HistoryAudio, HistoryByProfile} from 'src/@types/history';

interface Props {
  onPress(item: HistoryAudio): void;
  onLongPress(item: HistoryAudio): void;
  onOuterPress(item: HistoryAudio): void;
  item: HistoryByProfile;
  selectedHistories: string[];
}

const HistoryItem: FC<Props> = ({
  onPress,
  onLongPress,
  item,
  onOuterPress,
  selectedHistories,
}) => {
  return (
    <View>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.listContainer}>
        {item?.audios?.map((el, j) => (
          <Pressable
            onLongPress={() => onLongPress(el)}
            onPress={() => onOuterPress(el)}
            key={el.id + j}
            style={[
              styles.history,
              {
                backgroundColor: selectedHistories.includes(el.id)
                  ? colors.INACTIVE_CONTRAST
                  : colors.OVERLAY,
              },
            ]}>
            <Text style={styles.historyTitle}>{el.title}</Text>
            <Pressable onPress={() => onPress(el)}>
              <AntDesign name="close" color={colors.CONTRAST} />
            </Pressable>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  history: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.OVERLAY,
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  date: {
    color: colors.SECONDARY,
  },
  historyTitle: {
    color: colors.CONTRAST,
    paddingHorizontal: 5,
    fontWeight: '700',
    flex: 1,
  },
  listContainer: {
    marginTop: 10,
    paddingLeft: 10,
  },
});

export default HistoryItem;
