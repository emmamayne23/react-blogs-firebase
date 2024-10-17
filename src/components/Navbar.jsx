import reactLogo from "../assets/react.svg";
import { NavLink } from "react-router-dom";
import viteLogo from "/vite.svg";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebase";

const Navbar = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const openSidebar = () => setIsSidebarOpen(true)
    const closeSidebar = () => setIsSidebarOpen(false)

    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState('')

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                if (userDoc.exists()) {
                    setUserName(userDoc.data().name)
                }
            } else {
                setUser(null)
            }
        })

        return () => unsubscribe()
    }, [])

  return (
    <>
      <div>
        <div className="border flex p-2 items-center gap-2 md:flex-row-reverse">
            
            <div>
                <button onClick={openSidebar} className="border rounded-xl p-3 md:hidden">
                    <i className="fa-solid fa-mug-hot fa-2xl text-blue-400"></i>
                </button>

                <div className={`fixed flex flex-col md:h-auto md:border md:flex-row md:justify-evenly md:mx-auto md:border-none md:shadow-none md:items-center md:py-1 md:-translate-x-28 md:w-full md:relative lg:-translate-x-72 lg:gap-8 gap-5 py-5 px-3 border w-6/12 top-0 left-0 z-10 bg-white h-lvh shadow-md duration-300 overflow-hidden ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                     
                    <div className="mb-2 flex items-center justify-between px-2 py-1 pb-4 border-b md:hidden">
                        <NavLink className="border rounded-full px-2 py-1 text-black border-black hover:text-blue-500 hover:border-blue-500 duration-300 hover:px-2.5 hover:py-1.5">
                            <i className="fa-solid fa-user"></i>
                        </NavLink>
                        <div>
                            {user ? (
                                <span className="text-cyan-700 font-bold text-lg">{userName}</span>
                            ) : (
                                <p>Please log in</p>
                            )}
                        </div>
                        <button onClick={closeSidebar} className="hover:text-red-700 md:hidden">
                            <i className="fa-solid fa-door-open"></i>
                        </button>
                    </div>

                    <NavLink to="/" className="bg-blue-500 text-white w-full rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:pl-5 border duration-300 md:bg-white md:text-blue-500 md:p-2 md:hover:pl-2 md:text-center md:h-10 md:flex md:items-center md:justify-center md:border-none md:hover:text-cyan-400">
                        <span>Home</span>
                    </NavLink>
                    <NavLink to="/about" className="bg-blue-500 text-white w-full rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:pl-5 border duration-300 md:bg-white md:text-blue-500 md:p-2 md:hover:pl-2 md:text-center md:h-10 md:flex md:items-center md:justify-center md:border-none md:hover:text-cyan-400">
                        <span>About</span>
                    </NavLink>
                    <NavLink to="/support" className="bg-blue-500 text-white w-full rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:pl-5 border duration-300 md:bg-white md:text-blue-500 md:p-2 md:hover:pl-2 md:text-center md:h-10 md:flex md:items-center md:justify-center md:border-none md:hover:text-cyan-400">
                        <span>Support</span>
                    </NavLink>
                    <NavLink to="/about" className="bg-blue-500 text-white w-full rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:pl-5 border duration-300 md:bg-white md:text-blue-500 md:p-2 md:hover:pl-2 md:text-center md:h-10 md:flex md:items-center md:justify-center md:border-none md:hover:text-cyan-400">
                        <span>Bookmarks</span>
                    </NavLink>
                    <div className="flex-auto">
                    </div>
                    <div className="flex gap-3">
                        <NavLink to="/settings" className="bg-blue-500 text-white w-full rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:pl-5 border duration-300 md:bg-white md:text-blue-500 md:p-2 md:hover:pl-2 md:text-center md:h-10 md:flex md:items-center md:justify-center md:border-none md:hover:text-cyan-400">
                            <span>Settings</span>
                        </NavLink>
                        <NavLink to="/signup" className="bg-blue-500 text-white w-full rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 hover:pl-5 border duration-300 md:bg-white md:text-blue-500 md:hidden">
                            <span>Sign Up</span>
                        </NavLink>
                    </div>
                    <div className="flex gap-2">

                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500 md:hidden">
                            <i className="fa-brands fa-twitter"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500 md:hidden">
                            <i className="fa-brands fa-instagram"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500 md:hidden">
                            <i className="fa-brands fa-github"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500 md:hidden">
                            <i className="fa-solid fa-envelope"></i>
                        </NavLink>
                        <NavLink to="/" className=" text-blue-500 w-full flex items-center justify-center rounded-lg p-2 hover:bg-white hover:text-blue-500 hover:border-blue-500 border duration-300 md:bg-white md:text-blue-500 md:hidden">
                            <i className="fa-solid fa-phone"></i>
                        </NavLink>
                        
                    </div>
                </div>
            </div>

            <NavLink to="/" className="border rounded-xl p-2 mx-auto md:ml-4">
                <span className="flex">
                <img src={reactLogo} className="md:w-12" alt="React logo" />
                <img src={viteLogo} className="md:w-12" alt="React logo" />
                </span>
            </NavLink>

            <NavLink to="/login" title="Sign In" className="text-blue-950 md:text-xl md:absolute md:top-7 md:right-10 lg:right-20 md:hover:text-cyan-400 duration-300">
                <i className="fa-solid fa-right-to-bracket"></i>
            </NavLink>

        </div>
      </div>
    </>
  );
};

export default Navbar;
