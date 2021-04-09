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
import AuthRoute from "./AuthRoute";

function App() {
	return (
		<div className='app'>
			<Switch>
				<Route path={"/"} exact component={Home} />
				<Route path={"/register"} component={Register} />
				<Route path={"/login"} component={Login} />
				<AuthRoute path={"/add"} component={Create} />
				<AuthRoute path={"/list"} exact component={List} />
				<AuthRoute path={"/total"} exact component={Budget} />
				<AuthRoute path={"/list/:id"} component={Edit} />
				<AuthRoute path={"/profile"} component={Profile} />
				<AuthRoute path={"/change-password"} component={ChangePass} />
			</Switch>
		</div>
	);
}

export default App;
