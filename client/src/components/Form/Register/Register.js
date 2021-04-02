import { useState } from 'react'
import firebase from '../../../services/firebase'
import 'firebase/auth'
import { rules } from '../../../services/validation'
const Register = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        rePassword: '',
        firstName: '',
        lastName: '',
    })
    const [validationErrors, setRule] = useState({
        email: '',
        password: '',
        rePassword: '',
        firstName: '',
        lastName: '',
        firebaseMessage: '',
    })

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
            case 'rePassword':
                setRule({
                    ...validationErrors,
                    rePassword: rules.rePassword(value, data.password),
                })
                break
            case 'firstName':
                setRule({
                    ...validationErrors,
                    firstName: rules.firstName(value),
                })
                break
            case 'lastName':
                setRule({
                    ...validationErrors,
                    lastName: rules.lastName(value),
                })
                break
            default:
                break
        }
    }

    const onRegisterChangeHandler = (e) => {
        e.preventDefault()
        let state = { ...data }
        state[e.target.name] = e.target.value

        setData(state)
    }
    const onSubmitRegFormHandler = (e) => {
        e.preventDefault()
        setData({ ...data })

        firebase
            .auth()
            .createUserWithEmailAndPassword(data.email, data.password)
            .then(async (user) => {
                setRule({
                    ...validationErrors,
                    firebaseMessage: '',
                })
                let currentUser = await firebase.auth().currentUser
                if (currentUser) {
                    await currentUser.updateProfile({
                        displayName: `${data.firstName} ${data.lastName}`,
                    })
                }
            })
            .catch((error) => {
                let errorCode = error.code
                let errorMessage = error.message
                if (errorCode === 'auth/weak-password') {
                    setRule({
                        ...validationErrors,
                        firebaseMessage: 'Password is weak :' + errorMessage,
                    })
                } else {
                    setRule({
                        ...validationErrors,
                        firebaseMessage: errorMessage,
                    })
                }
            })
    }

    return (
        <div className="register">
            <h1>Create account</h1>
            <form onSubmit={onSubmitRegFormHandler}>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={onRegisterChangeHandler}
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
                    value={data.password}
                    onChange={onRegisterChangeHandler}
                    id="password"
                    onBlur={blurHandler}
                />
                {validationErrors.password.length ? (
                    <h2 style={{ color: 'red' }}>
                        {validationErrors.password}
                    </h2>
                ) : (
                    ''
                )}
                <label htmlFor="rePassword">Repeat Password</label>
                <input
                    type="password"
                    name="rePassword"
                    id="rePassword"
                    onChange={onRegisterChangeHandler}
                    value={data.rePassword}
                    onBlur={blurHandler}
                />
                {validationErrors.rePassword.length ? (
                    <h2 style={{ color: 'red' }}>
                        {validationErrors.rePassword}
                    </h2>
                ) : (
                    ''
                )}
                <label htmlFor="firstName">First Name</label>
                <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    onChange={onRegisterChangeHandler}
                    value={data.firstName}
                    onBlur={blurHandler}
                />
                {validationErrors.firstName.length ? (
                    <h2 style={{ color: 'red' }}>
                        {validationErrors.firstName}
                    </h2>
                ) : (
                    ''
                )}
                <label htmlFor="lastName">Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={data.lastName}
                    onChange={onRegisterChangeHandler}
                    onBlur={blurHandler}
                />
                {validationErrors.lastName.length ? (
                    <h2 style={{ color: 'red' }}>
                        {validationErrors.lastName}
                    </h2>
                ) : (
                    ''
                )}
                <button>REGISTER</button>
                {validationErrors.firebaseMessage.length ? (
                    <h2 style={{ color: 'red' }}>
                        {validationErrors.firebaseMessage}
                    </h2>
                ) : (
                    ''
                )}
            </form>
        </div>
    )
}

export default Register
