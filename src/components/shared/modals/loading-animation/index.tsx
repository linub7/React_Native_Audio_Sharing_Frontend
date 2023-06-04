import CustomActivityIndicator from '@ui/custom-activity-indicator';
import {FC} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

interface Props {}

const LoadingAnimationModal: FC<Props> = props => {
  return (
    <Modal transparent={true}>
      <View style={styles.indicatorWrapper}>
        <CustomActivityIndicator />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  indicatorWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.6)',
  },
});

export default LoadingAnimationModal;
