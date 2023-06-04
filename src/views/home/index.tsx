import {FC} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

import {
  Keys,
  clearAsyncStorage,
  getFromAsyncStorage,
} from '@utils/asyncStorage';
import {signoutHandler} from 'src/api/auth';
import {updateProfileAction} from 'src/store/auth';
import {updateLoggedInStateAction} from 'src/store/auth';
import {getLatestUploadsHandler} from 'src/api/audio';
import catchAsyncError from 'src/api/catchError';
import {useState} from 'react';
import {useQuery} from 'react-query';
import {useFetchLatestAudios} from 'src/hooks/query';

interface Props {}

const HomeScreen: FC<Props> = props => {
  const {data, isLoading} = useFetchLatestAudios();

  if (isLoading)
    return (
      <View style={styles.container}>
        <Text style={{color: 'white', fontSize: 15}}>Loading</Text>
      </View>
    );
  return (
    <View style={styles.container}>
      {data?.map((item, index) => (
        <Text key={index} style={{color: 'white', paddingVertical: 10}}>
          {item?.title}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HomeScreen;
