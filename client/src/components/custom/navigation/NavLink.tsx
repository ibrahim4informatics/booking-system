import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import '@/styles/index.css'
type Props = {
    href: string,
    title: string,
    children?: React.ReactNode
}
const NavLink: React.FC<Props> = ({ children, href, title }) => {
    const location = useLocation()
    return (
        <Link  color='red' to={href}>
            <Box className='link' display={'flex'} alignItems={'center'} gap={2}>
                <Text color={(location.pathname === href) ? 'black' : 'GrayText'}>{title}</Text>

                {children}
            </Box>
        </Link>
    )
}

export default NavLink