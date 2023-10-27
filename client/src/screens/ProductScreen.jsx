import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Image,
  Text,
  Wrap,
  Icon,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  AlertTitle,
  Flex,
  Badge,
  Heading,
  HStack,
  Button,
  SimpleGrid,
  useToast,
  Tooltip,
  Input,
  Textarea,
} from '@chakra-ui/react';

import { MinusIcon, StarIcon, SmallAddIcon } from '@chakra-ui/icons';
import { BiPackage, BiSupport, BiSend } from 'react-icons/bi';
import { FiTruck } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../redux/actions/productActions';
import { addCartItem } from '../redux/actions/cartActions';
import { useEffect, useState } from 'react';
import { createProductReview, resetProductError } from '../redux/actions/productActions';
const ProductScreen = () => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [title, setTitle] = useState('');
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  let { id } = useParams();
  const toast = useToast();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const { loading, error, product, reviewSend } = products;
  const cartContent = useSelector((state) => state.cart);
  const { cart } = cartContent;

  const user = useSelector((state) => state.user);
  const { userInfo } = user;

  useEffect(() => {
    dispatch(getProduct(id));
    if (reviewSend) {
      toast({ description: 'Opinia została zapisana.', status: 'success', isCloasable: true });
      dispatch(resetProductError());
      setReviewBoxOpen(false);
    }
  }, [dispatch, id, cart, reviewSend]);

  const changeAmount = (input) => {
    if (input === 'plus') {
      setAmount(amount + 1);
    }
    if (input === 'minus') {
      setAmount(amount - 1);
    }
  };

  const hasUserReviewed = () => product.reviews.some((item) => item.user === userInfo._id);

  const onSubmit = () => {
    dispatch(createProductReview(product._id, userInfo._id, comment, rating, title));
  };

  const addItem = () => {
    dispatch(addCartItem(product._id, amount));
    toast({ description: 'Przedmiot dodany do koszyka', status: 'success', isClosable: true });
  };

  return (
    <Wrap spacing='30px' justify='center' minHeight='100vh'>
      {loading ? (
        <Stack direction='row' spacing={4}>
          <Spinner mt={20} thickness='7px' speed='1s' emptyColor='grey.200' color='orange.600' size='xl' />{' '}
        </Stack>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle>Przepraszamy!</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : (
        product && (
          <Box
            maxW={{ base: '3xl', lg: '5xl' }}
            mx='auto'
            px={{ base: '4', md: '8', lg: '12' }}
            py={{ base: '6', md: '8', lg: '12' }}
          >
            <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
              <Stack
                pr={{ base: '0', md: '12' }}
                spacing={{ base: '8', md: '4' }}
                flex='1.5'
                mb={{ base: '12', md: 'none' }}
              >
                {product.isNew && (
                  <Badge rounded='full' w='70px' fontSize='0.8em' colorScheme='teal'>
                    Nowość
                  </Badge>
                )}
                {product.stock <= 0 && (
                  <Badge rounded='full' w='100px' fontSize='0.8em' colorScheme='red'>
                    Wyprzedane
                  </Badge>
                )}
                <Heading fontSize='2xl' fontWeight='extrabold'>
                  {product.name}
                </Heading>
                <Stack spacing='5'>
                  <Box>
                    <Text fontSize='3xl' fontWeight='bold' marginBottom='20px'>
                      {' '}
                      {product.price} zł{' '}
                    </Text>
                    <Flex>
                      <HStack spacing='2px'>
                        <StarIcon color='yellow.400' />
                        <StarIcon color={product.rating >= 2 ? 'yellow.400' : 'gray.200'} />
                        <StarIcon color={product.rating >= 3 ? 'yellow.400' : 'gray.200'} />
                        <StarIcon color={product.rating >= 4 ? 'yellow.400' : 'gray.200'} />
                        <StarIcon color={product.rating >= 5 ? 'yellow.400' : 'gray.200'} />
                      </HStack>
                      <Text fontSize='md' fontWeight='bold' ml='4px'>
                        {product.numberOfReviews}
                        {'  '}
                        {product.numberOfReviews === 0 || product.numberOfReviews >= 5
                          ? 'Opinii'
                          : product.numberOfReviews === 1
                          ? 'Opinia'
                          : 'Opinie'}
                      </Text>
                    </Flex>
                  </Box>
                  <Text>{product.description}</Text>

                  <Flex>
                    <Text fontSize='md' fontWeight='bold' mr='5px'>
                      Marka:
                    </Text>
                    {product.brand}
                  </Flex>
                  <Flex alignItems='center'>
                    <Text fontSize='md' fontWeight='bold' mr='5px'>
                      Rozmiar:
                    </Text>
                    {product.size}
                  </Flex>
                  <Flex alignItems='center'>
                    <Text fontSize='md' fontWeight='bold' mr='5px'>
                      Materiał:
                    </Text>
                    {product.material}
                  </Flex>
                  <Flex alignItems='center'>
                    <Text fontWeight='bold' mr='5px'>
                      {' '}
                      Liczba sztuk:{' '}
                    </Text>
                    <Flex w='170px' p='5px' border='1px' borderColor='gray.200' alignItems='center'>
                      <Button isDisabled={amount <= 1} onClick={() => changeAmount('minus')}>
                        <MinusIcon />
                      </Button>
                      <Text mx='30px'> {amount}</Text>
                      <Button isDisabled={amount >= product.stock} onClick={() => changeAmount('plus')}>
                        <SmallAddIcon w='20px' h='25px' />
                      </Button>
                    </Flex>
                  </Flex>

                  <Button
                    isDisabled={product.stock <= 0}
                    colorScheme={product.stock <= 0 ? 'gray' : 'teal'}
                    onClick={() => addItem()}
                  >
                    <Text> {product.stock <= 0 ? 'Wyprzedane' : 'Dodaj do koszyka'}</Text>
                  </Button>

                  <Stack w='350px'>
                    <Flex alignItems='center'>
                      <BiPackage size='20px' />
                      <Text fontWeight='md' fontSize='sm' ml='2'>
                        Darmowa dostawa przy zakupach od 100 zł
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
                  </Stack>
                </Stack>
              </Stack>
              <Flex direction='column' align='center' flex='1' _dark={{ bg: 'gray.900' }}>
                <Image mb='30px' src={product.image} alt={ProductScreen.name} />
              </Flex>
            </Stack>
            {userInfo && (
              <>
                <Tooltip
                  label={hasUserReviewed() ? 'Już podzieliłeś się z nami swoją opinią o tym produkcie.' : ''}
                  fontSize='md'
                >
                  <Button
                    isDisabled={hasUserReviewed()}
                    my='20px'
                    w='140px'
                    colorScheme='teal'
                    onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
                  >
                    Dodaj opinię
                  </Button>
                </Tooltip>
                {reviewBoxOpen && (
                  <Stack mb='20px'>
                    <Wrap>
                      <HStack spacing='2px'>
                        <Button variant='outline' onClick={() => setRating(1)}>
                          <StarIcon color={rating >= 1 ? 'yellow.400': 'gray.200' }/>
                        </Button>
                        <Button variant='outline' onClick={() => setRating(2)}>
                          <StarIcon color={rating >= 2 ? 'yellow.400' : 'gray.200'} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(3)}>
                          <StarIcon color={rating >= 3 ? 'yellow.400' : 'gray.200'} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(4)}>
                          <StarIcon color={rating >= 4 ? 'yellow.400' : 'gray.200'} />
                        </Button>
                        <Button variant='outline' onClick={() => setRating(5)}>
                          <StarIcon color={rating >= 5 ? 'yellow.400' : 'gray.200'} />
                        </Button>
                      </HStack>
                    </Wrap>
                    <Input
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                      placeholder='Tytuł opinii'
                    />
                    <Textarea
                      onChange={(e) => {
                        setComment(e.target.value);
                      }}
                      placeholder={`${product.name} jest ... `}
                    />
                    <Button w='140px' colorScheme='teal' onClick={() => onSubmit()}>
                      {' '}
                      Wyślij opinię{' '}
                    </Button>
                  </Stack>
                )}
              </>
            )}

            {product.numberOfReviews > 0 && (
              <Stack>
                <Text fontSize='xl' fontWeight='bold'>
                  Opinie
                </Text>
                <SimpleGrid minChildWidth='300px' spacingX='40px' spacingY='20px'>
                  {product.reviews.map((review) => (
                    <Box key={review.id}>
                      <Flex spacing='2px' alignItems='center'>
                        <StarIcon color='yellow.400' />
                        <StarIcon color={review.rating >= 2 ? 'yellow.400' : 'gray.200'} />
                        <StarIcon color={review.rating >= 3 ? 'yellow.400' : 'gray.200'} />
                        <StarIcon color={review.rating >= 4 ? 'yellow.400' : 'gray.200'} />
                        <StarIcon color={review.rating >= 5 ? 'yellow.400' : 'gray.200'} />
                        <Text fontWeight='semibold' ml='4px'>
                          {review.title && review.title}
                        </Text>
                      </Flex>
                      <Box py='12px'>{review.comment}</Box>
                      <Text fontSize='sm' color='gray.400'>
                        by {review.name}, {new Date(review.createdAt).toDateString()}
                      </Text>
                    </Box>
                  ))}
                </SimpleGrid>
              </Stack>
            )}
          </Box>
        )
      )}
    </Wrap>
  );
};

export default ProductScreen;
