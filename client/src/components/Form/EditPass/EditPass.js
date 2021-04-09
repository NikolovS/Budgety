import { useState, useCallback } from "react";
import firebase from "../../../services/firebase";
import { rules } from "../../../services/validation";
import "firebase/firestore";

const EditPass = () => {
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
					rePassword: rules.rePassword(value),
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
	const onSubmitFormHandler = useCallback(
		(e) => {
			e.preventDefault();

			if (data.currentPassword && data.password) {
				let reauthenticate = (currentPassword) => {
					let user = firebase.auth().currentUser;
					let cred = firebase.auth.EmailAuthProvider.credential(
						user.email,
						currentPassword
					);
					return user.reauthenticateWithCredential(cred);
				};

				reauthenticate(data.currentPassword)
					.then(() => {
						let user = firebase.auth().currentUser;
						user.updatePassword(data.password)
							.then(() => {
								console.log("Password updated!");
							})
							.catch((error) => {
								setRule({
									...validationErrors,
									firebaseError: error.message,
								});
								console.log(error);
							});
					})
					.catch((error) => {
						setRule({
							...validationErrors,
							firebaseError: error.message,
						});
						console.log(error);
					});

				 
			}
		},
		[data,validationErrors]
	);

	return (
		<form onSubmit={onSubmitFormHandler}>
			<label htmlFor='currentPassword'>Current Password</label>
			<input
				type='password'
				id='currentPassword'
				name='currentPassword'
				value={data.currentPassword}
				onBlur={blurHandler}
				onChange={onChangeHandler}
			/>
			{validationErrors.currentPassword.length ? (
				<h2 style={{ color: "red" }}>
					{validationErrors.currentPassword}
				</h2>
			) : (
				""
			)}

			<label htmlFor='password'>New Password</label>
			<input
				type='password'
				id='password'
				name='password'
				value={data.password}
				onBlur={blurHandler}
				onChange={onChangeHandler}
			/>
			{validationErrors.password.length ? (
				<h2 style={{ color: "red" }}>{validationErrors.password}</h2>
			) : (
				""
			)}

			<label htmlFor='rePassword'>Confirm New Password</label>
			<input
				type='password'
				id='rePassword'
				name='rePassword'
				value={data.rePassword}
				onBlur={blurHandler}
				onChange={onChangeHandler}
			/>
			{validationErrors.rePassword.length ? (
				<h2 style={{ color: "red" }}>{validationErrors.rePassword}</h2>
			) : (
				""
			)}

			<button>Save</button>
			{validationErrors.firebaseError.length ? (
				<h2 style={{ color: "red" }}>
					{validationErrors.firebaseError}
				</h2>
			) : (
				""
			)}
		</form>
	);
};

export default EditPass;
