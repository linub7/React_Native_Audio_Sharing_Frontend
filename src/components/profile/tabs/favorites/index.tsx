import {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props {}

const FavoritesTab: FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Text style={{fontSize: 20, color: 'white'}}>Favs</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default FavoritesTab;
