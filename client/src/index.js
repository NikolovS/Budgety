import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import firebase from './services/firebase'
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { firebaseConfig } from "./services/firebase";

ReactDOM.render(
	
		<Router>
		<React.StrictMode>
			<FirebaseAuthProvider firebase={firebase} {...firebaseConfig}>
				<App />
				</FirebaseAuthProvider>
			</React.StrictMode>
		</Router>,
 
	document.getElementById("root")
);
