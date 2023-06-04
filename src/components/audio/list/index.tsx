import AudioItem from '@ui/audio-item';
import colors from '@utils/colors';
import {FC} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AudioDataResponse} from 'src/@types/audio';

interface Props {
  label: string;
  data: AudioDataResponse[];
}

const AudioList: FC<Props> = ({label, data}) => {
  return (
    <>
      <Text style={styles.label}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data?.map((item, index) => (
          <AudioItem
            key={item.id}
            title={item.title}
            uri={item.poster}
            onPress={() => console.log('on audio press')}
            onLongPress={() => console.log('on audio long press')}
          />
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: colors.CONTRAST,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
});

export default AudioList;
