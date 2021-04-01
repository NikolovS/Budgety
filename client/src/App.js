import Home from './components/Home'
// import Register from './components/Auth/Register'
import './App.css';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyBAAT_R3amiVUf5qXa8syYYeXHFAxfAMvA",
  authDomain: "budgety-a6dd3.firebaseapp.com",
  databaseURL: "https://budgety-a6dd3.firebaseio.com",
  projectId: "budgety-a6dd3",
  storageBucket: "budgety-a6dd3.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID",
  measurementId: "G-MEASUREMENT_ID",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//const db = firebase.database()




function App() {
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    rePassword: '',
    firstName: '',
    lastName: '',
  
  })
  const [errors,setErrors]= useState({message: ''})

  const onRegisterChangeHandler = (e) => {
    e.preventDefault()
    let state = {...registerData};
    state[e.target.name] = e.target.value;
    
    setRegisterData(state)
    
  }
  const onSubmitRegFormHandler = (e) => {
    e.preventDefault()
    setRegisterData({ ...registerData })
    console.log('registerData', registerData);
      firebase.auth()
        .createUserWithEmailAndPassword(registerData.email, registerData.password)
        .then( async (user) => {
            setErrors({ message: '' })
              let currentUser = await firebase.auth().currentUser;
              if (currentUser) {
               await currentUser.updateProfile({
                    displayName: `${registerData.firstName} ${registerData.lastName}`
                })

              }
       
        
        })
       .catch((error) => {
        let errorCode = error.code;
        let errorMessage = error.message;
         if (errorCode === 'auth/weak-password') {
            setErrors({...errors, message: errorMessage })
        } else {
             alert(errorMessage);
         }

 
  });
     
  }
    
  const [loginData,setLoginData]=useState({email:'', password: ''})  
  const onLoginChangeHandler = (e) => {
      e.preventDefault()
      let state = { ...loginData }
      state[e.target.name] = e.target.value
      setLoginData(state)
     
  }
  const onSubmitLoginFormHandler = (e) => {
      e.preventDefault()
      console.log('loginData',loginData);
      const user = firebase.auth()
          .signInWithEmailAndPassword(loginData.email, loginData.password)
          .then((user) => {
            setErrors({ message: '' })
          })
          .catch((error) => {
              let errorCode = error.code;
              let errorMessage = error.message;
              console.log(errorCode);
              if (errorCode === "auth/wrong-password" || errorCode==="auth/user-not-found") {
             return setErrors({...errors, message: 'Invalid Credentials'})
              }
              setErrors({...errors, message: errorMessage})

          })
      console.log(user);
}
    
  return (
    <div className="App">
      <h1>It is  working!</h1>
      <Home />
  <pre>{JSON.stringify(firebase.auth().currentUser)}</pre>
      <div className="register">
        {errors ? <h2>{errors.message}</h2>: ''}
        <h1>Create account</h1>
        <form onSubmit={onSubmitRegFormHandler}>
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email" value={registerData.email} onChange={onRegisterChangeHandler} />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" value={registerData.password} onChange={onRegisterChangeHandler}  id="password" />
        <label htmlFor="rePassword">Repeat Password</label>
        <input type="password" name="rePassword" id="rePassword" onChange={onRegisterChangeHandler}  value={registerData.rePassword} />
        <label htmlFor="firstName">First Name</label>
        <input type="text" name="firstName" id="firstName" onChange={onRegisterChangeHandler}  value={registerData.firstName} />
        <label htmlFor="lastName">Last Name</label>
        <input type="text" name="lastName" id="lastName"  value={registerData.lastName} onChange={onRegisterChangeHandler} />
        <button>REGISTER</button>
        </form>
          </div>
          
          <div className="login">
              <h1>Login</h1>
              {errors ? <h2>{errors.message}</h2>: ''}
          <form onSubmit={onSubmitLoginFormHandler}>
              <label htmlFor="email">Email</label>
                <input type="text" name="email" onChange={onLoginChangeHandler} value={loginData.email} id="email" />
                  <label htmlFor="password">Password</label>
                  <input type="password" name="password" id="password" onChange={onLoginChangeHandler} value={loginData.password} />
                  <button>LOGIN</button>
          </form>
        </div>

      </div>

  );
}

export default App;
