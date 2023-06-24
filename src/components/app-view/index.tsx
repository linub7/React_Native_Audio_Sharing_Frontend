import {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import MiniAudioPlayer from '@components/mini-audio-player';
import useAudioController from 'src/hooks/useAudioController';
import PlaylistAudioModal from '@components/shared/modals/playlist-audio';

interface Props {
  children: ReactNode;
}

const AppView: FC<Props> = ({children}) => {
  const {isPlayerReady} = useAudioController();
  return (
    <View style={styles.container}>
      <View style={styles.children}>{children}</View>
      {isPlayerReady && <MiniAudioPlayer />}
      <PlaylistAudioModal />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  children: {
    flex: 1,
  },
});

export default AppView;
