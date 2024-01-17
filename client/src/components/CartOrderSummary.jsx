import React from 'react';
import { Button, Flex, Heading, Stack, Text, useColorModeValue as mode, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link as ReactLink, useNavigate } from 'react-router-dom';

const CartOrderSummary = () => {
  const [buttonLoading, setButtonLoading] = useState();
  const standardShipping = Number(9.99).toFixed(2);
  const cartItems = useSelector((state) => state.cart);
  const { subtotal } = cartItems;
  const navigate = useNavigate;
  const checkoutHandler = () => {
    setButtonLoading(true);
    navigate('/checkout');
  };
  return (
    <Stack spacing='8' borderWidth='1px' rounded='lg' padding='8' w='full'>
      <Heading size='md'> Podsumowanie zamówienia </Heading>
      <Stack spacing='6'>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
            Wartość produktów
          </Text>
          <Text fontWeight='medium'>{subtotal} zł</Text>
        </Flex>
        <Flex justify='space-between'>
          <Text fontWeight='medium' color={mode('gray.600', 'gray.400')}>
            Dostawa
          </Text>
          <Text fontWeight='medium' textAlign='right'>
            {subtotal <= 99.99 ? (
             <Stack>
             <Text>
              {standardShipping} zł
              </Text> 
              <Text fontSize='small' fontWeight='thin'>
                Brakuje {Number(100-subtotal).toFixed(2)} zł do dostawy za 0 zł
              </Text>
              </Stack>
            ) : (
              <HStack spacing='2'>
                <Text fontWeight='thin' style={{ textDecorationLine: 'line-through' }}>
                  {standardShipping} zł
                </Text>
                <Text fontWeight='medium'>0.00 zł</Text>
              </HStack>
            )}
          </Text>
        </Flex>
        <Flex fontSize='lg' fontWeight='semibold' justify='space-between'>
          <Text fontSize='xl' fontWeight='extrabold' color={mode('gray.600', 'gray.400')}>
            Razem
          </Text>
          <Text fontSize='xl' fontWeight='extrabold' color={mode('gray.600', 'gray.400')}>
            {subtotal <= 99.99 ? Number(subtotal) + Number(standardShipping) : subtotal} zł
          </Text>
        </Flex>
      </Stack>
      <Button
        as={ReactLink}
        to='/checkout'
        colorScheme='teal'
        size='lg'
        fontSize='md'
        rightIcon={<FaArrowRight />}
        isLoading={buttonLoading}
        onClick={() => checkoutHandler()}
      >
        Zamawiam i płacę
      </Button>
    </Stack>
  );
};

export default CartOrderSummary;
