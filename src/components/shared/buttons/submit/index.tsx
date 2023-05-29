import AppButton from '@ui/app-button';
import {useFormikContext} from 'formik';
import {FC} from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  btnTitle: string;
}

const SubmitButton: FC<Props> = props => {
  const {handleSubmit} = useFormikContext();
  return <AppButton btnTitle={props.btnTitle} onPress={handleSubmit} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SubmitButton;
