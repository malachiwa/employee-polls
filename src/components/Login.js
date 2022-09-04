import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { setAuthedUser } from "../actions/authedUser";

const Login = ({ dispatch, users }) => {
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	const handleNameChange = (e) => {
		const text = e.target.value;

		setName(text);
	};

	const handlePasswordChange = (e) => {
		const text = e.target.value;

		setPassword(text);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (checkLoginDetails()) {
			dispatch(setAuthedUser(name, password));
			setName("");
			setPassword("");
		}
	};

	function checkLoginDetails() {
		if (name in users && users[name].password === password) {
			return true;
		}
		return false;
	}

	return (
		<div>
			<h3>Login</h3>
			<form onSubmit={handleSubmit}>
				<p>Name:</p>
				<input type="text" value={name} onChange={handleNameChange} />
				<p>Password:</p>
				<input
					type="password"
					value={password}
					onChange={handlePasswordChange}
				/>

				<button type="submit" disabled={name === "" || password === ""}>
					Login
				</button>
			</form>
		</div>
	);
};

const mapStateToProps = ({ users }) => ({
	users,
});

export default connect(mapStateToProps)(Login);
