import Profile from '@/components/Profile'
import Sidebar from '@/components/sidebar'
import React from 'react'

const page = () => {
  return (
    <div>
      <Sidebar>
        <Profile></Profile>
      </Sidebar>
    </div>
  )
}

export default page
