import {FC} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

import {SELECTOR_SIZE} from '@utils/constants';
import colors from '@utils/colors';

interface Props {
  value: string;
  onPress?(): void;
  active?: boolean;
}

const Selector: FC<Props> = ({value, onPress, active}) => {
  return (
    <Pressable
      style={[
        styles.container,
        active ? {backgroundColor: colors.SECONDARY} : undefined,
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{value}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SELECTOR_SIZE,
    height: SELECTOR_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.CONTRAST,
  },
});

export default Selector;
