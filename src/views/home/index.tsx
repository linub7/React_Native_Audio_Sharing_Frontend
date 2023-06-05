import {FC, useEffect, useState} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';

import LatestUploads from '@components/home/latest-uploads';
import RecommendedAudios from '@components/home/recommended-audios';
import OptionsModal from '@components/home/options-modal';
import colors from '@utils/colors';
import {AudioDataResponse} from 'src/@types/audio';
import {addToFavoriteHandler} from 'src/api/favorite';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';

interface Props {}

const HomeScreen: FC<Props> = props => {
  const [visible, setVisible] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioDataResponse>();

  const handleOnLongPress = (item: AudioDataResponse) => {
    setSelectedAudio(item);
    setVisible(true);
  };

  const handleAddToPlaylist = () => {};

  const handleAddToFavorite = async () => {
    if (!selectedAudio) return;
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token) return;
    const {err, data} = await addToFavoriteHandler(selectedAudio.id, token);
    if (err) {
      setSelectedAudio(undefined);
      setVisible(false);
      return Toast.show({type: 'error', text1: err});
    }
    Toast.show({type: 'success', text1: data?.status});
    setSelectedAudio(undefined);
    setVisible(false);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <LatestUploads
        onAudioPress={item => console.log(item)}
        onAudioLongPress={handleOnLongPress}
      />
      <RecommendedAudios
        onPress={item => console.log(item)}
        onLongPress={handleOnLongPress}
      />
      <OptionsModal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        options={[
          {
            title: 'Add to Playlist',
            icon: 'playlist-music',
            onPress: handleAddToPlaylist,
          },
          {
            title: 'Toggle to Favorite',
            icon: 'cards-heart',
            onPress: handleAddToFavorite,
          },
        ]}
        renderItem={item => (
          <Pressable onPress={item.onPress} style={styles.optionContainer}>
            <MaterialComIcon
              size={24}
              color={colors.PRIMARY}
              name={item.icon}
            />
            <Text style={styles.optionTitle}>{item.title}</Text>
          </Pressable>
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionTitle: {
    color: colors.PRIMARY,
    fontSize: 16,
    marginLeft: 5,
  },
});

export default HomeScreen;
