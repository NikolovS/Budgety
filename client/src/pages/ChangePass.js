import MainLayout from "../Layout/MainLayout";

import EditPass from "../components/Form/EditPass";

const ChangePass = () => {
	return (
		<MainLayout>
			<div className='profile'>
				<div className='container'>
					<h1>Change Password</h1>
					<div className='userdata'>
						<EditPass />
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ChangePass;
