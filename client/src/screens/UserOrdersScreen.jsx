import React from 'react';
import {
  Box,
  Image,
  TableContainer,
  Table,
  Stack,
  Spinner,
  Alert,
  AlertIcon,
  AlertDescription,
  Th,
  Tr,
  Td,
  Tbody,
  Thead,
  Button,
  ListItem,
  UnorderedList,
  AlertTitle,
  Wrap,
  HStack,
  OrderedList,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserOrders } from '../redux/actions/userActions';
import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const UserOrdersScreen = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { loading, error, orders, userInfo } = user;
  const location = useLocation();
  const formatDate = (inputDate) => {
    const orderDate = new Date(inputDate);
    const formattedDate = `${orderDate.getDate().toString().padStart(2, '0')}.${(orderDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}.${orderDate.getFullYear()}`;
    return formattedDate;
  };
  const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserOrders());
    }
  }, []);

  return userInfo ? (
    <>
      {loading ? (
        <Wrap justify='center' direction='column' align='center' mt='20px' minH='100vh' >
          <Stack direction='row' spacing={4} >
            <Spinner mt={10} thickness='7px' speed='1s' emptyColor='grey.200' color='orange.600' size='xl' />{' '}
          </Stack>
        </Wrap>
      ) : error ? (
        <Alert status='error'>
          <AlertIcon />
          <AlertTitle> Przepraszamy! </AlertTitle>
          <AlertDescription> {error} </AlertDescription>
        </Alert>
      ) : (
        orders && (
          <TableContainer minHeight='100vh'>
            <Table variant='striped'>
              <Thead>
                <Tr justifyContent='center'>
                  <Th>Zamówione produkty</Th>
                  <Th> Zapłacona kwota</Th>
                  <Th> Data zamówienia </Th>
                  <Th> Numer zamówienia</Th>
                  <Th> </Th>
                </Tr>
              </Thead>
              <Tbody>
                {sortedOrders.map((order) => (
                  <Tr key={order._id}>
                    <Td>
                      {order.orderItems.map((item) => (
                        <UnorderedList listStyleType='none' key={item._id}>
                          <ListItem>
                            <HStack>
                              <Box h='40px' w='40px'>
                                <Image
                                  marginLeft='auto'
                                  marginRight='auto'
                                  maxHeight='40px'
                                  src={item.image}
                                  alt={item.name}
                                  draggable='false'
                                  loading='lazy'
                                />
                              </Box>{' '}
                              <Box>
                                {item.name} {item.qty} x {item.price} zł
                              </Box>
                            </HStack>
                          </ListItem>
                        </UnorderedList>
                      ))}{' '}
                    </Td>
                    <Td>
                      {' '}
                      {order.totalPrice}zł ({order.paymentMethod}){' '}
                    </Td>
                    <Td> {formatDate(new Date(order.createdAt))} </Td>
                    <Td>{order._id}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )
      )}
    </>
  ) : (
    <Navigate to='/login' replace={true} state={{ from: location }} />
  );
};

export default UserOrdersScreen;
