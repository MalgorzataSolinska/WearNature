import {Box, Flex, HStack, Link, IconButton, Icon, Text, useDisclosure, Button, Stack, useColorModeValue, useColorMode} from '@chakra-ui/react';
import  {Link as ReactLink} from 'react-router-dom';
import {HamburgerIcon, CloseIcon, MoonIcon, SunIcon} from '@chakra-ui/icons';
import {FaCottonBureau} from 'react-icons/fa';
import React from 'react';

const links = [
    {linkName: 'Products', path: '/products'},
    {linkName: 'Shopping Cart', path: '/cart'} 
];

const NavLink = ({path, children}) => (
    <Link as={ReactLink} to={path} px={2} py={2} rounded='md' _hover={{textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700') }}>
        {children}
    </Link>
);

const Navbar = () => {
    const { isOpen, onClose, onOpen} = useDisclosure()
    const {colorMode, toggleColorMode} = useColorMode()
  return (
    <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems='center' justifyContent='space-between'>
            <IconButton size='md' icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} display={{md: 'none'}} onClick = { isOpen ? onClose : onOpen } /> 

            <HStack>
                <Link as={ReactLink} to='/'>
                    <Flex alignItems='center'>
                        <Icon as={FaCottonBureau} h={7} w={7} color="orange.600"/>
                        <Text>Wear Nature</Text>
                    </Flex>
                </Link>
            <HStack>
                {links.map((link) => (
                    <NavLink key={link.linkName} path={link.path}>
                        {link.linkName}
                    </NavLink>
                ))}
            </HStack>

            </HStack>
            <Flex alignItems='center'><NavLink><Icon as={colorMode === 'light' ? MoonIcon : SunIcon} alignSelf='center' onClick={()=> toggleColorMode()}/></NavLink></Flex>
        </Flex>

    </Box>    
  )
}

export default Navbar
