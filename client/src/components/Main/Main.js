import "./Main.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
const Main = () => {
	return (
		<div className='main-page'>
			<div className='container'>
				<header>
					<div className='logo'>
						<Logo />
					</div>
					<nav>
						<ul>
							<li>
								<Link to={"/login"}>Login</Link>
							</li>
						</ul>
					</nav>
				</header>

				<div className='topic'>
					<h1>
						Online Budget <span>management</span>
					</h1>
				</div>
				<div className='description'>
					<div className='records'>
						<i className='far fa-check-square'></i>
						<p>Calculate easily your Budget.</p>
					</div>
					<div className='records'>
						<i className='far fa-check-square'></i>
						<p>Add Incomes and Epenses. </p>
					</div>
					<div className='records'>
						<i className='far fa-check-square'></i>
						<p>See your list with records </p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Main;
