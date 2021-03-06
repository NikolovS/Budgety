import { useState, useCallback } from "react";
import {Link, Redirect} from 'react-router-dom'
import firebase from "../../../services/firebase";
import { rules } from "../../../services/validation";
import "firebase/firestore";
import "./EditPass.scss"

const EditPass = () => {
	const [redirectTo, setRedirectTo] = useState('');
	const [data, setData] = useState({
		currentPassword: "",
		password: "",
		rePassword: "",
	});
	const [validationErrors, setRule] = useState({
		currentPassword: "",
		password: "",
		rePassword: "",
		firebaseError: "",
	});

	const blurHandler = (e) => {
		e.preventDefault();
		validate(e.target.name, e.target.value);
	};

	const validate = (name, value) => {
		switch (name) {
			case "password":
				setRule({
					...validationErrors,
					password: rules.password(value),
				});
				break;
			case "rePassword":
				setRule({
					...validationErrors,
					rePassword: rules.rePassword(value,data.password),
				});
				break;

			default:
				break;
		}
	};

	const onChangeHandler = (e) => {
		let state = { ...data };

		state[e.target.name] = e.target.value;

		setData(state);
	};
	const onSubmitFormHandler = useCallback((e) => {
		e.preventDefault();

		const user = firebase.auth().currentUser;
		let cred = firebase.auth.EmailAuthProvider.credential(
			user.email,
			data.currentPassword
		);
		user.reauthenticateWithCredential(cred)
		.then(() => firebase.auth().currentUser.updatePassword(data.password))
		.then(() => setRedirectTo('/profile'))
		.catch((error) => {
			setRule((errors) => {
				return {
					...errors,
					firebaseError: error.message
				}
			});
			console.log(error);
		})
	}, [data]);

	return (
<div className="edit-pass">
		{ redirectTo !== '' && <Redirect to={redirectTo}></Redirect> }
<section className="h-100 w-100">
  <div className="container h-100 w-100">
	  <div className="row justify-content-md-left h-100">
		  <div className="card-wrapper ">
			  
			  <div className="card fat row justify-content-md-center ">
				  <div className="card-body ">
					  <h4 className="card-title">Change Password</h4>
			  <form  className="my-editpass-validation" onSubmit={onSubmitFormHandler} >
								   
				  <div className="form-group">
				  <label htmlFor='currentPassword'>Current Password</label>
			<input
				type='password'
				id='currentPassword'
				name='currentPassword'
				value={data.currentPassword}
				onBlur={blurHandler}
				onChange={onChangeHandler}
			/>
								  </div>
		{validationErrors.currentPassword.length ? (<h2 style={{ color: 'red' }}>{validationErrors.currentPassword}</h2>) : ( '')}

				  <div className="form-group">
				  <label htmlFor='password'>New Password</label>
			<input
				type='password'
				id='password'
				name='password'
				value={data.password}
				onBlur={blurHandler}
				onChange={onChangeHandler}
			/>
								  </div>
			   {validationErrors.password.length ? (<h2 style={{ color: 'red' }}> {validationErrors.password}</h2> ) : ('')}

				  <div className="form-group">
				  <label htmlFor='rePassword'>Confirm New Password</label>
			<input
				type='password'
				id='rePassword'
				name='rePassword'
				value={data.rePassword}
				onBlur={blurHandler}
				onChange={onChangeHandler}
			/>
								  </div>
			  {validationErrors.rePassword.length ? (<h2 style={{ color: 'red' }}>{validationErrors.rePassword}</h2>) : ( '' )}

				   
				  <div className="form-group m-0">
							  <button className="btn   btn-block">
											<i className="far fa-save"></i>	SAVE
							  </button>
							<Link to={'/profile'} className="btn back btn-block"   > <i className="fas fa-backspace"></i>Back</Link>
		  {validationErrors.firebaseError.length ? (<h2 style={{ color: 'red' }}>{validationErrors.firebaseError}</h2>) : ('')}
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

export default EditPass;

