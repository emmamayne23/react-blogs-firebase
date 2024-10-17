import viteLogo from '/vite.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {

    const [email, setEmail] = useState('')

    const date = new Date().getFullYear()

  return (
    <>
        <div>
            <div className='grid place-items-center py-10 bg-sky-900 text-white md:flex md:flex-row'>
                <div className='flex gap-10 my-5 md:flex-col'>
                    <img src={viteLogo} className='md:w-24 md:ml-10' />
                    <p>A place where every story matters :)</p>
                </div>
                <div className='flex gap-36 md:gap-5 mx-10'>
                    <div className='flex flex-col'>
                        <span className='font-semibold text-xl text-lime-500'>Links</span>
                        <NavLink>Home</NavLink>
                        <NavLink>About</NavLink>
                        <NavLink>Contact</NavLink>
                        <NavLink>FAQ</NavLink>
                    </div>
                    <div className='flex flex-col mt-7'>
                        <NavLink>Terms of Service</NavLink>
                        <NavLink>Privacy Policy</NavLink>
                        <div className='flex items-center gap-2 mt-7'>
                            <NavLink><i className="fa-brands fa-discord"></i></NavLink>
                            <NavLink><i className="fa-brands fa-reddit-alien text-xl"></i></NavLink>
                        </div>
                    </div>
                </div>
                <form className='my-5 text-lg mr-1'>
                    <p>Subscribe to Our Newsletter:</p>
                    <input 
                        type='email'
                        className='border rounded-s focus:outline-none text-black focus:ring w-72 md:w-full md:rounded-none p-1.5 py-2 ring-white'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address'
                    />
                    <button className=' p-3 text-white w-28 md:w-full md:rounded-none bg-blue-500 rounded-e-lg'>Subscribe</button>
                </form>
                <hr className='my-2' />
            </div>
            <div className='bg-sky-900 text-white text-center'>
                    <p>&copy;<span>{date} </span>EM Blogs. All rights deserved. </p>
                </div>
        </div>
    </>
  )
}

export default Footer