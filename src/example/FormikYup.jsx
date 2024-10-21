import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import {Formik} from 'formik';
import {Button, Input, Toggle, Icon} from '@ui-kitten/components';
import * as Yup from 'yup';

const FormikYup = () => {
  const ErrorMessage = ({error, touched}) => {
    if (!error || !touched) return null;
    return <CustomText style={styles.errorText}>{error}</CustomText>;
  };
  // ikonlar
  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

  const registerSchema = Yup.object().shape({
    name: Yup.string().required('Zorunlu Alan'),
    surname: Yup.string().required('Zorunlu Alan'),
    email: Yup.string()
      .required('Zorunlu Alan')
      .email('Lütfen geçerli bir mail adresi giriniz.'),
    phone: Yup.string()
      .matches(/^[0]{1}[5]{1}[0-9]{9}$/, 'Geçerli bir telefon numarası giriniz')
      .required('Telefon numarası zorunlu'),
    password: Yup.string()
      .required('Zorunlu Alan')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,50}$/,
        'Şartlar sağlanmıyor!!!!',
      ),
    passwordConfirm: Yup.string()
      .required('Zorunlu Alan')
      .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor.'),
    aggrementConfirm: Yup.boolean()
      .oneOf([true], 'Kullanıcı sözleşmesini kabul etmelisiniz.')
      .required('Kullanıcı sözleşmesini onaylamanız gerekiyor.'),
  });
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerContainerText}>
          Kayıt Oluştur
        </CustomText>
      </View>

      <View style={{flex: 1, padding: 10}}>
        <ScrollView automaticallyAdjustKeyboardInsets>
          <Formik
            initialValues={{
              email: '',
              name: '',
              surname: '',
              phone: '',
              password: '',
              passwordConfirm: '',
              aggrementConfirm: false,
            }}
            validationSchema={registerSchema}
            onSubmit={values => {
              Alert.alert(
                'Kullanıcı Bilgileri',
                JSON.stringify(values, null, 2),
              );
            }}>
            {({
              values,
              handleChange,
              handleSubmit,
              errors,
              setFieldValue,
              handleBlur,
              touched,
            }) => (
              <View>
                <Input
                  size="large"
                  style={styles.input}
                  value={values.name}
                  label={'İsim:'}
                  placeholder="İsim giriniz . . . "
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  status={errors.name && touched.name ? 'danger' : 'basic'}
                  accessoryRight={errors.name && touched.name && AlertIcon}
                />
                <ErrorMessage error={errors.name} touched={touched.name} />

                <Input
                  size="large"
                  style={styles.input}
                  value={values.surname}
                  label={'Soyadı:'}
                  placeholder="Soyadı giriniz . . . "
                  onChangeText={handleChange('surname')}
                  onBlur={handleBlur('surname')}
                  status={
                    errors.surname && touched.surname ? 'danger' : 'basic'
                  }
                  accessoryRight={
                    errors.surname && touched.surname && AlertIcon
                  }
                />
                <ErrorMessage
                  error={errors.surname}
                  touched={touched.surname}
                />

                <Input
                  size="large"
                  style={styles.input}
                  value={values.email}
                  label={'Email:'}
                  placeholder="Email giriniz . . . "
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  status={errors.email && touched.email ? 'danger' : 'basic'}
                  accessoryRight={errors.email && touched.email && AlertIcon}
                />
                <ErrorMessage error={errors.email} touched={touched.email} />

                <Input
                  size="large"
                  style={styles.input}
                  value={values.phone}
                  label={'Telefon:'}
                  placeholder="Ör:05 _ _ "
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  status={errors.phone && touched.phone ? 'danger' : 'basic'}
                  accessoryRight={errors.phone && touched.phone && AlertIcon}
                />
                <ErrorMessage error={errors.phone} touched={touched.phone} />

                <Input
                  size="large"
                  style={styles.input}
                  value={values.password}
                  label={'Şifre:'}
                  placeholder="Şifre giriniz . . . "
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  status={
                    errors.password && touched.password ? 'danger' : 'basic'
                  }
                  accessoryRight={
                    errors.password && touched.password && AlertIcon
                  }
                />
                <ErrorMessage
                  error={errors.password}
                  touched={touched.password}
                />

                <Input
                  size="large"
                  style={styles.input}
                  value={values.passwordConfirm}
                  label={'Şifre Tekrar:'}
                  placeholder="Şifre Tekrar giriniz . . . "
                  onChangeText={handleChange('passwordConfirm')}
                  onBlur={handleBlur('passwordConfirm')}
                  status={
                    errors.passwordConfirm && touched.passwordConfirm
                      ? 'danger'
                      : 'basic'
                  }
                  accessoryRight={
                    errors.passwordConfirm &&
                    touched.passwordConfirm &&
                    AlertIcon
                  }
                />
                <ErrorMessage
                  error={errors.passwordConfirm}
                  touched={touched.passwordConfirm}
                />

                <View style={{paddingHorizontal: 20}}>
                  <Toggle
                    style={{marginTop: 10, marginHorizontal: 10}}
                    checked={values.aggrementConfirm}
                    onChange={value =>
                      setFieldValue('aggrementConfirm', value)
                    }>
                    Kullanıcı Sözleşmesini ve Gizlilik Anlaşmasını Kabul
                    Ediyorum.
                  </Toggle>
                  {touched.aggrementConfirm && errors.aggrementConfirm && (
                    <CustomText style={{color: 'red'}}>
                      Kullanıcı sözleşmesini ve gizlilik anlaşmasını kabul
                      etmelisiniz.
                    </CustomText>
                  )}
                </View>

                <Button
                  style={{marginTop: 30}}
                  status="success"
                  size="large"
                  onPress={handleSubmit}>
                  Kaydet
                </Button>
              </View>
            )}
          </Formik>
        </ScrollView>
      </View>
    </View>
  );
};

export default FormikYup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    minHeight: 75,
    padding: 20,
    backgroundColor: '#00e096',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
  },
  input: {
    marginVertical: 10,
  },
});
