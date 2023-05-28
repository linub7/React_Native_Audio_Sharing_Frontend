import {useFormikContext} from 'formik';
import {FC} from 'react';
import {Button, GestureResponderEvent, StyleSheet} from 'react-native';

interface Props {
  btnTitle: string;
}

const SubmitButton: FC<Props> = props => {
  const {handleSubmit} = useFormikContext();
  return <Button title={props.btnTitle} onPress={handleSubmit} />;
};

const styles = StyleSheet.create({
  container: {},
});

export default SubmitButton;
