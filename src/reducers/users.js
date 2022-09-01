import { RECEIVE_USERS } from "../actions/users";
import { ADD_ANSWER, ADD_QUESTION } from "../actions/questions";

export default function users(state = {}, action) {
	switch (action.type) {
		case RECEIVE_USERS:
			return {
				...state,
				...action.users,
			};
		case ADD_QUESTION:
			return {
				...state,
				[action.question.author]: {
					...state[action.question.author],
					questions: state[action.question.author].questions.concat(
						action.question.id
					),
				},
			};
		case ADD_ANSWER:
			const { qid, option, authedUser } = action.answer;
			return {
				...state,
				[authedUser]: {
					...state[authedUser],
					answers: {
						...state[authedUser].answers,
						[qid]: option,
					},
				},
			};
		default:
			return state;
	}
}
