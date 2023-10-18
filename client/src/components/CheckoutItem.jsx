import React from 'react';
import {
  CloseButton,
  Flex,
  Select,
  useColorModeValue as mode,
  Image,
  Box,
  Text,
  Spacer,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { addCartItem, removeCartItem } from '../redux/actions/cartActions';

const CheckoutItem = ({ cartItem }) => {
  const { name, image, price, stock, qty, id } = cartItem;
  const dispatch = useDispatch();

  return (
    <>
      <Flex>
        <Box h='120px' w='120px'>
          <Image
            marginLeft='auto'
            marginRight='auto'
            maxHeight='120px'
            src={image}
            alt={name}
            draggable='false'
            loading='lazy'
          />
        </Box>
        <Flex direction='column' align='strech' flex='1' mx='2' spacing='4'>
          <Text noOfLines='2' maxW='150px'>
            {name}
          </Text>
          <Spacer />
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
        </Flex>
        <Box>
        <Flex direction='column' align='end'  mx='2' >
            <Text mb='20' fontWeight='bold'>{price} zł</Text>
            <CloseButton onClick={() => dispatch(removeCartItem(id))} />
          </Flex>
        </Box>
      </Flex>
      <Divider bg={mode('gray.400', 'gray.800')} />
    </>
  );
};

export default CheckoutItem;
