import firebase from "../../../services/firebase";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import "./Login.scss"
import { Link } from "react-router-dom";
import "firebase/auth";
import { useState } from "react";
import { rules } from "../../../services/validation";
const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });

	const blurHandler = (e) => {
		validate(e.target.name, e.target.value);
	};

	const validate = (name, value) => {
		switch (name) {
			case "email":
				setRule({
					...validationErrors,
					email: rules.email(value),
				});
				break;
			case "password":
				setRule({
					...validationErrors,
					password: rules.password(value),
				});
				break;

			default:
				break;
		}
	};

	const [validationErrors, setRule] = useState({
		firebaseError: "",
		email: "",
		password: "",
	});

	const onLoginChangeHandler = (e) => {
		e.preventDefault();
		let state = { ...data };
		state[e.target.name] = e.target.value;
		setData(state);
	};
	const onSubmitLoginFormHandler = (e) => {
		e.preventDefault();

		firebase
			.auth()
			.signInWithEmailAndPassword(data.email, data.password)
			.then((user) => {
				setRule({ ...validationErrors, firebaseError: "" });
			})
			.catch((error) => {
				let errorCode = error.code;
				let errorMessage = error.message;

				if (
					errorCode === "auth/wrong-password" ||
					errorCode === "auth/user-not-found"
				) {
					return setRule({
						...validationErrors,
						firebaseError: "Invalid Credentials",
					});
				}
				setRule({ ...validationErrors, firebaseError: errorMessage });
			});
	};

	return (
		<div className='login'>

  <section className="h-100 w-100">
    <div className="container h-100 w-100">
        <div className="row justify-content-md-center h-100">
            <div className="card-wrapper">
                <div className="brand">
                    <Logo />
                </div>
                <div className="card fat">
                    <div className="card-body">
                        <h4 className="card-title">Login</h4>
				<form  className="my-login-validation" onSubmit={onSubmitLoginFormHandler} >
							<div className="form-group">
                                <label htmlFor='email'>E-Mail Address</label>
										<input
											id="email"
											type="email"
											className="form-control"
											name="email"
											value={data.email}
											required
											onBlur={blurHandler}
											onChange={onLoginChangeHandler} />
                                
                            </div>
				{validationErrors.email.length ? (<h2 style={{ color: "red" }}>{validationErrors.email}</h2>) : ("")}
                            <div className="form-group">
                                <label htmlFor='password'>Password</label>
										<input
											id="password"
											type="password"
											className="form-control"
											name="password"
											onChange={onLoginChangeHandler}
											value={data.password}
											onBlur={blurHandler}
											required
											data-eye />
  
                            </div>
				{validationErrors.password.length ? (<h2 style={{ color: "red" }}>{validationErrors.password}</h2>) : ("")}
                            <div className="form-group m-0">
                                <button   className="btn   btn-block">
                                    LOGIN
                                </button>
									</div>
				{validationErrors.firebaseError.length ? (<h2 style={{ color: "red" }}>{validationErrors.firebaseError}</h2>) : ("")}
                            <div className="mt-4 text-center">
                                Don't have an account? <Link to='/register'>Register</Link>
                            </div>
                </form>
                    </div>
                </div>

            </div>
        </div>
    </div>
</section>
</div>



	);
};

export default Login;
