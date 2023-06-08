import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {useFetchHistoryByProfile} from 'src/hooks/query';

interface Props {}

const HistoryTab: FC<Props> = props => {
  const {data} = useFetchHistoryByProfile();
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>Hist</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default HistoryTab;
