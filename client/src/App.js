// import Register from './components/Auth/Register'
import "./App.css";
import { Switch, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import List from "./pages/List";
import Profile from "./pages/Profile";
import ChangePass from "./pages/ChangePass";
import Create from "./pages/Create";
import Edit from "./pages/Edit";
import Budget from "./pages/Budget";

function App() {
	return (
		<div className='app'>
			<Switch>
				<Route path={"/"} exact component={Home} />
				<Route path={"/register"} component={Register} />
				<Route path={"/login"} component={Login} />
				<Route path={"/add"} component={Create} />
				<Route path={"/list"} exact component={List} />
				<Route path={"/total"} exact component={Budget} />
				<Route path={"/list/:id"} component={Edit} />
				<Route path={"/profile"} component={Profile} />
				<Route path={"/change-password"} component={ChangePass} />

				{/* <Route path={'/register'} component={Register}></Route> */}
			</Switch>
		</div>
	);
}

export default App;
