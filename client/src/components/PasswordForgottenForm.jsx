import React from 'react';
import { Text, Stack, Box, Button, Input, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { sendResetEmail } from '../redux/actions/userActions';

const PasswordForgottenForm = () => {
  const dispatch = useDispatch();
  const toast= useToast(); 
  const [email, setEmail] = useState('');
  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  return (
    <>
      <Box my='4'>
        <Text> Podaj adres email przypisany do Twojego konta.</Text>
        <Text> Wyślemy link do zmiany hasła. </Text>
      </Box>
      <Stack>
        <Input
          mb='4'
          type='text'
          name='email'
          placeholder='Twój adres email'
          label='Email'
          value={email}
          onChange={(e) => handleChange(e)}
        ></Input>
        <Button colorScheme='yellow' size='lg' fontSize='md' onClick={() => {dispatch(sendResetEmail(email)); toast({ description: 'Email z instrukcją zmiany hasła został wysłany na podany adres. ', status: 'success', isClosable: true }); }}>
          {' '}
          Wyślj email{' '}
        </Button>
      </Stack>
    </>
  );
};

export default PasswordForgottenForm;
