import { RadioGroup } from '@chakra-ui/react';
import React from 'react';
import { BiPackage, BiSupport, BiSend } from 'react-icons/bi';
import { FiTruck } from 'react-icons/fi';
import {
  Divider,
  useColorModeValue as mode,
  Box,
  Heading,
  VStack,
  FormControl,
  Flex,
  Stack,
  Text,
  Radio,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { setShippingAddress, setShippingAddressError } from '../redux/actions/orderActions';
import { color } from 'framer-motion';

const ShippingInformation = () => {
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const dispatch = useDispatch();
  const [formStateChanged, setFormStateChanged] = useState(false);
  const colorMode = mode('gray.600', 'gray.400');

  const setErrorState = (input, data) => {
    if (!input) {
      dispatch(setShippingAddress(data));
    }
    if ((!formStateChanged && !input) || (formStateChanged && input)) {
      return;
    } else {
      setFormStateChanged(input);
      dispatch(setShippingAddressError(input));
    }
  };

  return (
    <>
      <Formik
        initialValues={{
          firstName: userInfo.firstName,
          lastName: userInfo.lastName,
          phoneNumber: '',
          streetName: '',
          streetNumber: '',
          postalCode: ' ',
          city: '',
          country: '',
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required('Imię jest wymagane.'),
          lastName: Yup.string().required('Nazwisko jest wymagane.'),
          phoneNumber: Yup.string()
            .matches(/^[0-9]{9}$/, 'Numer telefonu powinien składać się z 9 cyfr.')
            .required('Numer telefonu jest wymagany.'),
          streetName: Yup.string().required('Nazwa ulicy jest wymagana. '),
          streetNumber: Yup.string().required('Numer jest wymagany'),
          postalCode: Yup.string()
            .matches(/\d{2}-\d{3}$/, 'Kod pocztowy musi być zapisany w formacie 00-000.')
            .required('Kod pocztowy jest wymagany.'),
          city: Yup.string().required('Miejscowość jest wymagana'),
          country: Yup.string().required('Kraj jest wymagany'),
        })}
      >
        {(formik) => (
          <VStack as='form'>
            <FormControl
              onChange={
                Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                  ? setErrorState(false, formik.values)
                  : setErrorState(true)
              }
            >
              <Flex>
                <Box flex='1' mr='10'>
                  <TextField name='firstName' label='Imię' placeholder='np. Jan' />
                </Box>
                <Box flex='1'>
                  <TextField name='lastName' label='Nazwisko' placeholder='np. Kowalski' />
                </Box>
              </Flex>

              <TextField name='phoneNumber' label='Numer telefonu' placeholder='np. 666777888' />
              <Flex>
                <Box flex='1' mr='10'>
                  <TextField name='streetName' label='Ulica' placeholder='np. Kochanowskiego' />
                </Box>
                <Box flex='1'>
                  <TextField name='streetNumber' label='Numer domu (i mieszkania)' placeholder='np. 94a/11c' />
                </Box>
              </Flex>
              <Flex>
                <Box flex='1' mr='10'>
                  <TextField name='postalCode' label='Kod pocztowy' placeholder='np. 00-000' />
                </Box>
                <Box flex='1'>
                  <TextField name='city' label='Miasto' placeholder='Kraków' />
                </Box>
              </Flex>
              <TextField name='country' label='Kraj' placeholder='np. Polska' />
            </FormControl>
          </VStack>
        )}
      </Formik>

      <Divider bg={colorMode} />

      <Box align='left'>
        <Stack w='400'>
          <Flex alignItems='center'>
            <BiPackage size='20px' />
            <Text fontWeight='md' fontSize='sm' ml='2'>
              Darmowa dostawa kurierem DPD przy zakupach od 100 zł
            </Text>
          </Flex>
          <Flex alignItems='center'>
            <FiTruck size='20px' />
            <Text fontWeight='md' fontSize='sm' ml='2'>
              Wysyłka w 24h
            </Text>
          </Flex>
          <Flex alignItems='center'>
            <BiSupport size='20px' />
            <Text fontWeight='md' fontSize='sm' ml='2'>
              Jesteśmy dla Ciebie 24/7
            </Text>
          </Flex>
        </Stack>{' '}
      </Box>
    </>
  );
};

export default ShippingInformation;
