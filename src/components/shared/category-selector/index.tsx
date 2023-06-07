import {useState} from 'react';
import {ScrollView, StyleSheet, Text, Pressable} from 'react-native';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import colors from '@utils/colors';
import BasicModalContainer from '@ui/basic-modal';

interface Props<T> {
  data: T[];
  visible?: boolean;
  title?: string;
  renderItem(item: T): JSX.Element;
  onSelect(item: T, index: number): void;
  onRequestClose?(): void;
}

const CategorySelectorComponent = <T extends any>({
  data,
  visible = false,
  title,
  renderItem,
  onSelect,
  onRequestClose,
}: Props<T>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const handleSelect = (item: T, index: number) => {
    setSelectedIndex(index);
    onSelect(item, index);
    onRequestClose && onRequestClose();
  };

  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {data?.map((item, index) => (
          <Pressable
            onPress={() => handleSelect(item, index)}
            style={styles.selectorContainer}
            key={index}>
            {selectedIndex === index ? (
              <MaterialComIcon
                name="radiobox-marked"
                color={colors.SECONDARY}
              />
            ) : (
              <MaterialComIcon name="radiobox-blank" color={colors.SECONDARY} />
            )}
            {renderItem(item)}
          </Pressable>
        ))}
      </ScrollView>
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.PRIMARY,
    paddingVertical: 10,
  },
  selectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CategorySelectorComponent;
