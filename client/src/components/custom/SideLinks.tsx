import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Button } from '../ui/button'
import { FaArrowLeft } from 'react-icons/fa6'
import NavLink from './navigation/NavLink'

type Props = {
    links: { path: string, href: string }[],
    direction: 'left' | 'right',
    title: string,
    setState: React.Dispatch<React.SetStateAction<boolean>>,
    state: boolean
}

const SideLinks: React.FC<Props> = ({ title, links, state, setState }) => {
    return (
        <Box borderLeft={'0.25px solid rgba(0,0,0,.25)'} className={`${state ? 'show-right slide-to-left' : 'hidden-right'}`} bg={'white'} w={300} position={'fixed'} top={0} h={'100vh'} >
            <Box my={2} display={'flex'} alignItems={'center'} gap={2}>
                <Button onClick={() => setState(false)} variant={'plain'} color={'red.500'} size={'md'}> <FaArrowLeft size={"20px"} /> </Button>
                <Text fontSize={22} fontWeight={'bold'}>{title}</Text>
            </Box>

            <Box py={4} gap={4} overflowY={'auto'} px={2} display={'flex'} flexDir={'column'} alignItems={'center'} w={'full'} h={'full'}>
                {
                    links.map(link => (<NavLink title={link.path.toUpperCase()} href={link.href} />))
                }
            </Box>
        </Box>
    )
}
export default SideLinks