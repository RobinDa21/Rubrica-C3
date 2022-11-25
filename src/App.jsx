import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Inicio from './components/Inicio'
import Consultas from './components/Consultas'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Peticion from './components/Peticion'
import { auth } from "./firebase";
import React from 'react';

function App() {
  //hooks
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setFirebaseUser(user)
      } else {
        setFirebaseUser(null)
      }
    })
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <Navbar firebaseUser={firebaseUser} />
      <div className='container'>
        <Routes>
          <Route path='/' element={<Inicio />} />
          <Route path='peticion' element={<Peticion />}/>
          <Route path='consultas' element={<Consultas />} />
          <Route path='login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  ) : (
    <h1>Cargando...</h1>
  )
}

export default App;