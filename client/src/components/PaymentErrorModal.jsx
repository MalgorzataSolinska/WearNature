import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Alert,
  AlertTitle,
  AlertDescription,
  AlertIcon,
  Wrap
} from '@chakra-ui/react';

const PaymentErrorModal = ({ isOpen, onClose }) => {
  
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
            <Wrap justify='center' direction='column' align='center' mt='20px'>
              <Alert
              h='200px'
                status='error'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                  >
                <AlertIcon boxSize='55px'/>
                <AlertTitle pt='8px'  fontSize='xl'>
                  {' '}
                  Płatność nie powiodła się!
                </AlertTitle>
                <AlertDescription mt='20px'>
                Odśwież stronę i spróbuj ponownie. 
                </AlertDescription>
            
              </Alert>
            </Wrap>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentErrorModal;
