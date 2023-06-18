import {FC} from 'react';
import {StyleSheet, View, ScrollView, Pressable, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import AppLink from '@ui/links/app';
import colors from '@utils/colors';

interface Props {
  onPress?(): void;
  owner?: string;
  title?: string;
  about?: string;
}

const AudioPlayerInfoContainer: FC<Props> = ({
  onPress,
  owner = '',
  title = '',
  about = '',
}) => {
  return (
    <View style={styles.container}>
      <Pressable onPress={onPress} style={styles.closeBtn}>
        <AntDesign name="close" color={colors.CONTRAST} size={24} />
      </Pressable>
      <ScrollView>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.ownerInfo}>
          <Text style={styles.title}>Creator: </Text>
          <AppLink title={owner} />
        </View>
        <Text style={styles.about}>{about}</Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.PRIMARY,
    zIndex: 1,
    padding: 10,
  },
  closeBtn: {
    alignSelf: 'flex-end',
    width: 45,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ownerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    fontSize: 18,
    color: colors.CONTRAST,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  about: {
    fontSize: 16,
    color: colors.CONTRAST,
    paddingVertical: 5,
  },
});

export default AudioPlayerInfoContainer;
