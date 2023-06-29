import React from 'react';
import {
  Flex,
  Button,
  Circle,
  Box,
  Icon,
  Image,
  Badge,
  useColorModeValue,
  Tooltip,
  Stack,
  Link,
  HStack,
  Text,
  AspectRatio,
  useToast,
} from '@chakra-ui/react';
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactLink } from 'react-router-dom';
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { GiWool } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { addCartItem } from '../redux/actions/cartActions';

const Rating = ({ rating, numberOfReviews }) => {
  const { iconSize, setIconSize } = useState('14px');
  return (
    <Flex>
      <HStack spacing='2px'>
        <StarIcon size={iconSize} w='14px' color='yellow.400' />
        <StarIcon size={iconSize} w='14px' color={rating >= 2 ? 'yellow.400' : 'gray.200'} />
        <StarIcon size={iconSize} w='14px' color={rating >= 3 ? 'yellow.400' : 'gray.200'} />
        <StarIcon size={iconSize} w='14px' color={rating >= 4 ? 'yellow.400' : 'gray.200'} />
        <StarIcon size={iconSize} w='14px' color={rating >= 5 ? 'yellow.400' : 'gray.200'} />
      </HStack>
      <Text fontSize='md' fontWeight='light' ml='4px'>
        {' '}
        {`${numberOfReviews} ${numberOfReviews === 0 ? 'Reviews' : numberOfReviews === 1 ? 'Review' : 'Reviews'}`}
      </Text>
    </Flex>
  );
};

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const cartInfo = useSelector((state) => state.cart);
  const { cart } = cartInfo;
  const addItem = (id) => {
    if (cart.some((cartItem) => cartItem.id === id )) {
      toast({
        description: 'Ten przedmiot jest juz w koszyku. Przejdź do koszyka, by zmienić ilość produktów.',
        status: 'error',
        isClosable: true,
      });
    } else {
      dispatch(addCartItem(id, 1));
      toast({ description: 'Przedmiot dodany do koszyka.', status: 'success', isClosable: true });
    }
  };

  return (
    <Stack
      p='2'
      spacing='3px'
      bg={useColorModeValue('white', 'gray.800')}
      minW='240px'
      h='450px'
      borderWidth='1px'
      rounded='lg'
      shadow='lg'
      position='relative'
    >
      <Flex h='300' alignSelf='center'>
        <Box>
          <Image maxH='220px' src={product.image} alt={product.name} roundedTop='lg' />
        </Box>
      </Flex>
      <Flex flex='1' maxH='5' alignItem='baseline' justify='space-between'>
        <Box>
          {product.stock <= 0 && (
            <Badge rounded='full' px='2' fontSize='1em' colorScheme='red' alignSelf='center' marginTop='1.5'>
              WYPRZEDANE
            </Badge>
          )}
          {product.isNew && (
            <Badge rounded='full' px='2' fontSize='1em' colorScheme='green' alignSelf='center' marginTop='1.5'>
              NOWOŚĆ
            </Badge>
          )}
        </Box>
        {product.isHandmade && (
          <Tooltip label='Handmade' bg='white' placement='top' color='gray.800' fontSize='em'>
            <Button variant='unstyled' cursor='auto'>
              <Icon as={GiWool} h={6} w={6} />
            </Button>
          </Tooltip>
        )}
      </Flex>

      <Flex mt='1' justifyContent='space-between' alignContent='center'>
        <Link as={ReactLink} to={`/product/${product._id}`} pt='1' cursor='pointer'>
          <Box fontSize='1.8em' fontWeight='semibold' lineHeight='tight'>
            {product.name}
          </Box>
        </Link>
      </Flex>
      <Flex justifyContent='space-between' alignContent='center' py='2'>
        <Rating rating={product.rating} numberOfReviews={product.numberOfReviews} />
      </Flex>
      <Flex justify='space-between'>
        <Box fontSize='1.8em' color={useColorModeValue('gray.800', 'white')}>
          {product.price.toFixed(2)}
          <Box as='span' color={useColorModeValue('gray.600', 'gray.200')} fontSize='em'>
            zł
          </Box>
        </Box>
        {!!product.stock && (
          <Tooltip label='Add to cart' bg='white' placement='top' color='gray.800' fontSize='1.2em'>
            <Button variant='ghost' display='flex' disabled={product.stock <= 0} onClick={() => addItem(product._id)}>
              <Icon as={FiShoppingCart} h={7} w={7} alignSelf='center' />
            </Button>
          </Tooltip>
        )}
      </Flex>
    </Stack>
  );
};

export default ProductCard;
