import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link as ReactLink, useLocation } from 'react-router-dom';
import PasswordTextField from '../components/PasswordTextField';
import TextField from '../components/TextField';
import PasswordForgottenForm from '../components/PasswordForgottenForm';
import { login } from '../redux/actions/userActions';

const LoginScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const redirect = '/products';
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const [showPasswordReset, setShowPasswordReset] = useState(false);

  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      if (location.state?.from) {
        navigate(location.state.from);
      } else {
        navigate(redirect);
      }
    }
  }, [userInfo, redirect, error, navigate, location.state,  showPasswordReset]);

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Niepoprawny adres email').required('Adres email jest wymagany'),
        password: Yup.string().min(8, 'Niepoprawne hasło (min 8 znaków) ').required('Hasło jest wymagane'),
      })}
      onSubmit={(values) => {
        dispatch(login(values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={{ base: 'lg', md: 'xl' }}> Zaloguj się </Heading>
                <HStack spacing='1' justify='center'>
                  <Text color='muted'> Nie masz konta? </Text>
                  <Button as={ReactLink} to='/registration ' variant='link' colorScheme='red'>
                    Załóż konto
                  </Button>
                </HStack>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', sm: '8' }}
              px={{ base: '0', sm: '8' }}
              bg={{ boxBR }}
              boxShadow={{ base: 'none', md: 'xl' }}
            >
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
                    <TextField type='text' name='email' placeholder='Adres email' />
                    <PasswordTextField type='password' name='password' placeholder='Hasło' />
                    <Button
                      
                      onClick={() => setShowPasswordReset(!showPasswordReset)}
                      size='sm'
                      textColor='teal'
                      variant='ghost'
                    >
                      Nie pamiętasz hasła?
                    </Button>
                    {showPasswordReset && <PasswordForgottenForm />}
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  {!showPasswordReset && (
                  <Button colorScheme='red' size='lg' fontSize='md' isLoading={loading} type='submit'>
                    Zaloguj się
                  </Button>
                  )}
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default LoginScreen;
