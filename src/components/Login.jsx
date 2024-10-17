import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { auth } from '../firebase/firebase'
import { signInWithEmailAndPassword } from 'firebase/auth'

const Login = () => {

    const [usernameValue, setUsernameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()

    const handleUsernameChange =  (e) => setUsernameValue(e.target.value)
    const handleEmailChange =  (e) => setEmailValue(e.target.value)
    const handlePasswordChange =  (e) => setPasswordValue(e.target.value)

    const validateForm = () => {
        const newErrors = {}

        if(usernameValue.length < 3) {
            newErrors.username = 'UserName must be at least 3 chrarcters or more'
        }
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(emailValue)) {
        newErrors.email = 'Enter a valid email.';
        }
        if(passwordValue.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long!'
        }
        return newErrors
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();


        const formErrors = validateForm()

        if(Object.keys(formErrors).length === 0) {
            try {

                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    emailValue,
                    passwordValue
                )
                const user = userCredential.user
                console.log('Form Submitted Successfully:', user);
    
                navigate('/')
            } catch (error) {
                console.error('Error during signup:', error.message)
                setErrors({ firebase: error.message })
            }
        } else {
            setErrors(formErrors)
        }
        
    }

    

  return (
    <>
        <div>
            <div className='grid place-items-center my-5'>
                <form onSubmit={handleSubmitForm} className='flex flex-col border shadow-md rounded-xl w-10/12 p-10 max-w-md'>
                    <span className='text-center font-bold text-xl'>Login Here: </span>
                    <input type='text' 
                        value={usernameValue}
                        onChange={handleUsernameChange}
                        placeholder='Username' 
                        required
                        className='border p-1 py-2 pl-2 rounded-lg focus:outline-none ring-blue-200 focus:ring my-2 w-full bg-blue-200 placeholder:text-slate-500' 
                    />
                    { errors.username  && <span className="text-red-500 text-sm">{errors.username} </span> }
                    <input type='text' 
                        value={emailValue}
                        onChange={handleEmailChange}
                        placeholder='Email' 
                        required
                        className='border p-1 py-2 pl-2 rounded-lg focus:outline-none ring-blue-200 focus:ring my-2 w-full bg-blue-200 placeholder:text-slate-500' 
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    <input type='password' 
                        value={passwordValue}
                        onChange={handlePasswordChange}
                        placeholder='Password' 
                        required
                        className='border p-1 py-2 pl-2 rounded-lg focus:outline-none ring-blue-200 focus:ring my-2 w-full bg-blue-200 placeholder:text-slate-500' 
                    />
                    {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    <input type='submit' className='w-full text-white bg-blue-800 py-2 cursor-pointer  my-2 rounded-lg hover:bg-blue-600 duration-150' value="Login Now" />

                    <span className='text-center'><NavLink to='/signup' className='underline hover:text-blue-700'>or signup</NavLink> if you are new here</span>
                </form>
            </div>
        </div>
    </>
  )
}

export default Login