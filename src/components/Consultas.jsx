import React from 'react'
import { auth } from '../firebase'
import { useNavigate } from "react-router-dom";
import Peticiones from './Peticiones';

const Consultas = () => {
  //hooks
  const [user, setUser] = React.useState(null)
  const navigate = useNavigate()
  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser)
    } else {
      navigate('/login')
    }
  }, [navigate])
  return (
    <div>
      {
        user && (
          <Peticiones user={user}/>
        )
      }
    </div>
  )
}

export default Consultas