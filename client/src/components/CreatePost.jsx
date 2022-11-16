import React from 'react'
import { Link } from "react-router-dom";


const CreatePost = () => {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-top mt-10'>
            <p className=' text-2xl font-semibold my-3'>Create Post</p>
        <div className='flex  flex-col  justify-between'>
            <Link to={"/dashboard/create-dog"}>
                <button className='w-32 bg-stone-300 px-4 py-2 my-3 rounded'>Dog</button>
            </Link>

            <Link to={"/createcat"}>

                <button className='w-32 bg-stone-300 px-4 py-2 rounded' rounded>Cat</button>
            </Link>
        </div>
    </div>
  )
}

export default CreatePost