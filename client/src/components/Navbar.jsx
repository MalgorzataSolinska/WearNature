import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Icon,
  Text,
  useDisclosure,
  Button,
  Stack,
  useColorModeValue,
  useColorMode,
} from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from '@chakra-ui/icons';
import { FaCottonBureau } from 'react-icons/fa';
import React from 'react';

const links = [
  { linkName: 'Produkty', path: '/products' },
  { linkName: 'Koszyk', path: '/cart' },
];

const NavLink = ({ path, children }) => (
  <Link
    as={ReactLink}
    to={path}
    px={2}
    py={2}
    rounded='md'
    _hover={{ textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}
  >
    {children}
  </Link>
);

const Navbar = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack>
      <Box bg='red.400'>
        <Flex h={5} alignItems='center' justifyContent='center'>
          <Text fontSize='sm'>Darmowa dostawa do zamówień powyżej 100 zł</Text>
        </Flex>
      </Box>

      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={3}>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
          <IconButton
            size='md'
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={5}>
            <Link as={ReactLink} to='/'>
              <Flex alignItems='center'>
                <Icon as={FaCottonBureau} h={7} w={7} color={useColorModeValue('gray.700', 'gray.300')} />
                <Text fontWeight='medium' fontSize={20} color={useColorModeValue('gray.700', 'gray.300')}>
                  Wear Nature
                </Text>
              </Flex>
            </Link>
            <HStack as='nav' spacing={3} display={{ base: 'none', md: 'flex' }}>
              {links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>
                  {link.linkName}
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems='center'>
            <NavLink>
              <Icon
                as={colorMode === 'light' ? MoonIcon : SunIcon}
                alignSelf='center'
                onClick={() => toggleColorMode()}
              />
            </NavLink>
            <Button as={ReactLink} to='/login' p={2} fontSize='sm' fontWeight={400} variant='link'>
              Zarejestruj się
            </Button>
            <Button
              as={ReactLink}
              to='/registration'
              m={2}
              display={{ base: 'none', md: 'inline-flex' }}
              _hover={{ bg: 'gray.300' }}
              bg='teal.500'
              color='white'
            >
              Zaloguj się
            </Button>
          </Flex>
        </Flex>
        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as='nav' spacing={4}>
              {links.map((link) => (
                <NavLink key={link.linkName} path={link.path}>
                  {link.linkName}
                </NavLink>
              ))}
              <NavLink key='sign up' path='/registration'>
                Zaloguj się
              </NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>
    </Stack>
  );
};

export default Navbar;
