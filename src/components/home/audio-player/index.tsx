import {FC, useState} from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useProgress} from 'react-native-track-player';
import Slider from '@react-native-community/slider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import AppModal from '@ui/app-modal';
import {getSource} from '@utils/helper';
import {getPlayerState, updatePlaybackRateAction} from 'src/store/player';
import colors from '@utils/colors';
import AppLink from '@ui/links/app';
import AudioPlayerDuration from './duration';
import useAudioController from 'src/hooks/useAudioController';
import AudioPlayerControllers from './controllers';
import PlaybackRateSelector from '@ui/playback-rate-selector';
import AudioPlayerInfoContainer from './info-container';
import PlayerController from '@ui/player-controller';

interface Props {
  visible: boolean;
  onRequestClose(): void;
  handleOnListOptionPress?(): void;
}

const AudioPlayer: FC<Props> = ({
  visible,
  onRequestClose,
  handleOnListOptionPress,
}) => {
  const [isVisibleInfo, setIsVisibleInfo] = useState(false);

  const {onGoingAudio, playbackRate} = useSelector(getPlayerState);
  const dispatch = useDispatch();

  const {seekTo, setPlaybackRate} = useAudioController();

  const {duration, position} = useProgress();

  const source = getSource(onGoingAudio?.poster);

  const handleUpdateSeek = async (value: number) => {
    await seekTo(value);
  };

  const handleOnPlaybackRatePress = async (rate: number) => {
    await setPlaybackRate(rate);
    dispatch(updatePlaybackRateAction(rate));
  };

  return (
    <AppModal
      animation={true}
      visible={visible}
      onRequestClose={onRequestClose}>
      <View style={styles.container}>
        <Pressable
          style={styles.infoBtn}
          onPress={() => setIsVisibleInfo(true)}>
          <AntDesign name="infocirlceo" size={24} color={colors.CONTRAST} />
        </Pressable>
        {isVisibleInfo && (
          <AudioPlayerInfoContainer
            onPress={() => setIsVisibleInfo(false)}
            title={onGoingAudio?.title}
            owner={onGoingAudio?.owner?.name}
            about={onGoingAudio?.about}
          />
        )}
        <Image source={source} style={styles.poster} />
        <View style={styles.contentContainer}>
          <Text style={styles.title}>{onGoingAudio?.title}</Text>

          <AppLink title={onGoingAudio?.owner.name || ''} onPress={() => {}} />

          <AudioPlayerDuration duration={duration} position={position} />
          <Slider
            minimumValue={0}
            maximumValue={duration}
            minimumTrackTintColor={colors.CONTRAST}
            maximumTrackTintColor={colors.INACTIVE_CONTRAST}
            value={position}
            onSlidingComplete={handleUpdateSeek}
          />

          <AudioPlayerControllers />

          <PlaybackRateSelector
            containerStyle={{marginTop: 20}}
            onPress={handleOnPlaybackRatePress}
            activeRate={playbackRate.toString()}
          />
          <View style={styles.listOptionBtnContainer}>
            <PlayerController ignoreContainer onPress={handleOnListOptionPress}>
              <MaterialCommunityIcons
                name="playlist-music"
                size={24}
                color={colors.CONTRAST}
              />
            </PlayerController>
          </View>
        </View>
      </View>
    </AppModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  poster: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  contentContainer: {
    width: '100%',
    flex: 1,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.CONTRAST,
  },
  infoBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  listOptionBtnContainer: {
    alignItems: 'flex-end',
  },
});

export default AudioPlayer;
