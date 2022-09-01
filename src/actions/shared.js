import { getInitialData } from "../helpers";
import { receiveQuestions } from "./questions";
import { receiveUsers } from "./users";

export function handleInitialData() {
	return (dispatch) => {
		return getInitialData().then(({ users, questions }) => {
			dispatch(receiveQuestions(questions));
			dispatch(receiveUsers(users));
		});
	};
}
