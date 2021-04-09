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
				setData({
					...data,
					user: user.uid,
				});
				setLoaded(true);
			} else if (!user && !loaded) {
				setLoaded(true);
			}
		});
	}, [data, loaded]);

	return (
		<MainLayout>
			<div className='add-new'>
				<div className='container'>
					<h1>Add Expense or Income</h1>
					<Add loaded={loaded} data={data} setData={setData} />
				</div>
			</div>
		</MainLayout>
	);
};

export default Create;
