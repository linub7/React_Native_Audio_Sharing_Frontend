import {FC} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import AppModal from '@ui/app-modal';
import colors from '@utils/colors';
import {AudioDataResponse} from 'src/@types/audio';
import ProfileAudioItem from '@ui/audio-item/profile';
import AudioListLoadingUI from '@ui/audio-list-loading';
import {getPlayerState} from 'src/store/player';

interface Props {
  data: AudioDataResponse[];
  header?: string;
  visible: boolean;
  onRequestClose(): void;
  loading?: boolean;
  onItemPress(item: AudioDataResponse, data: AudioDataResponse[]): void;
}

const AudioListModal: FC<Props> = ({
  header,
  visible,
  onRequestClose,
  data,
  loading,
  onItemPress,
}) => {
  const {onGoingAudio} = useSelector(getPlayerState);
  return (
    <AppModal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.container}>
        {loading ? (
          <AudioListLoadingUI />
        ) : (
          <>
            <Text style={styles.header}>{header}</Text>
            <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ProfileAudioItem
                  name={item.owner.name}
                  title={item.title}
                  uri={item.poster}
                  onPress={() => onItemPress(item, data)}
                  isPlaying={onGoingAudio?.id === item.id}
                />
              )}
            />
          </>
        )}
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.CONTRAST,
    paddingVertical: 10,
  },
});

export default AudioListModal;
