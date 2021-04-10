import MainLayout from "../Layout/MainLayout";

import { useEffect, useState } from "react";
import firebase from "../services/firebase";
import User from "../components/Form/User/User";

const Profile = () => {
	const [data, setData] = useState({
		email: "",
		displayName: "",
	});

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {
			if (user && !loaded) {
				setData({
					...data,
					email: user.email,
					displayName: user.displayName,
				});
				setLoaded(true);
			} else if (!user && !loaded) {
				setLoaded(true);
			}
		});
	}, [data, loaded]);

	return (
		<MainLayout>
			<div className='profile'>
				<div className='container'>
					 
					<div className='userdata'>
						<User loaded={loaded} data={data} setData={setData} />
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default Profile;
