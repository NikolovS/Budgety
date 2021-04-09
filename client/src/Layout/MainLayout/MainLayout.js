import { Redirect, Link } from "react-router-dom";
import firebase from "../../services/firebase";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
const MainLayout = ({ children }) => {
	const onClickLogOut = (e) => {
		firebase
			.auth()
			.signOut()
			.then(() => {
				console.log("Current user succesfully signs out");
			})
			.catch((error) => {
				console.log("Error,try again later " + error);
			});
	};
	return (
		<FirebaseAuthConsumer>
			{({ isSignedIn, user, providerId }) => {
				
				if (isSignedIn) {
					return (
						<div className='main-layout'>
							<Link to="/list">See your Records</Link>
							<Link to="/add">Add new record</Link>
							<button onClick={onClickLogOut}>SignOut</button>
							<Link to="/profile">Profile</Link>
							
							<div className='container'>{children}</div>
						</div>
					);
				} else {
					return <Redirect to='/login' />;
				}
			}}
		</FirebaseAuthConsumer>
	);
};

export default MainLayout;
