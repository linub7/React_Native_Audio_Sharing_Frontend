import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {FormikHelpers} from 'formik';

import AuthInputFields from '@components/auth/auth-input-fields';
import {signupValidationSchema} from '@utils/validationSchema';
import FormComponent from '@components/shared/form';
import SubmitButton from '@components/shared/buttons/submit';
import PasswordVisibilityIcon from '@ui/icons/password-visibility';
import AppLink from '@ui/links/app';
import AuthFormContainer from '@components/auth/form-container';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';
import {ISignupUser} from 'src/@types/auth';
import {signupHandler} from 'src/api/auth';

interface Props {}

const initialValues = {
  name: '',
  email: '',
  password: '',
};

const SignUpScreen: FC<Props> = props => {
  const [privateIcon, setPrivateIcon] = useState(true);
  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = async (
    values: ISignupUser,
    actions: FormikHelpers<ISignupUser>,
  ) => {
    actions.setSubmitting(true);
    const {err, data} = await signupHandler(values);
    if (err) {
      console.log(err);
      actions.setSubmitting(false);
      return;
    }
    actions.setSubmitting(false);
    navigation.navigate('verify-email', {userInfo: data?.user});
  };

  const handleTogglePrivateIcon = () => setPrivateIcon(!privateIcon);

  return (
    <FormComponent
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signupValidationSchema}>
      <AuthFormContainer
        heading="Welcome!"
        subheading="Let's get started by creating your account.">
        <View style={styles.formContainer}>
          <AuthInputFields
            placeholder="John Doe"
            label="Name"
            name="name"
            containerStyle={styles.marginBottom}
          />

          <AuthInputFields
            placeholder="john@gmail.com"
            label="Email"
            keyboardType="email-address"
            name="email"
            autoCapitalize="none"
            containerStyle={styles.marginBottom}
          />

          <AuthInputFields
            placeholder="********"
            label="Password"
            secureTextEntry={privateIcon}
            name="password"
            containerStyle={styles.marginBottom}
            rightIcon={<PasswordVisibilityIcon privateIcon={privateIcon} />}
            onRightIconPress={handleTogglePrivateIcon}
          />
          <SubmitButton btnTitle="Sign up" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('lost-password')}
            />
            <AppLink
              title="Sign in"
              onPress={() => navigation.navigate('signin')}
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

export default SignUpScreen;
