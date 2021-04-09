import firebase from '../../../services/firebase'
import {Link} from 'react-router-dom'
import 'firebase/auth'
import { useState } from 'react'
import { rules } from '../../../services/validation'
const Login = () => {
    const [data, setData] = useState({ email: '', password: '' })

    const blurHandler = (e) => {
        validate(e.target.name, e.target.value)
    }

    const validate = (name, value) => {
        switch (name) {
            case 'email':
                setRule({
                    ...validationErrors,
                    email: rules.email(value),
                })
                break
            case 'password':
                setRule({
                    ...validationErrors,
                    password: rules.password(value),
                })
                break

            default:
                break
        }
    }

    const [validationErrors, setRule] = useState({
        firebaseError: '',
        email: '',
        password: '',
    })

    const onLoginChangeHandler = (e) => {
        e.preventDefault()
        let state = { ...data }
        state[e.target.name] = e.target.value
        setData(state)
    }
    const onSubmitLoginFormHandler = (e) => {
        e.preventDefault()

        firebase
            .auth()
            .signInWithEmailAndPassword(data.email, data.password)
            .then((user) => {
                setRule({ ...validationErrors, firebaseError: '' })
            })
            .catch((error) => {
                let errorCode = error.code
                let errorMessage = error.message

                if (
                    errorCode === 'auth/wrong-password' ||
                    errorCode === 'auth/user-not-found'
                ) {
                    return setRule({
                        ...validationErrors,
                        firebaseError: 'Invalid Credentials',
                    })
                }
                setRule({ ...validationErrors, firebaseError: errorMessage })
            })
    }

    return (
        <div className="login">
            <h1>Login</h1>

            <form onSubmit={onSubmitLoginFormHandler}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    onChange={onLoginChangeHandler}
                    value={data.email}
                    id="email"
                    onBlur={blurHandler}
                />
                {validationErrors.email.length ? (
                    <h2 style={{ color: 'red' }}>{validationErrors.email}</h2>
                ) : (
                    ''
                )}
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={onLoginChangeHandler}
                    value={data.password}
                    onBlur={blurHandler}
                />
                {validationErrors.password.length ? (
                    <h2 style={{ color: 'red' }}>
                        {validationErrors.password}
                    </h2>
                ) : (
                    ''
                )}
                <button>LOGIN</button>
                {validationErrors.firebaseError.length ? (
                    <h2 style={{ color: 'red' }}>
                        {validationErrors.firebaseError}
                    </h2>
                ) : (
                    ''
                )}
            </form>
            <div className="redirect">
                <p>Don't have an account?</p>
                <Link to="/register">Register</Link>
            </div>
        </div>
    )
}

export default Login
