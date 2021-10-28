import React from 'react'
import { UserContext } from '../lib/context';



const EditPost = () => {

  const {userData} = React.useContext(UserContext)
  console.log(userData)

  return (
    <div>
      
    </div>
  )
}

export default EditPost
