import Navbar from '@/components/custom/Navbar'
import React from 'react'


type Props = {
    children:React.ReactNode
}

const AnonymosLayout:React.FC<Props> = ({children}) => {
  return (
    <>
    <Navbar variant='anonymose'  />

        <main>
            {children}
        </main>
    
    </>
  )
}

export default AnonymosLayout