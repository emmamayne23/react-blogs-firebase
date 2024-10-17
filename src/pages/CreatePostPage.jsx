import CreatePost from "../components/CreatePost"
import Smallcard from "../components/Smallcard"

const CreatePostPage = () => {
  return (
    <>
      <Smallcard topMessage="What do you want to post today??"/>
      <CreatePost />
    </>
  )
}

export default CreatePostPage