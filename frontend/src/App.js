import React from "react";
import "./App.css";

import Login from "./components/Login";
import Eventlite from "./components/Eventlite";

const currentUser = function () {
	const user = localStorage.getItem("user");
	console.log(user);
	return user;
};

const App = () => {
	return <div className="App">{currentUser() ? <Eventlite /> : <Login />}</div>;
};

export default App;
