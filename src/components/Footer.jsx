import viteLogo from '/vite.svg'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Footer = () => {

    const [email, setEmail] = useState('')

    const date = new Date().getFullYear()

  return (
    <>
        <div>
            <div className='grid place-items-center py-10 bg-sky-900 text-white md:flex md:flex-row md:justify-between md:p-3'>
                <div className='flex gap-10 my-5 md:flex-col'>
                    <img src={viteLogo} className='md:w-24 md:ml-10' />
                    <div>
                        <p className='md:text-2xl font-bold'>Em Blogs Project</p>
                        <p>A place where every story matters :)</p>
                    </div>
                </div>
                <form className='my-5 text-lg mr-1'>
                    <p className='text-center'>Subscribe to Our Newsletter:</p>
                    <input 
                        type='email'
                        className='border rounded-s focus:outline-none text-black focus:ring w-72 md:w-full p-1.5 py-2 ring-white md:rounded-2xl md:pl-5'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email Address'
                    />
                    <button className=' p-2.5 text-white w-28 md:w-full bg-blue-500 rounded-e-lg md:rounded-2xl md:mt-1 md:px-3'>Subscribe</button>
                </form>

                <div>
                    <div className='my-2 text-lg font-semibold text-center'>
                        Our Socials
                    </div>
                    <div className="flex gap-2 md:grid md:grid-cols-4 md:p-2">

                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500">
                            <i className="fa-brands fa-twitter"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500">
                            <i className="fa-brands fa-instagram"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500">
                            <i className="fa-brands fa-github"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500">
                            <i className="fa-solid fa-envelope"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500">
                            <i className="fa-solid fa-phone"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500">
                            <i className="fa-brands fa-discord"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500">
                            <i className="fa-brands fa-reddit-alien 2xl"></i>
                        </NavLink>
                            
                        </div>
                    </div>
            </div>
            <hr className='' />
            <div className='bg-sky-900 text-white text-center py-2'>
                <p>&copy;<span>{date} </span>EM Blogs. All rights deserved. </p>
            </div>
        </div>
    </>
  )
}

export default Footer