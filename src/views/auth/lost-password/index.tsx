import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import AuthInputFields from '@components/auth/auth-input-fields';
import {lostPasswordValidationSchema} from '@utils/validationSchema';
import FormComponent from '@components/shared/form';
import SubmitButton from '@components/shared/buttons/submit';
import AppLink from '@ui/links/app';
import AuthFormContainer from '@components/auth/form-container';
import {AuthStackParamList} from 'src/@types/navigation';
import {IForgotPassword} from 'src/@types/auth';
import {FormikHelpers} from 'formik';
import {forgotPasswordHandler} from 'src/api/auth';

interface Props {}

const initialValues = {
  email: '',
};

const LostPasswordScreen: FC<Props> = props => {
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async (
    values: IForgotPassword,
    actions: FormikHelpers<IForgotPassword>,
  ) => {
    actions.setSubmitting(true);
    const {err, data} = await forgotPasswordHandler(values);
    if (err) {
      actions.setSubmitting(false);
      return Toast.show({type: 'error', text1: err});
    }
    actions.setSubmitting(false);
    Toast.show({type: 'success', text1: 'Please check your mail.'});
    console.log(data);
  };

  return (
    <FormComponent
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={lostPasswordValidationSchema}>
      <AuthFormContainer
        heading="Forget Password!"
        subheading="OOPS, did you forget your password? Do not worry, we will help you get back in.">
        <View style={styles.formContainer}>
          <AuthInputFields
            placeholder="john@gmail.com"
            label="Email"
            keyboardType="email-address"
            name="email"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />

          <SubmitButton btnTitle="Send Link" />
          <View style={styles.linkContainer}>
            <AppLink
              title="Sign in"
              onPress={() => navigation.navigate('signin')}
            />
            <AppLink
              title="Sign up"
              onPress={() => navigation.navigate('signup')}
            />
          </View>
        </View>
      </AuthFormContainer>
    </FormComponent>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  marginBottom: {
    marginBottom: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 5,
  },
});

export default LostPasswordScreen;
