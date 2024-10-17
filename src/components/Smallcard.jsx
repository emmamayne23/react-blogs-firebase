/* eslint-disable react/prop-types */


const Smallcard = ({
    topMessage = 'This Is the HomePage, Welcome :)'
}) => {
  return (
    <>
        <div className="w-full border text-center py-2 text-white bg-blue-500">
            <span>{topMessage}</span>
        </div>
    </>
  )
}

export default Smallcard