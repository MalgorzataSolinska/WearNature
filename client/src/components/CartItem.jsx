import React from 'react';
import { CloseButton, Flex, Select, useColorMode as mode, Stack, Image, Box, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/actions/cartActions';

const CartItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();
  return (
    <Flex direction={{ base: 'column', md: 'row' }} justify='space-between' align='center'>
      <Stack direction='row' spacing='3' width='full'>
        <Image rounded='lg' w='120px' h='120px' fit='contain' src={image} alt={name} draggable='false' loading='lazy' />
        <Box pt='7'>
          <Stack>
            <Text fontWeight='medium'>{name}</Text>
          </Stack>
        </Box>
      </Stack>
      <Flex
        w='full'
        mt={{ base: '4', md: '0' }}
        align={{ base: 'center', md: 'baseline' }}
        justify='space-between'
        display='flex'
      >
        <Select
          maxW='64px'
          focusBorderColor={mode('teal.500', 'teal.200')}
          value={qty}
          onChange={(e) => {
            dispatch(addCartItem(id, e.target.value));
          }}
        >
          {[...Array(stock).keys()].map((x) => (
            <option key={x + 1} value={x + 1}>
              {x + 1}
            </option>
          ))}
        </Select>
        <Text fontWeight='bold'>{price} zł </Text>
        <CloseButton onClick={() => dispatch(removeCartItem(id))} />
      </Flex>
    </Flex>
  );
};

export default CartItem;
