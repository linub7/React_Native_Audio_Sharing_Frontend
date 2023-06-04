import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props<T> {
  data: T[];
  renderItem(item: T): React.JSX.Element;
  col?: number;
}

const GridView = <T extends any>(props: Props<T>) => {
  const {data, col = 2, renderItem} = props;
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <View style={{width: `${100 / col}%`}} key={index}>
          <View style={{padding: 5}}>{renderItem(item)}</View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {width: '100%', flexDirection: 'row', flexWrap: 'wrap'},
});

export default GridView;
