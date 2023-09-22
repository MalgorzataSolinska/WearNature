import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardHeader,
  CardBody,
  StackDivider,
  Container,
  FormControl,
  Flex,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
  useRangeSliderContext,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { register } from '../redux/actions/userActions';
import { updateProfile, resetUpdateSuccess } from '../redux/actions/userActions';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { userInfo, error, loading, updateSuccess } = user;
  const location = useLocation();
  const toast = useToast();

  useEffect(() => {
    if (updateSuccess) {
      toast({ description: 'Zmiany zostały zapisane.', status: 'success', isClosable: true });
    }
  });

  return userInfo ? (
    <Formik
      initialValues={{
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: '',
        confirmPassword: '',
      }}
      validationSchema={Yup.object({
        firstName: Yup.string().required('Imię jest wymagane.'),
        lastName: Yup.string().required('Nazwisko jest wymagane.'),
        email: Yup.string().email('Niepoprawny adres email').required('Adres email jest wymagany'),
        password: Yup.string().min(8, 'Niepoprawne hasło (min 8 znaków) ').required('Hasło jest wymagane'),
        confirmPassword: Yup.string()
          .min(8, 'Niepoprawne hasło (min 8 znaków) ')
          .required('Hasło jest wymagane')
          .oneOf([Yup.ref('password'), null], 'Hasła muszą być identyczne'),
      })}
      onSubmit={(values) => {
        dispatch(resetUpdateSuccess());
        dispatch(updateProfile(userInfo._id, values.firstName, values.lastName, values.email, values.password));
      }}
    >
      {(formik) => (
        <Box
          minH='100vh'
          maxW={{ base: '3xl', lg: '7xl' }}
          mx='auto'
          px={{ base: '4', md: '8', lg: '12' }}
          py={{ base: '6', md: '8', lg: '12' }}
        >
          <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
            <Stack pr={{ base: '0', md: '10' }} flex='1.5' mb={{ base: '2xl', md: 'none' }}>
              <Heading fontSize='2xl' fontWeight='extrabold'>
                Profil użytkownika
              </Heading>
              <Stack spacing='6'>
                <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                  {error && (
                    <Alert
                      status='error'
                      flexDirection='column'
                      alignItems='center'
                      justifyContent='center'
                      textAlign='center'
                    >
                      <AlertIcon />
                      <AlertTitle> Przepraszamy! </AlertTitle>
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                  <Stack spacing='5'>
                    <FormControl>
                      <TextField type='text' firstName='firstName' placeholder='Imię' />
                      <TextField type='text' name='lastName' placeholder='Nazwisko' />
                      <TextField type='text' name='email' placeholder='Adres email' />
                      <PasswordTextField type='password' name='password' placeholder='Hasło' />
                      <PasswordTextField type='password' name='confirmPassword' placeholder='Powtórz hasło' />
                    </FormControl>
                  </Stack>
                  <Stack spacing='6'>
                    <Button color='red' size='lg' fontSize='md' isLoading={loading} type='submit'>
                      Zapisz zmiany
                    </Button>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
              <Card>
                <CardHeader>
                  <Heading size='md'>User Report </Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box pt='2' fontSize='sm'>
                      Registered on {new Date(userInfo.createdAt).toDateString()}
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
            </Flex>
          </Stack>
        </Box>
      )}
    </Formik>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};
export default ProfileScreen;
