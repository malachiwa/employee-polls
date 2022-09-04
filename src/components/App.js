import { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import Nav from "./Nav";
import { Route, Routes } from "react-router-dom";
import Question from "./Question";
import Login from "./Login";
import { checkIfObjectIsEmpty } from "../helpers";
import LeaderBoard from "./LeaderBoard";
import NotFound from "./NotFound";

const App = (props) => {
	useEffect(() => {
		props.dispatch(handleInitialData());
	}, []);

	return (
		<>
			{!checkIfObjectIsEmpty(props.authedUser) ? (
				<span>
					<Nav />
					<Routes>
						<Route path="/" exact element={<Dashboard />} />
						<Route path="/add" exact element={<NewQuestion />} />
						<Route path="/questions/:id" element={<Question />} />
						<Route path="/leaderboard" element={<LeaderBoard />} />
						<Route path="/404" element={<NotFound />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</span>
			) : (
				<Routes>
					<Route path="*" exact element={<Login />} />
				</Routes>
			)}
		</>
	);
};

const mapStateToProps = ({ authedUser }) => ({
	authedUser,
});

export default connect(mapStateToProps)(App);
