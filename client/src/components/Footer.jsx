import { IconButton, Flex, Stack, Text, HStack, Box, Button, useColorModeValue } from '@chakra-ui/react';
import { FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box as='footer' w='100%' py='5' bg={useColorModeValue('gray.100', 'gray.900')}>
      <HStack ml='4' spacing={{ base: '5', md: '8', lg: '10' }}>
        <Button variant='link'> Dane firmy </Button>
        <Button variant='link'> Regulamin </Button>
        <Button variant='link'> Polityka prywatności </Button>
        <Button variant='link'> Pomoc </Button>
      </HStack>

      <Flex ml='4' justifyContent='space-between' alignItems='center'>
        <Text fontSize='smaller' color='gray' display>
          COPYRIGHT &copy; {new Date().getFullYear()} WEAR NATURE
        </Text>
        <IconButton
          mr='4'
          as='a'
          href='https://github.com/MalgorzataSolinska/WearNature'
          target='_blank'
          aria-label='GitHub'
          icon={<FaGithub fontSize='1.25rem' />}
        />
      </Flex>
    </Box>
  );
};
export default Footer;
