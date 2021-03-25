import AuthInput from '../../../Shared/AuthInput'
import AuthInput from '../../../Shared/AuthInput'
import Button from '../../../Shared/Button'

const RegisterForm = () => {
    return ( <form className='register-form'>
  
    <AuthInput
        name='email'
        type='text'
        placeholderText={"Enter your email address"}
      
    />
    <AuthInput
        name='password'
        type='password'
        placeholderText='Enter your password'
        />
        <AuthInput
        name='repeatPassword'
        type='password'
        placeholderText='Repeat password'
    />
    <AuthInputGroup>
        <AuthInput
            name='firstName'
            type='text'
            placeholderText='First name'
            
        />
        <AuthInput
            name='lastName'
            type='text'
            placeholderText='Last name'
            
        />
    </AuthInputGroup>
  
      <AuthInput
            name='phone'
            type='number'
            placeholderText='Phone number'
            
        />
  
 
    <div className='register-btn'>
        <Button >
            SIGN UP
        </Button>
    </div>
    <div>
        <p>
                Have an account?
            <Link to="/login" >Login </Link>
        </p>
    </div>
</form> );
}
 
export default RegisterForm;