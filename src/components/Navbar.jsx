import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

const Navbar = (props) => {
  const navigate = useNavigate()
  const [user, setUser] = React.useState(null)
  React.useEffect(() => {
    if (auth.currentUser) {
      setUser(auth.currentUser)
    }
  })

  //funcion cerrar sesion
  const cerrarSesion = () => {
    auth.signOut()
      .then(
        navigate('/')
      )
  }
  return (
    <div className='navbar navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/'>
        <img src="https://seeklogo.com/images/D/dragon-logo-34D6842F63-seeklogo.com.png" alt="Logo" width="30" height="30" className="d-inline-block align-text-top" /> Khaleesi
      </Link>
      <div className='d-flex'>
        <Link className='btn btn-dark mr-2' to='/'>Inicio</Link>
        {
          props.firebaseUser !== null ? (<Link className='btn btn-dark mr-2' to='/peticion'>Crear Petición</Link>) : null
        }
        {
          props.firebaseUser !== null ? (<Link className='btn btn-dark mr-2' to='/consultas'>Consultas</Link>) : null
        }
        {
          props.firebaseUser !== null ? (<button className='btn btn-dark mr-2' onClick={() => cerrarSesion()}>Cerrar sesión</button>)
            : (<Link className='btn btn-dark mr-2' to='/login'>Login</Link>)
        }
      </div>
    </div>
  )
}

export default Navbar