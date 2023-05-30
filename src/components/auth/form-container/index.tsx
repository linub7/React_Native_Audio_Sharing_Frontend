import CirclesComponent from '@components/shared/circles';
import colors from '@utils/colors';
import {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  heading: string;
  subheading?: string;
  children: ReactNode;
}

const AuthFormContainer: FC<Props> = ({heading, subheading, children}) => {
  return (
    <View style={styles.container}>
      <CirclesComponent />
      <View style={styles.innerContainer}>
        <Image source={require('../../../assets/logo.png')} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subheading}>{subheading}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  innerContainer: {width: '100%', marginBottom: 20},
  heading: {
    color: colors.SECONDARY,
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 5,
  },
  subheading: {color: colors.CONTRAST, fontSize: 16},
});

export default AuthFormContainer;
