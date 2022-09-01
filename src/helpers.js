import { _getUsers, _getQuestions } from "./_DATA.js";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export function getInitialData() {
	return Promise.all([_getUsers(), _getQuestions()]).then(
		([users, questions]) => ({
			users,
			questions,
		})
	);
}

export function formatDate(timestamp) {
	const d = new Date(timestamp);
	const time = d.toLocaleTimeString("en-US");
	return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function checkIfObjectIsEmpty(obj) {
	return (
		obj && 
		Object.keys(obj).length === 0 &&
		Object.getPrototypeOf(obj) === Object.prototype
	);
}

export const withRouter = (Component) => {
	const ComponentWithRouterProp = (props) => {
		let location = useLocation();
		let navigate = useNavigate();
		let params = useParams();
		return <Component {...props} router={{ location, navigate, params }} />;
	};
	return ComponentWithRouterProp;
};