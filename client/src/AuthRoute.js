import { Route, Redirect } from "react-router-dom";
import { FirebaseAuthConsumer } from "@react-firebase/auth";
const AuthRouth = ({ component: Component, ...rest }) => {
	return (
		<FirebaseAuthConsumer>
			{({ isSignedIn, user, providerId }) => {
				return (
					<Route
						{...rest}
						render={(props) =>
							isSignedIn === true ? (
								<Component {...props} />
							) : (
								<Redirect to='/login' exact />
							)
						}
					/>
				);
			}}
		</FirebaseAuthConsumer>
	);
};

export default AuthRouth;
