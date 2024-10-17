import { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { auth, db } from '../firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Signup = () => {

    const [usernameValue, setUsernameValue] = useState('')
    const [emailValue, setEmailValue] = useState('')
    const [passwordValue, setPasswordValue] = useState('')
    const [confirmPasswordValue, setConfirmPasswordValue] = useState('')

    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleUsernameChange =  (e) => setUsernameValue(e.target.value)
    const handleEmailChange =  (e) => setEmailValue(e.target.value)
    const handlePasswordChange =  (e) => setPasswordValue(e.target.value)
    const handleConfirmPasswordChange =  (e) => setConfirmPasswordValue(e.target.value)

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
        if(passwordValue !== confirmPasswordValue) {
            newErrors.confirmPassword = 'Passwords do not match!'
        }
        return newErrors
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        setLoading(true)

        const formErrors = validateForm()

        if(Object.keys(formErrors).length === 0) {
            try {
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    emailValue,
                    passwordValue
                )
                const user = userCredential.user

                await setDoc(doc(db, 'users', user.uid), {
                    name: usernameValue,
                    email: emailValue,
                })

                console.log('Signed Up Successfully:', user);
    
                navigate('/')
            } catch (error) {
                console.error('Error during signup:', error.message)
                setErrors({ firebase: error.message })
            } finally {
                setLoading(false)
            }
        } else {
            setErrors(formErrors)
            setLoading(false)
        }
        
    }

  return (
    <>
        <div>
            <div className='grid place-items-center my-5'>
                <form onSubmit={handleSubmitForm} className='flex flex-col border shadow-md rounded-xl w-10/12 p-10  max-w-md'>
                    <span className='text-center font-bold text-xl'>Sign Up Here: </span>
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
                    <input type='password' 
                        value={confirmPasswordValue}
                        onChange={handleConfirmPasswordChange}
                        placeholder='Confirm Password' 
                        required
                        className='border p-1 py-2 pl-2 rounded-lg focus:outline-none ring-blue-200 focus:ring my-2 w-full bg-blue-200 placeholder:text-slate-500' 
                    />
                    {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword}</span>}
                    {errors.firebase && <span className="text-red-500 text-sm">{errors.firebase}</span>}

                    <input 
                    type='submit' 
                    className={`w-full text-white bg-blue-800 py-2 cursor-pointer my-2 rounded-lg hover:bg-blue-600 duration-150 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    value={loading ? 'Signing Up' : 'Sign Up Now'}
                    disabled={loading} 
                    />

                    <span className='text-center'>
                        <NavLink to='/login' className='underline hover:text-blue-700'>
                            or login
                        </NavLink> {' '}
                        if you are already a member
                    </span>
                </form>
            </div>
        </div>
    </>
  )
}

export default Signup