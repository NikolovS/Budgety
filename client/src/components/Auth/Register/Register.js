import RegisterForm from './RegisterForm'
import '.Register.scss'
const Register = () => {
    return (
        <div className='register-section-wrapper'>
		<div className='register-section-container'>
			<h1>Create Account</h1>
			<RegisterForm />
 
		</div>
	</div>



       );
        }
         
export default Register;