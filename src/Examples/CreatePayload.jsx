import React, { useReducer } from 'react'
import { NavLink } from 'react-router-dom'
import './Login.css'
import { auth } from '../../Config/firebase/firebaseConfig'

const types = {
  login: 'login',
  logout: 'logout'
}

const initialState = {
  user: "",
  pw: "",
  login: false
}

const createObjectPayload = (payload) => {
  const objPayload = {};
  const payloadKeys = Object.keys(payload)
  payloadKeys.forEach((field)=>{
    objPayload[field]=payload[field]
  })

  return objPayload
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case types.login:
      return {
        ...state,
        ...createObjectPayload(action.payload)
        }
    default:
      return state
  }
}

const Login = () => {

  const [loginState, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async (e) => {

    e.preventDefault()

    try {

      const respuesta =  await auth.createUserWithEmailAndPassword(loginState.user, loginState.pw)

      console.log(respuesta);
      alert('Registrado exitosamente')
      
    } catch (error) {
          
      switch (error.code) {
        case'auth/weak-password':
          return alert('la contraseña debe tener al menos 6 caractéres')
        case'auth/email-already-in-use':
          return alert('el usuario ya existe')
        default:
          console.log(error.message);
          return  alert('Usuario o Contraseña no validos')
      }
  
    }

  }

    return (

      <section className="login-section">
        <form className="login-form" onSubmit={handleSubmit}>
          <div>
            <label>Usuario</label>
            <input
            id="login-user"
            name="usuario"
            className="login-user"
            type="email"
            required
            onChange={(e) =>
              dispatch({
                type: types.login,
                payload: {
                  user: e.currentTarget.value,
                }
              })
            }
            >
            </input>
          </div>
          <div>
            <label>Contraseña</label>
            <input 
            id="login-pw"
            name="contraseña"
            className="login-pw"
            type="password"
            required
            onChange={(e) =>
              dispatch({
                type: types.login,
                payload: {
                  pw: e.currentTarget.value,
                }
              })
            }
            />
          </div>
          <div>
            <button className="login-btn" type="submit">Ingresar</button>
          </div>
            <NavLink exact to='/register' className="login-msg">Registrarse</NavLink>
        </form>
      </section>
    )
}

export default Login