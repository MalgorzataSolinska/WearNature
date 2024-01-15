import React from 'react';
import {
  Alert, 
  AlertIcon, 
  AlertTitle, 
  AlertDescription, 
  Spacer,
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
import PayPalButton from './PayPalButton';
import { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import { createOrder, resetOrder } from '../redux/actions/orderActions';
import CheckoutItem from './CheckoutItem';
import { resetCart } from '../redux/actions/cartActions';
import PaymentSuccessModal from './PaymentSuccessModal';
import PaymentErrorModal from './PaymentErrorModal';

const CheckoutOrderSummary = () => {
  const { onClose: onErrorClose, onOpen: onErrorOpen, isOpen: isErrorOpen } = useDisclosure();
  const { onClose: onSuccessClose, onOpen: onSuccessOpen, isOpen: isSuccessOpen } = useDisclosure();
  const colorMode = mode('gray.600', 'gray.400');
  const standardShipping = Number(9.99).toFixed(2);
  const cartItems = useSelector((state) => state.cart);
  const { cart, subtotal } = cartItems;
  const user = useSelector((state) => state.user);
  const { userInfo } = user;
  const ShippingInformation = useSelector((state) => state.order);
  const { error, shippingAddress } = ShippingInformation;
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const dispatch = useDispatch();

  const shipping = useCallback(() => (subtotal <= 99.99 ? standardShipping : 0.0), [subtotal, standardShipping]);
  const total = useCallback(
    () => Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + Number(standardShipping)).toFixed(2),
    [standardShipping, subtotal, shipping]
  );

  useEffect(() => {
    if (!error) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [error, shippingAddress, total, shipping, dispatch, userInfo]);

  const onPaymentSuccess = async (data) => {
    onSuccessOpen();
    dispatch(
      createOrder({
        orderItems: cart,
        shippingAddress,
        paymentMethod: data.paymentSource,
        paymentDetails: data,
        shippingPrice: shipping(),
        totalPrice: total(),
        userInfo,
      })
    );

    dispatch(resetOrder());
    dispatch(resetCart());
  };

  const onPaymentError = () => {
    onErrorOpen();
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
          <Text fontWeight='extrabold' fontSize='xl'>
            {Number(total()).toFixed(2)} zł
          </Text>
        </Flex>
      </Stack>
      <Divider bg={mode('gray.400', 'gray.800')} />
      {userInfo.active ? (<PayPalButton
        total={total}
        onPaymentSuccess={onPaymentSuccess}
        onPaymentError={onPaymentError}
        disabled={buttonDisabled}
      />) :   
      <Box>
      <Alert status='warning'>
        <AlertIcon />
        <AlertTitle> Aby dokończyć zakupy potwierdź adres email. </AlertTitle>
        <Spacer />
      </Alert>
    </Box> }
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
      <PaymentErrorModal onClose={onErrorClose} onOpen={onErrorOpen} isOpen={isErrorOpen} />
      <PaymentSuccessModal onClose={onSuccessClose} onOpen={onSuccessOpen} isOpen={isSuccessOpen} />
    </Stack>
  );
};

export default CheckoutOrderSummary;
