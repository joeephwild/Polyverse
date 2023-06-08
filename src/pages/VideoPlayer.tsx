import React from 'react'
import { DNavbar, Sidebar, Video } from '../components'

const VideoPlayer = () => {
  return (
    <div>
        <DNavbar />
        <div className='flex items-start gap-5'>
            <Sidebar />
            <Video />
            <div className='w-[20%] border-l border-[#fff] h-screen'>recommendation</div>
        </div>
    </div>
  )
}

export default VideoPlayer