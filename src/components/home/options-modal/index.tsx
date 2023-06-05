import BasicModalContainer from '@ui/basic-modal';
import React, {FC} from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface Props<T> {
  visible: boolean;
  onRequestClose(): void;
  options: T[];
  renderItem(item: T): React.JSX.Element;
}

const OptionsModal = <T extends any>(props: Props<T>) => {
  const {visible, onRequestClose, options, renderItem} = props;
  return (
    <BasicModalContainer visible={visible} onRequestClose={onRequestClose}>
      {options.map((item, index) => (
        <View key={index}>{renderItem(item)}</View>
      ))}
    </BasicModalContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default OptionsModal;
