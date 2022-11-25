import React from 'react'
import { auth, db } from '../firebase'
import { useNavigate } from "react-router-dom";

const Login = () => {
  //hooks
  const [email, setEmail] = React.useState('admin@cuc.edu.co')
  const [password, setPassword] = React.useState('admin123')
  const [modoRegistro, setModoRegistro] = React.useState(false)
  const [error, setError] = React.useState(null)
  const navigate = useNavigate()

  //funcion guardar datos
  const guardarDatos = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Ingrese el Correo.')
      return
    }
    if (!password.trim()) {
      setError('Ingrese la Contraseña.')
      return
    }
    if (password.length < 6) {
      setError('La contraseña debe tener mínimo 6 caracteres.')
      return
    }
    setError(null)
    //registrar
    if (modoRegistro) {
      registrar()
    } else {
      login()
    }
  }
  //funcion Registrar
  const registrar = React.useCallback(async () => {
    try {
      const res = await auth.createUserWithEmailAndPassword(email, password)
      await db.collection('usuariosdb').doc(res.user.email).set(
        {
          email: res.user.email,
          id: res.user.uid
        }
      )
      //limpiar estados
      setEmail('')
      setPassword('')
      setError(null)
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        setError('Correo ya registrado.')
      }
      if (error.code === 'auth/invalid-email') {
        setError('Correo Incorrecto.')
      }
    }
  }, [email, password, navigate])

  //funcion login
  const login = React.useCallback(async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password)
      //limpiar estados
      setEmail('')
      setPassword('')
      setError(null)
      navigate('/')
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Usuario no registrado')
      }
      if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta')
      }
    }
  }, [email, password, navigate])

  return (
    <div>
      <div className="row justify-content-center my-3">
        <div className="col-12 col-sm-10 col-md-6 col-xl-4">
          <form onSubmit={guardarDatos}>
            {
              error && (
                <div className='alert alert-danger'>
                  {error}
                </div>
              )
            }
            <input type="email"
              placeholder='Correo'
              className='form-control mb-3'
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
            <input type="password"
              placeholder='Contraseña'
              className='form-control mb-3'
              onChange={e => setPassword(e.target.value)}
              value={password}
            />
            <div className='d-grid gap-2'>
              <button className='btn btn-dark'>
                {modoRegistro ? 'Registrarse' : 'Ingresar'}
              </button>
              <button className='btn btn-primary'
                onClick={() => { setModoRegistro(!modoRegistro) }}
                type='button'>
                {modoRegistro ? 'Ya estas registrado?'
                  : 'Ya tienes cuenta?'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login