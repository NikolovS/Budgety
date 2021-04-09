import { useState } from "react";
import firebase from "../../../services/firebase";
import { rules } from "../../../services/validation";
import { Link } from "react-router-dom";
import "firebase/firestore";

const User = ({ loaded, data, setData }) => {
	const [edit,setEdit]=useState(false)
	const [validationErrors, setRule] = useState({
		email: "",
		displayName: "",
		firebaseError: "",
	});

	const blurHandler = (e) => {
		e.preventDefault();
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
			case "displayName":
				setRule({
					...validationErrors,
					displayName: rules.name(value),
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
	const onSubmitFormHandler = async (e) => {
		e.preventDefault();
		setEdit(false)
		let currentUser = await firebase.auth().currentUser;
		if (currentUser) {
			await currentUser.updateProfile({
				...data,
				displayName: data.displayName,
				email: data.email,
			});
		}
	};

if (edit) {
if (loaded && data.email) {
return (
				<form onSubmit={onSubmitFormHandler}>
				<label htmlFor='displayName'>User Name</label>
				<input
					type='text'
					id='displayName'
					name='displayName'
					value={data.displayName}
					onBlur={blurHandler}
					onChange={onChangeHandler}
				/>
				{validationErrors.displayName.length ? (
					<h2 style={{ color: "red" }}>
						{validationErrors.displayName}
					</h2>
				) : (
					""
				)}

				<label htmlFor='email'>Email</label>
				<input
					type='text'
					id='email'
					name='email'
					value={data.email}
					onBlur={blurHandler}
					onChange={onChangeHandler}
				/>
				{validationErrors.email.length ? (
					<h2 style={{ color: "red" }}>{validationErrors.email}</h2>
				) : (
					""
				)}

				<button>Save</button>
				<Link to='change-password'>Change Password</Link>
			</form>
		);
	} else if (!loaded) {
		return <p>Loading...</p>;
	} else if (loaded && !data.email) {
		return <p>Please log in...</p>;
		} 
}
else {
		if (loaded && data.email) {
		return (
			<div className="user-profile">
				<p>Name:</p>
				<p>{data.displayName}</p>
				<p>Email:</p>
				<p>{data.email}</p>
				<button onClick={e=>setEdit(true)}>Edit</button>
				<Link to='change-password'>Change Password</Link>

			</div>
		
		);
	} else if (!loaded) {
		return <p>Loading...</p>;
	} else if (loaded && !data.email) {
		return <p>Please log in...</p>;
	}
	}




};

export default User;
