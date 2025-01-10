import { Box, Button, Heading, Text } from '@chakra-ui/react'
import React, { useState } from 'react'
import { TiArrowRight } from 'react-icons/ti';
import { CiMenuBurger } from 'react-icons/ci'
import NavLink from '@/components/custom/navigation/NavLink'
import SideLinks from './SideLinks';

type Props = {
    variant: 'anonymose' | 'authenticated' | 'admin'
}

const Navbar: React.FC<Props> = ({ variant }) => {
    const [isSideShown, setIsSideShown] = useState<boolean>(false)
    return (
        <Box px={4} w={'100%'} h={'60px'} display={'flex'} alignItems={'center'}>
            <Heading color={'blue.600'}>Travelingo</Heading>
            <Box ml={'auto'} display={{ base: 'none', lg: 'flex' }} alignItems={'center'} gap={2}>
                {/* <NavLink to={'/'}><Text className='test' color={'GrayText'} _hover={ { color:"#000" } } transition={'all'}>Home</Text></NavLink> */}
                <NavLink href='/' title='Home' />
                <NavLink href='/nice' title='Destinations' />
            </Box>
            <Button display={{ base: 'none', lg: 'inherit' }} fontWeight={'bold'} borderRadius={'full'} ml={'auto'} colorPalette={'blue'} size={'lg'}>Book Now<TiArrowRight /></Button>
            <Button onClick={() => setIsSideShown(true)} ml={'auto'} size={'lg'} variant={'plain'} colorPalette={'black'} display={{ base: 'inherit', lg: 'none' }}>
                <CiMenuBurger />
            </Button>

            <SideLinks title='Menu' setState={setIsSideShown} state={isSideShown} links={[{ path: 'home', href: '/' }, { path: "destinations", href: '.destination' }]} direction='right' />
        </Box>
    )
}

export default Navbar