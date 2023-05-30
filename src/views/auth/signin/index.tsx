import {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AuthInputFields from '@components/auth/auth-input-fields';
import {signinValidationSchema} from '@utils/validationSchema';
import FormComponent from '@components/shared/form';
import SubmitButton from '@components/shared/buttons/submit';
import PasswordVisibilityIcon from '@ui/icons/password-visibility';
import AppLink from '@ui/links/app';
import AuthFormContainer from '@components/auth/form-container';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthStackParamList} from 'src/@types/navigation';

interface Props {}

const initialValues = {
  email: '',
  password: '',
};

const SigninScreen: FC<Props> = props => {
  const [privateIcon, setPrivateIcon] = useState(true);

  const navigation = useNavigation<NavigationProp<AuthStackParamList>>();

  const handleSubmit = (values: Object) => {
    console.log(values);
  };

  const handleTogglePrivateIcon = () => setPrivateIcon(!privateIcon);

  return (
    <FormComponent
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={signinValidationSchema}>
      <AuthFormContainer heading="Welcome Back!">
        <View style={styles.formContainer}>
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
          <SubmitButton btnTitle="Sign in" />
          <View style={styles.linkContainer}>
            <AppLink
              title="I Lost My Password"
              onPress={() => navigation.navigate('lost-password')}
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

export default SigninScreen;
