import {FC} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useMutation, useQueryClient} from 'react-query';
import Toast from 'react-native-toast-message';

import AvatarField from '@ui/avatar-field';
import colors from '@utils/colors';
import {PublicProfile} from 'src/@types/auth';
import {useFetchIsFollowing} from 'src/hooks/query';
import {Keys, getFromAsyncStorage} from '@utils/asyncStorage';
import {updateFollowerStatusHandler} from 'src/api/profile';

interface Props {
  profile?: PublicProfile;
}

const PublicProfileContainer: FC<Props> = ({profile}) => {
  if (!profile) return null;

  const queryClient = useQueryClient();

  const {data: isFollowing} = useFetchIsFollowing(profile?.id);

  const toggleFollowingStatus = async (profileId: string) => {
    if (!profileId) return;
    const token = await getFromAsyncStorage(Keys.AUTH_TOKEN);
    if (!token) return;
    const {err, data} = await updateFollowerStatusHandler(profileId, token);
    if (err) {
      return Toast.show({type: 'error', text1: err});
    }
    Toast.show({
      type: 'success',
      text1: `${data ? 'User Followed' : 'User UnFollowed'}`,
    });
    queryClient.invalidateQueries({queryKey: ['public-profile', profileId]});
  };

  const followingMutation = useMutation({
    mutationFn: async profileId => toggleFollowingStatus(profileId),
    onMutate: (profileId: string) => {
      queryClient.setQueryData<boolean>(
        ['is-following', profileId],
        oldData => !oldData,
      );
    },
  });

  return (
    <View style={styles.container}>
      <AvatarField source={profile?.avatar} />

      <View style={styles.profileInfoContainer}>
        <Text style={styles.profileName}>{profile.name}</Text>

        <Text style={styles.followerText}>{profile.followers} Followers</Text>

        <Pressable
          onPress={() => followingMutation.mutate(profile?.id)}
          style={styles.flexRow}>
          <Text style={styles.profileActionLink}>
            {isFollowing ? 'UnFollow' : 'Follow'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoContainer: {
    paddingLeft: 10,
  },
  profileName: {
    color: colors.CONTRAST,
    fontSize: 18,
    fontWeight: '700',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileActionLink: {
    backgroundColor: colors.SECONDARY,
    color: colors.PRIMARY,
    paddingHorizontal: 4,
    paddingVertical: 2,
    marginTop: 5,
  },
  followerText: {
    color: colors.CONTRAST,
    paddingVertical: 2,
    marginTop: 5,
  },
});

export default PublicProfileContainer;
