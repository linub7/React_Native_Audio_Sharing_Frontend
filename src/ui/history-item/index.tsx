import colors from '@utils/colors';
import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {HistoryByProfile} from 'src/@types/history';

interface Props {
  item: HistoryByProfile;
}

const HistoryItem: FC<Props> = ({item}) => {
  return (
    <View>
      <Text style={styles.date}>{item.date}</Text>
      <View style={styles.listContainer}>
        {item?.audios?.map((el, j) => (
          <View key={el.id + j} style={styles.history}>
            <Text style={styles.historyTitle}>{el.title}</Text>
            <Pressable>
              <AntDesign name="close" color={colors.CONTRAST} />
            </Pressable>
          </View>
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
