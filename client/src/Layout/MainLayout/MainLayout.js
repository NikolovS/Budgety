import { NavLink } from "react-router-dom";
import firebase from "../../services/firebase";
import { ReactComponent as Logo } from "../../components/assets/logo.svg";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
import './MainLayout.scss'
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
			{({ isSignedIn }) => {
				if (isSignedIn) {
					return (
						<div className='main-layout'>
							
							<div className="wrapper">
							<Logo />
								<div className='user-options'>
								<div className="nav">
									<nav>
										<ul>
											<li>
											<NavLink activeClassName="active" to='/list'> <i class="fas fa-clipboard-list"></i> See your Records</NavLink>
											</li>
											<li>
											<NavLink activeClassName="active" to='/add'> <i class="fas fa-folder-plus"></i> Add new record</NavLink>
											</li>
											<li>
											<NavLink activeClassName="active" to='/profile'> <i class="fas fa-id-card"></i> Profile</NavLink>
											</li>
										</ul>
									</nav>
									<button onClick={onClickLogOut}>
									<i class="fas fa-sign-out-alt"></i>
										<span>
										SignOut
										</span>
										</button>
										</div>
								
								</div>

								<div className='container'>{children}</div>
								</div>
						</div>
					);
				} else {
					return (
						<div className='main-layout'>
							<div className="wrapper">
								<div className='container'>{children}</div>
								</div>
						</div>
					);
				}
			}}
		</FirebaseAuthConsumer>
	);
};

export default MainLayout;
