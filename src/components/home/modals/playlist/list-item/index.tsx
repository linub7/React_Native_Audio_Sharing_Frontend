import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

interface Props {
  title: string;
  icon: ReactNode;
  onPress?(): void;
}

const ListItem: FC<Props> = ({title, icon, onPress}) => {
  return (
    <Pressable onPress={onPress} style={styles.listItemContainer}>
      {icon}
      <Text style={styles.listItemTitle}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {flexDirection: 'row', alignItems: 'center', height: 45},
  listItemTitle: {fontSize: 16, color: colors.PRIMARY, marginLeft: 5},
});

export default ListItem;
