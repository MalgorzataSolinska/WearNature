import React from 'react';
import {
  Box,
  Flex,
  Heading,
  HStack,
  Link,
  Stack,
  useColorModeValue as mode,
  Spinner,
  Alert,
  AlertDescription,
  AlertTitle,
  AlertIcon,
  Wrap,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import CartOrderSummary from '../components/CartOrderSummary';

const CartScreen = () => {
  const cartInfo = useSelector((state) => state.cart);
  const { loading, error, cart } = cartInfo;
  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='7px' speed='1s' emptyColor='grey.200' color='teal.600' size='xl' />
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Przepraszamy!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : cart.length <= 0 ? (
        <Alert status='warning'>
          <AlertIcon />
          <AlertTitle> Twój koszyk jest pusty. </AlertTitle>
          <AlertDescription>
            <Link as={ReactLink} to='/products'>
              {' '}
              Kliknij, by wrócić do produktów.{' '}
            </Link>
          </AlertDescription>
        </Alert>
      ) : (
        <Box
          minW={{ md: 'xl' }}
          maxW={{ base: `3xl`, md: '5xl', lg: `7xl` }}
          mx='auto'
          px={{ base: '6', md: '12', lg: '12' }}
          py={{ base: '6', md: '12', lg: '12' }}
        >
          <Stack direction={{ base: 'column', md: 'column', lg: 'row' }} align={{ lg: 'flex-start' }} spacing={'16'}>
            <Stack spacing={{ base: '10', lg: '10' }} flex='2'>
              <Heading fontSize='2xl' fontWeight='extrabold'>
                Twój koszyk
              </Heading>

              <Stack spacing='6'>
                {cart.map((cartItem) => (
                  <CartItem key={cartItem.id} cartItem={cartItem} />
                ))}
              </Stack>
            </Stack>
            <Flex direction='column' align='center' flex='1.5'>
              <CartOrderSummary />
              <HStack mt='6' fontWeight='semibold'>
                <Link as={ReactLink} to='/products' color={mode('teal.600', 'teal.200')}>
                  {' '}
                  Kontynuuj zakupy
                </Link>
              </HStack>
            </Flex>
          </Stack>
        </Box>
      )}
    </Wrap>
  );
};

export default CartScreen;
