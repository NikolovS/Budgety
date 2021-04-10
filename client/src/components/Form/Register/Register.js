import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from "../../assets/logo.svg";
import firebase from '../../../services/firebase'
import 'firebase/auth'
import { rules } from '../../../services/validation'
import './Register.scss'
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
  <section className="h-100 w-100">
    <div className="container h-100 w-100">
        <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
                <div className="brand">
                    <Logo />
                </div>
                <div className="card fat">
                    <div className="card-body">
                        <h4 className="card-title">Create account</h4>
				<form  className="my-register-validation" onSubmit={onSubmitRegFormHandler} >
									 
                    <div className="form-group">
                                <label htmlFor="firstName">First Name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            className="form-control"
                                            name="firstName"
                                            required
                                            autofocus
                                            value={data.firstName}
                                            onChange={onRegisterChangeHandler}
                                            onBlur={blurHandler}
                                        />
                               
                                    </div>
                 {validationErrors.firstName.length ? (<h2 style={{ color: 'red' }}>{validationErrors.firstName}</h2>) : ('')}

                    <div className="form-group">
                                <label htmlFor="lastName">Last Name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            className="form-control"
                                            name="lastName"
                                            required
                                            autofocus
                                        value={data.lastName}
                                        onChange={onRegisterChangeHandler}
                                        onBlur={blurHandler}/>
                                <div className="invalid-feedback">
                                    What's your name?
                                </div>
                                    </div>
                 {validationErrors.lastName.length ? (<h2 style={{ color: 'red' }}> {validationErrors.lastName}</h2> ) : ('')}

                    <div className="form-group">
                                <label htmlFor="email">E-Mail Address</label>
                                <input
                                            id="email"
                                            type="email"
                                            className="form-control"
                                            name="email" value={data.email}
                                            onChange={onRegisterChangeHandler}
                                            onBlur={blurHandler}
                                            required />
                              
                                    </div>
                {validationErrors.email.length ? (<h2 style={{ color: 'red' }}>{validationErrors.email}</h2>) : ( '' )}

                     <div className="form-group">
                                <label htmlFor="password">Password</label>
                                        <input
                                            id="password"
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            value={data.password}
                                            onChange={onRegisterChangeHandler}
                                            onBlur={blurHandler}
                                            required
                                    data-eye />
                                
                            </div>
                 {validationErrors.password.length ? ( <h2 style={{ color: 'red' }}>{validationErrors.password}</h2>) : ('')}
                     <div className="form-group">
                                <label htmlFor="rePassword">Confirm Password</label>
                                        <input
                                            id="rePassword"
                                            type="password"
                                            className="form-control"
                                            name="rePassword"
                                            value={data.rePassword}
                                            onChange={onRegisterChangeHandler}
                                            onBlur={blurHandler}
                                            required
                                            data-eye />
                                
                            </div>
                 {validationErrors.rePassword.length ? ( <h2 style={{ color: 'red' }}>{validationErrors.rePassword}</h2>) : ('')}
                    <div className="form-group m-0">
                                <button className="btn   btn-block">
                                            REGISTER
                                </button>
            {validationErrors.firebaseMessage.length ? (<h2 style={{ color: 'red' }}>{validationErrors.firebaseMessage}</h2>) : ('')}
                            </div>
                            <div className="mt-4 text-center">
                                Already have an account? <Link to="/login">Login</Link>
                            </div>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>

</div>

    )
}

export default Register
