import { useState } from "react";
import firebase from "../../../services/firebase";
import { rules } from "../../../services/validation";
import { Link } from "react-router-dom";
import "./User.scss"
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
	<div className='user'>

	<section className="h-100 w-100">
	  <div className="container h-100 w-100">
		  <div className="row justify-content-md-left h-100">
			  <div className="card-wrapper">
			<div className="card fat">
					  <div className="card-body">
								<h4 className="card-title">User Profile</h4>
								
				  <form  className="my-user-validation" onSubmit={onSubmitFormHandler} >
							  <div className="form-group">
							  <label htmlFor='displayName'>Name</label>
					<input
						type='text'
						id='displayName'
						name='displayName'
						value={data.displayName}
						onBlur={blurHandler}
						onChange={onChangeHandler}
					/>
								  
							  </div>
				  {validationErrors.displayName.length ? (<h2 style={{ color: "red" }}>{validationErrors.displayName}</h2>) : ("")}
							  <div className="form-group">
							  <label htmlFor='email'>Email</label>
									<input
									type='text'
								id='email'
								name='email'
								value={data.email}
								onBlur={blurHandler}
								onChange={onChangeHandler}
					/>
	
									</div>
									<div className="form-group">
										<Link to='change-password' className="btn   btn-block">Change Password</Link>
										
										</div>
				  {validationErrors.email.length ? (<h2 style={{ color: "red" }}>{validationErrors.email}</h2>) : ("")}
							  <div className="form-group m-0">
							  <button className="btn   btn-block"> <i className="far fa-save"></i>Save</button>
					<button className="btn back btn-block" onClick={(e)=>setEdit(false)}> <i className="fas fa-backspace"></i>Back</button>
									  </div>
				  {validationErrors.firebaseError.length ? (<h2 style={{ color: "red" }}>{validationErrors.firebaseError}</h2>) : ("")}
							 
				  </form>
					  </div>
				  </div>
	
			  </div>
		  </div>
	  </div>
	</section>
	</div>
	
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
			<div className="user">
<section className="h-100 w-100">
  <div className="container h-100 w-100">
	  <div className="row justify-content-md-left h-100">
		  <div className="card-wrapper ">
			  
			  <div className="card fat row justify-content-md-center ">
						<div className="card-body ">
						<h3>Name:</h3>
						<p>{data.displayName}</p>
						<h3>Email:</h3>
						<p>{data.email}</p>
										<button className="btn   btn-block" onClick={e => setEdit(true)}>
										<i className="fas fa-edit"></i> EDIT</button>
						
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
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


