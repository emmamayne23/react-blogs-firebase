import { useState, useEffect } from "react"
import { db, auth } from "../firebase/firebase"
import { collection, addDoc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { getDoc, doc } from "firebase/firestore"

const CreatePost = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null)
    const [userName, setUserName] = useState('')
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                const userDoc = await getDoc(doc(db, 'users', currentUser.uid))
                if(userDoc.exists()) {
                    setUserName(userDoc.data().name)
                }
            }
        })

        return () => unsubscribe()
    }, [])

    async function addPost() {
        try {
            const docRef = await addDoc(collection(db, 'posts'), {
                title: title,
                content: content,
                author: userName,
                timestamp: new Date(),
            })
            console.log('Post added with ID: ', docRef.id)
            setTitle('')
            setContent('')
        } catch (error) {
            console.error("Error adding this post: ", error)
        }
    }

    const handlePostSubmit = (e) => {
        e.preventDefault();
        addPost()
    }    

  return (
    <>
        <div>
            <div className="p-5 max-w-5xl">
                <h1 className="font-bold text-lg">Create a New Post:</h1>
                <form onSubmit={handlePostSubmit}>
                    <div className="border flex gap-5 p-2 rounded-lg mt-5">
                        <input 
                        className='border p-1 py-2 pl-2 rounded-lg focus:outline-none ring-blue-200 focus:ring my-2 w-full bg-blue-200 placeholder:text-slate-500'
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Post Title"
                        required
                        />

                        <button type="submit" className="border py-3 rounded-lg w-5/12 text-white bg-blue-500">Submit Post</button>
                    </div>

                    <textarea 
                    className="border p-1 py-2 pl-2 rounded-lg focus:outline-none ring-blue-200 focus:ring my-5 w-full h-40"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Post Content"
                    required
                    />

                </form>
            </div>
        </div>
    </>
  )
}

export default CreatePost