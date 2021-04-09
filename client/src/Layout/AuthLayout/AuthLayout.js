import { FirebaseAuthConsumer } from "@react-firebase/auth";
import { Redirect } from "react-router-dom";
const AuthLayout = ({ children }) => {
 return(<FirebaseAuthConsumer>
			{({ isSignedIn, user, providerId }) => {
				
				if (!isSignedIn) {
					return (
						<div className='auth-layout'>
							<div className='content'>{children}</div>
						</div>
					);
				} else {
					return <Redirect to='/list' />;
				}
			}}
		</FirebaseAuthConsumer>
	)
};

export default AuthLayout;
