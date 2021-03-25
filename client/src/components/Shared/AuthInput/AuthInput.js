import "./auth-input.scss";

const AuthInput = ({
	 
	type,
	name,
	placeholderText,
	title,
 
	error, 
}) => { 


	return (
		<label title={title}>
			<input
				type={type}
				name={name} 
				required
				defaultValue=""
			/>
			<span className='floating-label'>{error || placeholderText}</span>
		</label>
	);
}
export default AuthInput;
