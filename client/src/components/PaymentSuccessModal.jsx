import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Wrap,
  useToast,
  Stack,
} from '@chakra-ui/react';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { logout } from '../redux/actions/userActions';
import { useDispatch } from 'react-redux';
const PaymentSuccessModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const logoutHandler = () => {
    dispatch(logout());
    toast({ description: 'Zostałeś wylogowany. ', status: 'success', isClosable: 'true' });
    navigate('/products');
  };
  return (
    <>
      <Modal size='full' isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap  justify='center' direction='column' align='center' mt='20px'>
              <Alert
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                heignt='auto'
              >
                <AlertIcon  boxSize='55px' />
                <AlertTitle pt='8px' fontSize='xl'>
                  {' '}
                  Płatność zakończona sukcesem!
                </AlertTitle>
                <Stack mt='20px' minW='200px'>
                  <Button colorScheme='teal' colorschema='teal' variant='outline' as={ReactLink} to='/your-orders'>
                    {' '}
                    Twoje zamówienia
                  </Button>
                  <Button colorScheme='teal' variant='outline' as={ReactLink} to='/products'>
                    {' '}
                    Strona główna
                  </Button>
                  <Button colorScheme='teal' variant='outline' onClick={logoutHandler}>
                    {' '}
                    Wyloguj się 
                  </Button>
                </Stack>
              </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentSuccessModal;
