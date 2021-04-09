import { Link } from "react-router-dom";
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
			{({ isLoggedIn }) => {
				if (isLoggedIn) {
					return (
						<div className='main-layout'>
							<div className='userOptions'>
								<Link to='/list'>See your Records</Link>
								<Link to='/add'>Add new record</Link>
								<button onClick={onClickLogOut}>SignOut</button>
								<Link to='/profile'>Profile</Link>
							</div>

							<div className='container'>{children}</div>
						</div>
					);
				} else {
					return (
						<div className='main-layout'>
							<div className='container'>{children}</div>
						</div>
					);
				}
			}}
		</FirebaseAuthConsumer>
	);
};

export default MainLayout;
