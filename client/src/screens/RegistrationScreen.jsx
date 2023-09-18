import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  FormControl,
  Heading,
  HStack,
  Stack,
  Text,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { register } from '../redux/actions/userActions';


const RegistrationScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, userInfo } = user;
  const redirect = '/products';
  const toast = useToast();
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
      toast({ description: 'Konto utworzone', status: 'success', isClosable: true });
    }
  }, [userInfo, redirect, error, navigate, toast]);

  return (
    <Formik
      initialValues={{ email: '', password: '', firstName: '', lastName: '' }}
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
        dispatch(register(values.firstName, values.lastName, values.email, values.password));
      }}
    >
      {(formik) => (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={{ base: 'lg', md: 'xl' }}> Załóż konto </Heading>
                <HStack spacing='1' justify='center'>
                  <Text color='muted'> Masz już konto?</Text>
                  <Button as={ReactLink} to='/login' variant='link' colorScheme='red'>
                    Zaloguj się
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
                    <TextField type='text' name='firstName' placeholder='Imię' />
                    <TextField type='text' name='lastName' placeholder='Nazwisko' />
                    <TextField type='text' name='email' placeholder='Adres email' />
                    <PasswordTextField type='password' name='password' placeholder='Hasło' />
                    <PasswordTextField type='password' name='confirmPassword' placeholder='Powtórz hasło' />
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  <Button colorScheme='red' size='lg' fontSize='md' isLoading={loading} type='submit'>
                    Załóż konto
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      )}
    </Formik>
  );
};

export default RegistrationScreen;
