import React from 'react';
import {
  Box,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue as mode,
  Badge,
  Link,
  Divider,
  useDisclosure,
  HStack,
} from '@chakra-ui/react';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import { createOrder } from '../redux/actions/orderActions';
import CheckoutItem from './CheckoutItem';

const CheckoutOrderSummary = () => {
  const colorMode = mode('gray.600', 'gray.400');
  const standardShipping = Number(9.99).toFixed(2);
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal } = cartItems;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const ShippingInfo = useSelector((state) => state.order);
  const { error, shippingAddress } = cartItems;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const shipping = useCallback(() => (subtotal <= 99.99 ? { standardShipping } : 0.0), [subtotal]);
  const total = useCallback(
    () => Number(shipping() === 0 ? Number(subtotal) : (Number(subtotal) + shipping()).toFixed(2)),
    [shipping, subtotal]
  );
  const onPaymentSuccess = () => alert('Zamówienie w realizacji');
  const onPaymentError = () => {
    alert('Problem z płatnością');
  };
  return (
    <Stack spacing='8' rounded='xl' padding='8' width='full'>
      <Heading size='md'>Podsumowanie zamówienia</Heading>
      {cart.map((item) => (
        <CheckoutItem key={item.id} cartItem={item} />
      ))}
      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Wartość produktów:
          </Text>
          <Text fontWeight='medium' color={colorMode}>
            {subtotal} zł
          </Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={colorMode}>
            Dostawa:
          </Text>
          {shipping() === 0 ? (
            <HStack>
              <Text fontWeight='thin' color={colorMode} style={{ textDecorationLine: 'line-through' }}>
                {standardShipping} zł
              </Text>
              <Text fontWeight='medium'>0.00 zł</Text>
            </HStack>
          ) : (
            <Text fontWeight='medium' color={colorMode}>
              {shipping()} zł
            </Text>
          )}
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='semobold' fontSize='lg'>
            Razem z dostawą:
          </Text>
          <Text fontWeight='extrabold' fontsize='xl'>
            {Number(total()).toFixed(2)} zł
          </Text>
        </Flex>
      </Stack>
      <Divider bg={mode('gray.400', 'gray.800')} />
      <Box align='center'>
        <Text fontSize='small' fontWeight='thin'>
          Masz pytanie lub problem? Skontaktuj się z nami.
        </Text>
        <Flex justifyContent='center' fontSize='small' fontWeight='thin'>
          <Flex align='center' justify='space-evenly'>
            <ChatIcon />
            <Text marginLeft='1' marginRight='4'>
              Czat
            </Text>
            <PhoneIcon />
            <Text marginLeft='1' marginRight='4'>
              Telefon
            </Text>
            <EmailIcon />
            <Text marginLeft='1'>Email</Text>
          </Flex>
        </Flex>
      </Box>
    </Stack>
  );
};

export default CheckoutOrderSummary;
