import {useFormikContext} from 'formik';
import {FC} from 'react';

import AppButton from '@ui/app-button';

interface Props {
  btnTitle: string;
}

const SubmitButton: FC<Props> = props => {
  const {handleSubmit, isSubmitting} = useFormikContext();
  return (
    <AppButton
      btnTitle={props.btnTitle}
      onPress={handleSubmit}
      loading={isSubmitting}
    />
  );
};

export default SubmitButton;
