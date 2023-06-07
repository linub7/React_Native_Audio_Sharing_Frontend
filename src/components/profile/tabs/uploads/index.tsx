import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const UploadsTab: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>Uploads</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default UploadsTab;
