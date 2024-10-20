import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import React from 'react';
import CustomText from '../components/CustomText';
import {Formik} from 'formik';
import {Button, Input, Toggle} from '@ui-kitten/components';
import * as Yup from 'yup';

const FormikYup = () => {
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
        <ScrollView>
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
            {({values, handleChange, handleSubmit, errors, setFieldValue}) => (
              <View>
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.name}
                  label={'İsim:'}
                  placeholder="İsim giriniz . . . "
                  onChangeText={handleChange('name')}
                  status={errors.name ? 'danger' : 'basic'}
                  caption={errors.name}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.surname}
                  label={'Soyadı:'}
                  placeholder="Soyadı giriniz . . . "
                  onChangeText={handleChange('surname')}
                  status={errors.surname ? 'danger' : 'basic'}
                  caption={errors.surname}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.email}
                  label={'Email:'}
                  placeholder="Email giriniz . . . "
                  onChangeText={handleChange('email')}
                  status={errors.email ? 'danger' : 'basic'}
                  caption={errors.email}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.phone}
                  label={'Telefon:'}
                  placeholder="Telefon giriniz . . . "
                  onChangeText={handleChange('phone')}
                  status={errors.phone ? 'danger' : 'basic'}
                  caption={errors.phone}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.password}
                  label={'Şifre:'}
                  placeholder="Şifre giriniz . . . "
                  onChangeText={handleChange('password')}
                  status={errors.password ? 'danger' : 'basic'}
                  caption={errors.password}
                />
                <Input
                  size="large"
                  style={{marginVertical: 10}}
                  value={values.passwordConfirm}
                  label={'Şifre Tekrar:'}
                  placeholder="Şifre Tekrar giriniz . . . "
                  onChangeText={handleChange('passwordConfirm')}
                  status={errors.passwordConfirm ? 'danger' : 'basic'}
                  caption={errors.passwordConfirm}
                />
                <View style={{paddingHorizontal: 20}}>
                  <Toggle
                    style={{marginTop: 10, marginHorizontal: 10}}
                    checked={values.aggrementConfirm} // 'value' yerine 'checked' kullanılmalı
                    onChange={value => setFieldValue('aggrementConfirm', value)} // Değeri güncellemek için setFieldValue kullanılır
                    status={errors.aggrementConfirm ? 'danger' : 'basic'}>
                    Kullanıcı Sözleşmesini ve Gizlilik Anlaşmasını Kabul
                    Ediyorum.
                  </Toggle>
                  {errors.aggrementConfirm && (
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
          <CustomText>Selam</CustomText>
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
    minHeight: 125,
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
});
