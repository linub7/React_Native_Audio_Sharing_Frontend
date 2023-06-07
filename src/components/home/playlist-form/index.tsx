import {Pressable, StyleSheet, Text, TextInput, View} from 'react-native';
import {FC, useState} from 'react';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import BasicModalContainer from '@ui/basic-modal';
import colors from '@utils/colors';
import CustomLoader from '@ui/loader';

export interface PlaylistFormInfo {
  title: string;
  private: boolean;
}

interface Props {
  visible: boolean;
  onRequestClose(): void;
  onSubmit(value: PlaylistFormInfo): void;
  loading?: boolean;
}

const PlaylistForm: FC<Props> = ({
  onRequestClose,
  visible,
  onSubmit,
  loading,
}) => {
  const [playlistInfo, setPlaylistInfo] = useState({
    title: '',
    private: false,
  });

  const handleSubmit = () => {
    onSubmit(playlistInfo);
    setPlaylistInfo({title: '', private: false});
  };

  const handleClose = () => {
    setPlaylistInfo({title: '', private: false});
    onRequestClose();
  };

  return (
    <BasicModalContainer visible={visible} onRequestClose={handleClose}>
      <View>
        <Text style={styles.title}>Create New Playlist</Text>
        <TextInput
          placeholder="Title"
          style={styles.input}
          value={playlistInfo.title}
          onChangeText={text => setPlaylistInfo({...playlistInfo, title: text})}
        />
        <Pressable
          onPress={() =>
            setPlaylistInfo({
              ...playlistInfo,
              private: !playlistInfo.private,
            })
          }
          style={styles.privateSelector}>
          {playlistInfo.private ? (
            <MaterialComIcon name="radiobox-marked" color={colors.PRIMARY} />
          ) : (
            <MaterialComIcon name="radiobox-blank" color={colors.PRIMARY} />
          )}
          <Text style={styles.privateLabel}>Private</Text>
        </Pressable>
        <Pressable
          disabled={loading}
          onPress={handleSubmit}
          style={styles.submitButton}>
          {!loading ? (
            <Text>Create</Text>
          ) : (
            <CustomLoader color={colors.PRIMARY} />
          )}
        </Pressable>
      </View>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: colors.PRIMARY,
    fontWeight: '700',
  },
  input: {
    height: 45,
    paddingVertical: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.PRIMARY,
    color: colors.PRIMARY,
  },
  privateSelector: {
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
  },
  privateLabel: {
    color: colors.PRIMARY,
    marginLeft: 5,
  },
  submitButton: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: colors.PRIMARY,
    borderRadius: 7,
  },
});

export default PlaylistForm;
