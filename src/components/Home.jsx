import { NavLink } from "react-router-dom"
import { auth, db } from "../firebase/firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { collection, getDocs, doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
import '../App.css'

const Home = () => {

    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState('')

    const [posts, setPosts] = useState([])

    const [loading, setLoading] = useState(true)

    // Fetch user information
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

    // Fetch posts from Firestore
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true)
                const querySnapshot = await getDocs(collection(db, 'posts'))
                const allPosts = (querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))

                // Separate current user's posts and other posts
                const userPosts = allPosts.filter(post => post.author === userName)
                const otherPosts = allPosts.filter(post => post.author !== userName)

                // Set posts with user's posts first
                setPosts([...userPosts, ...otherPosts])
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchPosts()
    }, [userName])

    // For managing post content visibility
    const [expandedPostIds, setExpandedPostIds] = useState([])

    const toggleReadMore = (postId) => {
        if (expandedPostIds.includes(postId)) {
            setExpandedPostIds(expandedPostIds.filter(id => id !== postId))
        } else {
            setExpandedPostIds([...expandedPostIds, postId])
        }
    }

    const isExpanded = (postId) => expandedPostIds.includes(postId)

     // Handle logout
     const handleLogout = async () => {
        try {
            await signOut(auth)
            console.log("User signed out")
        } catch (error) {
            console.error("Error signing out: ", error)
        }
    }

    return (
        <>
            <div>
                <div>
                    {user ? (
                        <p className="flex justify-between">
                            <h1 className="ml-2">Welcome, <span className="text-cyan-700 font-bold text-lg">{userName}</span></h1>
                            <button onClick={handleLogout} className="text-red-500 hover:text-amber-400 px-4 py-2 rounded-md duration-300 mr-2">
                                Logout
                            </button>
                        </p>
                    ) : (
                        <p className="ml-2 text-red-500 text-lg font-semibold">Please log in</p>
                    )}
                </div>
                <div>
                    { loading ? (
                        <div className="grid place-content-center h-screen">
                            <div>
                            <div className="main">
                              <div className="up">
                                <div className="loaders">
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                  <div className="loader"></div>
                                </div>
                                <div className="loadersB">
                                  <div className="loaderA">
                                    <div className="ball0"></div>
                                  </div>
                                  <div className="loaderA">
                                    <div className="ball1"></div>
                                  </div>
                                  <div className="loaderA">
                                    <div className="ball2"></div>
                                  </div>
                                  <div className="loaderA">
                                    <div className="ball3"></div>
                                  </div>
                                  <div className="loaderA">
                                    <div className="ball4"></div>
                                  </div>
                                  <div className="loaderA">
                                    <div className="ball5"></div>
                                  </div>
                                  <div className="loaderA">
                                    <div className="ball6"></div>
                                  </div>
                                  <div className="loaderA">
                                    <div className="ball7"></div>
                                  </div>
                                  <div className="loaderA">
                                    <div className="ball8"></div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            </div>
                        </div>
                    ) : (
                        <div className="border grid place-content-center md:grid md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => (
                            <div key={post.id} className="border shadow-current shadow-inner m-2 p-2 rounded-lg max-w-lg">
                                <div className="border p-2 rounded-lg space-y-2 shadow-md shadow-current">
                                    <h2 className="border px-2 rounded-lg font-bold">{post.title} by:<span className="text-cyan-700 text-right"> {post.author}</span></h2>
                                    <p className="border px-2 rounded-lg">
                                        {/* Show full content if expanded, otherwise show truncated content */}
                                        {isExpanded(post.id) ? post.content : `${post.content.slice(0, 100)}...`}
                                    </p>
                                    {/* Toggle button to expand or collapse content */}
                                    <button 
                                        onClick={() => toggleReadMore(post.id)} 
                                        className="text-blue-500 hover:underline"
                                    >
                                        {isExpanded(post.id) ? 'Show Less' : 'Read More'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    ) }

                    <NavLink to="/createpost" className="grid place-content-center fixed right-1 bottom-10 w-8 rounded-full m-3 px-8 py-6 text-white bg-blue-500 hover:bg-blue-800 duration-300 hover:shadow-2xl hover:shadow-current">
                        <i className="fa-solid fa-feather-pointed"></i>
                    </NavLink>
                </div>
            </div>
        </>
    )
}

export default Home
