import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  Container,
  FormControl,
  Heading,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
  useToast,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import PasswordTextField from '../components/PasswordTextField';
import { resetPassword, resetState } from '../redux/actions/userActions';

const PasswordResetScreen = () => {
  const { token } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();

  const { loading, error, serverStatus, serverMsg } = useSelector((state) => state.user);

  const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
  const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

  useEffect(() => {
    if (serverStatus && serverMsg) {
      toast({
        description: `${serverMsg}`,
        status: 'success',
        isCloasable: true,
      });
      dispatch(resetState());
    }
  }, [error, toast, serverMsg, serverStatus, dispatch]);

  return serverStatus ? (
    <Center minH='90vh'>
      <VStack>
        <Text my='10' fontSize='xl'>
          Hasło zostało zmienione
        </Text>
        <Button as={ReactLink} to='/login' variant='ghost' colorScheme='teal' w='300px'>
          Zaloguj się
        </Button>
      </VStack>
    </Center>
  ) : (
    <Formik
      initialValues={{ password: '' }}
      validationSchema={Yup.object({
        password: Yup.string().min(8, 'Niepoprawne hasło (min 8 znaków) ').required('Hasło jest wymagane'),
        confirmPassword: Yup.string()
          .min(8, 'Niepoprawne hasło (min 8 znaków) ')
          .required('Hasło jest wymagane')
          .oneOf([Yup.ref('password'), null], 'Hasła muszą być takie same'),
      })}
      onSubmit={(values) => {
        dispatch(resetPassword(values.password, token));
      }}
    >
      {(formik) => (
        <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: 0, md: '8' }} minH='4xl'>
          <Stack spacing='8'>
            <Stack spacing='6'>
              <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                <Heading size={headingBR}>Zmień hasło</Heading>
              </Stack>
            </Stack>
            <Box
              py={{ base: '0', md: '8' }}
              px={{ base: '4', md: '10' }}
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
                    <AlertTitle> Przepraszamy!</AlertTitle>
                    <AlertDescription> {error}</AlertDescription>
                  </Alert>
                )}
                <Stack spacing='5'>
                  <FormControl>
                    <PasswordTextField type='password' name='password' placeholder='Nowe hasło' />
                    <PasswordTextField type='password' name='confirmPassword' placeholder='Powtórz nowe hasło' />
                  </FormControl>
                </Stack>
                <Stack spacing='6'>
                  <Button colorScheme='teal' size='lg' fontSize='md' isLoading={loading} type='submit'>
                    {' '}
                    Ustaw nowe hasło
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

export default PasswordResetScreen;
