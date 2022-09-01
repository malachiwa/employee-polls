import { Link } from "react-router-dom";
import { logOut } from "../actions/authedUser";
import { connect } from "react-redux";

const Nav = ({ dispatch, user }) => {
	const handleLogOut = () => {
		dispatch(logOut());
	};
	return (
		<nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/add">New question</Link>
				</li>
				<li>
					<Link to="/leaderboard">LeaderBoard</Link>
				</li>
				<div>Hello {user.name}</div>
				<li>
					<Link to="/" onClick={handleLogOut}>
						LogOut
					</Link>
				</li>
			</ul>
		</nav>
	);
};

const mapStateToProps = ({ authedUser, users }) => ({
	user: users[authedUser],
});

export default connect(mapStateToProps)(Nav);
