import MainLayout from "../Layout/MainLayout";

import EditPass from "../components/Form/EditPass";

const ChangePass = () => {
	return (
		<MainLayout>
			<div className='profile'>
				<div className='container'>
					 
					<div className='userdata'>
						<EditPass />
					</div>
				</div>
			</div>
		</MainLayout>
	);
};

export default ChangePass;
