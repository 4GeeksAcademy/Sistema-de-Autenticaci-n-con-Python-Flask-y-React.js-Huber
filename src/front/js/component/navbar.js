import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/signup">
				<button className="btn btn-secondary bg-dark ">Registrarse</button>
				</Link>
				<Link to="/login">
				<button className="btn btn-secondary bg-dark ">Iniciar Sesión</button>
				</Link>
			</div>
		</nav>
	);
};
