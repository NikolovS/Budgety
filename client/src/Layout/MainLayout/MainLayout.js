import { Redirect } from 'react-router';
import firebase from '../../services/firebase'
const MainLayout = ({ children }) => {
    const onClickLogOut = (e) => {
        e.preventDefault()
        firebase.auth().signOut().then(() => {
            
        console.log('Current user succesfully signs out');
        }).catch((error) => {
   console.log('Error,try again later '+ error );
        });
         <Redirect to={'/login'} /> 
    }
    return (
        <div className="main-layout">
            <button onClick={onClickLogOut}>SignOut</button>
            <div className="container">{children}</div>
        </div>
    )
}

export default MainLayout
