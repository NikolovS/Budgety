import MainLayout from "../Layout/MainLayout";
import Add from "../components/Form/Add";
import { useEffect, useState } from "react";
import firebase from "../services/firebase";

const Create = () => {
	const [data, setData] = useState({
		selectType: "",
		name: "",
		amount: 0,
		date: "",
		user: "",
	});

	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		 
 	firebase.auth().onAuthStateChanged((user) => {
			if (user && !loaded) {
				setData((currentState) => {
					return {
						...currentState,
						user: user.uid,
					}
				});
				setLoaded(true);
			}
		 
		  


		});
	}, [loaded]);

	return (
		<MainLayout>
			<div className='add-new'>
				<div className='container'>
				 
					<Add loaded={loaded} data={data} setData={setData} />
				</div>
			</div>
		</MainLayout>
	);
};

export default Create;
